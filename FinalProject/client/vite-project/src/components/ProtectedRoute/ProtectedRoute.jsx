
import React, { useEffect, useContext,useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { authedUser, setAuthedUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Performing auth check...");
    axios.get("http://localhost:5000/authCheck", { withCredentials: true })
      .then((res) => {
        if (res.data.msg === "valid token") {
          setAuthedUser({
            username: res.data.username,
            userId: res.data.userId,
            token: res.data.token,
          });
          console.log("Authenticated user:", res.data);
        } else {
          console.log("Invalid token, redirecting to login...");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error during auth check:", err);
        navigate("/login");
      }).finally(() => {
      
        setLoading(false);
      })
  }, [navigate, setAuthedUser]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
   <Outlet/>
   //this below was not correct, so uncorrect is was retard, i learned that you dont have to render outlet based on an authedUser check bc it my not set the autheduser immedialtely, however outlet is used for rendering child routes within the parent, im guessing that useLocation is awesome too 
    // authedUser.username ? <Outlet /> : null
  );
};

export default ProtectedRoute