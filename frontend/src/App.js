import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import SignupScreen from "./page/SignupScreen";
import HomeScreen from "./page/HomeScreen";
import RouteWithoutAcc from "./component/RouteWithoutAcc";
import SigninScreen from "./page/SigninScreen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAction } from "./action/userAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAction());
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/customer/signup"
            element={
              <RouteWithoutAcc>
                <SignupScreen />
              </RouteWithoutAcc>
            }
          />
          <Route
            path="/customer/signin"
            element={
              <RouteWithoutAcc>
                <SigninScreen />
              </RouteWithoutAcc>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
