import { useState, useEffect } from "react";
import { getDetail } from "../api/Product";
import { useParams } from "react-router-dom";
import { addReview, getReviews } from "../api/Review";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

const Detail = () => {
  const Div = styled.div`
    .product-info {
      display: flex;

      img {
        width: 50%;
        margin-right: 20px;
      }
      div {
        display: flex;
        justify-content: center;

        flex-direction: column;
      }
    }
    .review-add {
      margin-top: 20px;

      input {
        margin-bottom: 10px;
      }
      textarea {
        resize: none;
        margin-bottom: 10px;
      }
    }
  `;
  const { code } = useParams();
  //   console.log(code);
  // 글 불러오기
  const [detailInfo, setDetail] = useState({
    prodName: "",
    price: 0,
    prodPhoto: "",
  });
  const productAPI = async () => {
    const response = await getDetail(code);
    // console.log(response.data);
    setDetail(response.data);
  };
  // 유저정보 불러오기
  const [user, setUser] = useState({});
  const info = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    productAPI();
    reviewAPI();
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  // 댓글(리뷰)작성하기
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const reviewSubmit = async () => {
    // 이건 form태그를 사용하지 않고 보낼때
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("prodCode", code);
    formData.append("reviTitle");
    formData.append("reviDesc");
    formData.append("files");
    await addReview(formData);
  };
  // 댓글(리뷰) 불러오기
  const [reviews, setReviews] = useState([]);
  const reviewAPI = async () => {
    const response = await getReviews(code);
    // console.log(response.data);
    setReviews(response.data);
  };
  return (
    <>
      <Div>
        <div className="product-info">
          <img
            src={detailInfo.prodPhoto?.replace("D:", "http://localhost:8081")}
          />
          <div>
            <h2>{detailInfo.prodName}</h2>
            <h3> {detailInfo.price}</h3>
          </div>
        </div>
        <div className="review-add">
          <Form.Control type="file" multiple accept="image/*"></Form.Control>
          <Form.Control type="text" placeholder="제목작성"></Form.Control>
          <Form.Control as="textarea" placeholder="글작성"></Form.Control>
          <Button onClick={reviewSubmit}>리뷰작성</Button>
        </div>
      </Div>
    </>
  );
};
export default Detail;
