import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);




  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("token:", token);
    if (!token) {
      navigate("/");
      return;
    }

    const perfil = async () => {
      try {
        const response = await fetch(`https://humble-telegram-jxjjggj7xvx3pgwj-3001.app.github.dev/api/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }

        });
        const data = await response.json();
        setUser(data);
        console.log(data);

      } catch (error) {
        console.error("Error:", error);
        navigate("/");
      }
    };
    perfil();
  }, [navigate]);

  return (

    <div className="d-flex justify-content-around ">


      <h1>BIENVENIDO</h1>
      
        {user ? <h2>{user.name}</h2> : <p>Cargando...</p>}
      
    </div>




  );


}