import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../axiosApi/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const { setAuth } = useAuth();
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);


  useEffect(() => {
    userRef.current.focus();
  }, []);

  // empty out any errMsg that might have when the user changes the user and pwd state
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ user, pwd })
      );
      setAuth(response?.data);
      setUser("");
      setPwd("");
      navigate(from, { replace: true });  
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleShowPwd = () => {
    setShow(!show);
  };

  return (
    <div className="wrapper-login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="form-container loginPad">
        <Link to="/" onClick={() => window.scroll(0, 0)} className="logo">
          LOGO
        </Link>
        <h2 className="h2Login">Login</h2>
        <form className="account-form" onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              ref={userRef}
              placeholder="Email Address *"
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password *"
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <div onClick={handleShowPwd}>
              {show ? (
                <FaEyeSlash
                  style={{ position: "absolute", right: "10px", top: "15px" }}
                />
              ) : (
                <FaEye
                  style={{ position: "absolute", right: "10px", top: "15px" }}
                />
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="rmFrPwd">
              <Link to="/forgot-pwd" className='pwdForget'>Forget Password?</Link>   
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btnForm">
              <span>Login</span>
            </button>
          </div>
        </form>

        <div className="account-bottom">
          <span className="txtSignUp">
            Don't Have an Account{" "}
            <Link to="/sign-up" className="txtColor">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
