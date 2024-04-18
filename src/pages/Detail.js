import { useState, useEffect } from "react";
import { getDetail } from "../api/Product";
import { useParams } from "react-router-dom";
import { addReview, getReviews, delReview, updateReview } from "../api/Review";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

const Div = styled.div`
  .product-info {
    display: flex;
    img {
      width: 50%;
      margin-right: 20px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
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
    button {
      width: 100%;
    }
  }
  .review-contents {
    margin-top: 30px;
    .review-content {
      margin-top: 15px;
      img {
        width: 200px;
      }
      .btn-container {
        display: flex;
        justify-content: flex-end;

        button {
          margin-left: 5px;
        }
      }
    }
  }
`;

// const Detail = () => {
//   const { code } = useParams();
//   //   console.log(code);
//   // 글 불러오기
//   const [detailInfo, setDetail] = useState({
//     prodName: "",
//     price: 0,
//     prodPhoto: "",
//   });
//   const productAPI = async () => {
//     const response = await getDetail(code);
//     // console.log(response.data);
//     setDetail(response.data);
//   };
//   // 유저정보 불러오기
//   const [user, setUser] = useState({});
//   const info = useSelector((state) => {
//     return state.user;
//   });

//   useEffect(() => {
//     productAPI();
//     reviewAPI();
//     if (Object.keys(info).length === 0) {
//       setUser(JSON.parse(localStorage.getItem("user")));
//     } else {
//       setUser(info);
//     }
//   }, []);

//   useEffect(() => {
//     console.log(user);
//   }, [user]);
//   // 댓글(리뷰)작성하기
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [images, setImages] = useState([]);
//   const reviewSubmit = async () => {
//     // 이건 form태그를 사용하지 않고 보낼때
//     const formData = new FormData();
//     formData.append("id", user.id);
//     formData.append("prodCode", code);
//     formData.append("reviTitle", title);
//     formData.append("reviDesc", desc);
//     images.forEach((image, index) => {
//       formData.append(`files[${index}]`, image);
//     });
//     formData.append("files");
//     await addReview(formData);
//   };
//   // 이미지 처리 함수
//   const imageChange = (e) => {
//     // console.log(e.target.files);
//     const files = Array.from(e.target.files);
//     setImages(files);
//   };
//   useEffect(() => {
//     console.log(images);
//   }, [images]);

//   return (
//     <>
//       <Div>
//         <div className="product-info">
//           <img
//             src={detailInfo.prodPhoto?.replace("D:", "http://localhost:8081")}
//           />
//           <div>
//             <h2>{detailInfo.prodName}</h2>
//             <h3> {detailInfo.price}</h3>
//           </div>
//         </div>
//         <div className="review-add">
//           <Form.Control
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={imageChange}
//           ></Form.Control>
//           <Form.Control
//             type="text"
//             placeholder="제목작성"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           ></Form.Control>
//           <Form.Control
//             as="textarea"
//             placeholder="글작성"
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//           ></Form.Control>
//           <Button onClick={reviewSubmit}>리뷰작성</Button>
//         </div>
//       </Div>
//     </>
//   );
// };
// export default Detail;

const Detail = () => {
  const { code } = useParams();
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [edit, setEdit] = useState(null);

  const info = useSelector((state) => {
    return state.user;
  });

  const productAPI = async () => {
    const response = await getDetail(code);
    setProduct(response.data);
  };

  // 댓글(리뷰)작성
  const reviewSubmit = async () => {
    // 이건 form 태그를 사용하지 않고 보낼때!
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("prodCode", code);
    formData.append("reviTitle", title);
    formData.append("reviDesc", desc);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    await addReview(formData);
    setImages([]); // 얘는 문제 있음. css스타일링으로 해결 가능
    // 비워지기는 하나 브라우저 보안문제로 남아있는것처럼 보임
    setTitle("");
    setDesc("");
    reviewAPI();
  };

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const [reviews, setReviews] = useState([]);
  // 댓글(리뷰) 불러오기
  const reviewAPI = async () => {
    const response = await getReviews(code);
    console.log(response.data);
    setReviews(response.data);
  };
  // 리뷰 수정을 위해 기존 정보 가져오기
  const onUpdate = async (review) => {
    console.log("review : " + review);
    setEdit(review);
  };
  // 수정할때 기존 이미지 삭제
  const deleteImage = (code) => {
    setEdit((prev) => {
      const images = prev.images.filter((image) => image.reviImgCode !== code);
      return { ...prev, images: images };
    });
  };
  // 수정 취소
  const cancel = () => {
    setEdit(null);
  };
  // useEffect(() => {
  // }, [edit]);
  //리뷰 진짜 수정
  const reviewUpdate = async () => {
    // FormData 방식으로 전달
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("reviCode", edit.reviCode);
    formData.append("prodCode", code);
    formData.append("reviTitle", edit.reviTitle);
    formData.append("reviDesc", edit.reviDesc);
    edit.images.forEach((image, index) => {
      // 기존 사진은 edit에 들어있음
      formData.append(`images[${index}]`, image.reviUrl);
    });
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    await updateReview(formData);
    setEdit(null);
    setImages([]);
    reviewAPI();
    // append로 필요할 값들 추가해야 하는 것
    // updateReview -> formData 값 전달
    // images/ edit 비우기
    // review 다시 호출
  };
  // 리뷰 삭제
  const onDelete = async (code) => {
    await delReview(code);
    reviewAPI();
  };

  useEffect(() => {
    console.log(images);
  }, [images]);
  useEffect(() => {
    productAPI();
    reviewAPI();
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);
  return (
    <Div>
      <div className="product-info">
        <img src={product.prodPhoto?.replace("D:", "http://localhost:8081")} />
        <div>
          <h2>{product.prodName}</h2>
          <h3>{product.price}</h3>
        </div>
      </div>
      <div className="review-add">
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={imageChange}
        />
        <Form.Control
          type="text"
          placeholder="제목 작성"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control
          as="textarea"
          placeholder="글 작성"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button variant="dark" onClick={reviewSubmit}>
          리뷰 작성
        </Button>
      </div>
      <div className="review-contents">
        {reviews.map((review) => (
          <div key={review.reviCode} className="review-content">
            {edit?.reviCode === review.reviCode ? (
              <>
                {edit.images.map((image) => (
                  <img
                    key={image.reviImgCode}
                    src={image.reviUrl.replace("D:", "http://localhost:8081")}
                    onClick={() => deleteImage(image.reviImgCode)}
                  />
                ))}
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={imageChange}
                />
                <Form.Control
                  type="text"
                  value={edit.reviTitle}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, reviTitle: e.target.value }))
                  }
                />
                <Form.Control
                  as="textarea"
                  value={edit.reviDesc}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, reviDesc: e.target.value }))
                  }
                />
                <div className="btn-container">
                  <Button variant="warning" onClick={reviewUpdate}>
                    완료
                  </Button>
                  <Button variant="danger" onClick={cancel}>
                    취소
                  </Button>
                </div>
              </>
            ) : (
              <>
                {review.images?.map((image) => (
                  <img
                    key={image.reviImgCode}
                    src={image.reviUrl.replace("D:", "http://localhost:8081")}
                  />
                ))}
                <h4>{review.reviTitle}</h4>
                <p>{review.reviDesc}</p>
                <div className="btn-container">
                  <Button variant="warning" onClick={() => onUpdate(review)}>
                    수정
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(review.reviCode)}
                  >
                    삭제
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Div>
  );
};
export default Detail;
