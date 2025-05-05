import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";


const PersistLogin = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const veryfyRefreshToken = async () => {
      try {
        // the auth will be added with a new accessToken
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setLoading(false);
        setLoading(false);
      }
    };

    !auth?.accessToken
      ? veryfyRefreshToken()
      :  setLoading(false);

    return () => (isMounted = false);
  }, []);


  return <>{isLoading ? <p>Loading..</p> : <Outlet />}</>;
};

export default PersistLogin;
