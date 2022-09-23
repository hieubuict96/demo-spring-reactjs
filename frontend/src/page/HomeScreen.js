import Header from "../component/Header";
import styled from "styled-components";
import Footer from "../component/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeScreenWrapper = styled.div``;

const Body = styled.div`
  min-width: 1200px;
  margin-top: 8rem;
  background: rgb(240, 240, 240);
  display: flex;
  flex-direction: column;

  .container {
    width: 1200px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    margin: 2rem auto 2rem auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export default function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Shopee - Trang Chủ";
  }, []);

  return (
    <HomeScreenWrapper className="home">
      <Header />
      <Body className="home-body">
        <div className="container">
        </div>
      </Body>
      <Footer />
    </HomeScreenWrapper>
  );
}
