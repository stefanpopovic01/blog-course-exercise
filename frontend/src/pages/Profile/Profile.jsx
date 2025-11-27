import React, { useState } from "react";
import axios from "axios";
import "./Profile.css";
import { AuthContext } from "../../contex/AuthContex";

const getUsers = async () => {

    const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  try {

    const { data } = await axios.get("http://localhost:3000/users",
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        }





    );

    console.log(data);
  } catch (err) {
      console.error("Greška prilikom učitavanja usera:", err.response ? err.response.data : err.message);
  }


}




const Profile = () => {

    // zahtev axios za get users i user

  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-containter">

        <p>{user.name}</p> 
        <p>{user.email}</p>
        <p>{user.role}</p>
        <button onClick={getUsers}>Get all users</button> {/* consol loga samo podatke */ }



    </div>
  );
};

export default Profile;
