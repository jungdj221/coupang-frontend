// 무한 페이징
import { useEffect, useState } from "react";
import { getProducts } from "../api/Product";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const StyledProduct = styled.div`
    display: flex;
    img {
      width: 70%;
    }
    div {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `;
  const navigate = useNavigate();
  const [productInfo, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const productAPI = async () => {
    setLoading(true);
    const repsonse = await getProducts(page);
    const newData = repsonse.data;
    // console.log("page : " + page);
    // console.log(repsonse.data);
    setProducts((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    const scroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading
      ) {
        productAPI();
      }
      //   console.log(
      //     window.innerHeight + document.documentElement.scrollTop >=
      //
      //   );
      //   console.log("innerHeight 화면 높이: " + window.innerHeight);
      //   console.log(
      //     "scrollTop 현 스크롤 위치 from 0 to continue: " +
      //       document.documentElement.scrollTop
      //   );
      //   console.log(
      //     "offsetHeight = innerHeight + scrollTop: " +
      //       document.documentElement.offsetHeight
      //   );
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll); //동일 페이지가 반복되는 것을  clean하기 위해
    };
  }, [page, loading]); // 페이지가 변경될때마다 일어나야하기에

  const detail = (code) => {
    navigate("/" + code);
  };
  return (
    <>
      <section className="category-best container">
        {productInfo.map((product) => (
          <StyledProduct
            key={product.prodCode}
            onClick={() => detail(product.prodCode)}
          >
            <div>
              <h2>{product.prodName}</h2>
              <p> {product.price}</p>
            </div>
            <img
              src={product.prodPhoto?.replace("D:", "http://localhost:8081")}
            />
          </StyledProduct>
        ))}
      </section>
    </>
  );
};
export default ProductList;
