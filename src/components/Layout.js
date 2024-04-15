import { Outlet } from "react-router-dom"; // 자식components를 불러옴
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* router 에서 설정한 children components; Main*/}
    </>
  );
};
export default Layout;
