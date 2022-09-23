import styled from "styled-components";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signupAction
} from "../action/userAction";
import { FiAlertCircle } from "react-icons/fi";
import { useEffect } from "react";

const SignupWrapper = styled.div``;

const SignupHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  background: white;
  z-index: 100;
`;

const SignupHeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;

  .div-home-link {
    display: flex;
    align-items: center;
    margin-left: 1.5rem;

    img {
      width: 3rem;
    }

    span {
      color: rgb(248, 74, 47);
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

  .text-signup {
    margin-left: 1rem;
    font-size: 1.5rem;
  }

  .support-link {
    margin-left: auto;
    margin-right: 1.5rem;
    color: rgb(248, 74, 47);
  }
`;

const SignupBody = styled.div`
  margin-top: 5rem;
  background: rgb(248, 74, 47);
`;

const SignupBodyContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  background: rgb(248, 74, 47);
  display: flex;
`;

const Card = styled.div`
  width: 25rem;
  background: white;
  margin: 5rem auto;
  display: flex;
  border-radius: 3px;
`;

const CardStep_1 = styled.div`
  margin: 5%;
  width: 90%;
  display: flex;
  flex-direction: column;

  .text-signup {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }

  input {
    margin-top: 1rem;
    border: 1px solid rgb(219, 219, 219);
    height: 2.5rem;
    padding-left: 0.5rem;

    &:hover {
      border-color: blue;
    }

    &:focus {
      border-color: black;
    }
  }

  .error-notify {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-alert {
      line-height: 0;
      margin-right: 0.5rem;
    }

    span {
      font-size: 0.9rem;
      color: red;
    }
  }

  .button-next {
    height: 2.5rem;
    background: rgb(243, 131, 108);
    color: white;
    font-weight: 600;

    &:hover {
      color: rgb(219, 219, 219);
    }
  }

  .div-or {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    .left {
      flex-grow: 4;
      border: 0.5px solid rgb(219, 219, 219);
    }

    .text {
      text-align: center;
      color: rgb(219, 219, 219);
    }

    .space {
      flex-grow: 1;
    }

    .right {
      flex-grow: 4;
      border: 0.5px solid rgb(219, 219, 219);
    }
  }

  .signin-link {
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;

    a {
      color: rgb(243, 131, 108);
    }
  }
`;

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function handleSignup() {
    dispatch(signupAction(username, password, setError));
  }

  useEffect(() => {
    document.title = "Shopee - Đăng ký"
  }, [])

  return (
    <SignupWrapper className="signup">
      <SignupHeader>
        <SignupHeaderContainer className="signup-header-container">
          <Link to="/" className="div-home-link">
            <img src="/shopee.png" />
            <span>Shopee</span>
          </Link>
          <span className="text-signup">Đăng Ký</span>
          <Link className="support-link" to="/">
            Cần trợ giúp?
          </Link>
        </SignupHeaderContainer>
      </SignupHeader>
      <SignupBody className="signup-body">
        <SignupBodyContainer>
          <Card className="card">
              <CardStep_1>
                <span className="text-signup">Đăng Ký</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Tên người dùng"
                  onChange={(e) => {
                    setError("");
                    setUsername(e.target.value.trim());
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSignup();
                    }
                  }}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => {
                    setError("");
                    setPassword(e.target.value.trim());
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSignup();
                    }
                  }}
                />
                <div className="error-notify">
                  {error === "usernameEmpty" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Vui lòng nhập Tên người dùng</span>
                    </>
                  )}
                  {error === "usernameAlreadyUse" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Tên người dùng đã được sử dụng</span>
                    </>
                  )}
                  {error === "passwordEmpty" && (
                    <>
                      <span className="icon-alert">
                        <FiAlertCircle />
                      </span>
                      <span>Vui lòng nhập Mật khẩu</span>
                    </>
                  )}
                </div>
                <button
                  className="button-next"
                  onClick={handleSignup}
                >
                  ĐĂNG KÝ
                </button>
                <div className="div-or">
                  <span className="space"></span>
                  <span className="left"></span>
                  <span className="space"></span>
                  <span className="text">HOẶC</span>
                  <span className="space"></span>
                  <span className="right"></span>
                  <span className="space"></span>
                </div>
                <div className="signin-link">
                  <span>Bạn đã có tài khoản? &emsp;</span>
                  <Link to="/customer/signin">Đăng nhập</Link>
                </div>
              </CardStep_1>
          </Card>
        </SignupBodyContainer>
      </SignupBody>
      <Footer />
    </SignupWrapper>
  );
}
