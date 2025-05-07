import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosApi/axios";

const ForgotPwd = () => {
  const [user, setUser] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrorMsg] = useState("");

  // clear error message when try to change user || pwd || matchPwd
  useEffect(() => {
    setErrorMsg("");
  }, [user]);

  const handleForgetPwd = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/forgot-pwd", JSON.stringify({ user }));
      setSuccessMsg(res?.data?.msg);
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMsg("Email or Username not found");
      }
      console.log(err);
    }
  };
  
  return (
    <div className="wrapper-login">
      <div className="form-container">
        <Link
          to="/"
          onClick={() => window.scroll(0, 0)}
          className="logo logoAlign"
        >
          LOGO
        </Link>
        {/* <h2 className="h2Login">Login</h2> */}
        <form className="account-form" onSubmit={handleForgetPwd}>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <div className="form-group">
            <input
              type="text"
              //   ref={userRef}
              placeholder="Enter email or username *"
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btnForm">
              <span>submit</span>
            </button>
          </div>
          <p className={successMsg ? "successMsg" : "offscreen"}>
            {successMsg}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPwd;
