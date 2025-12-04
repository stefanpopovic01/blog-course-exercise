import React, { useState } from "react";
import "./Profile.css";
import { getUsers } from "../../api/services/userService";
import { deleteUser } from "../../api/services/userService";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState(null);
  const [acess, setAcess] = useState(user.role === "admin");

  const getUsers1 = async (filters = {}) => {
    try {
      const { data } = await getUsers(filters);
      setUsers(data);
      console.log(data);

    } catch (err) {
      console.error("Greška prilikom učitavanja usera:", err.response ? err.response.data : err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteUser(id);
      getUsers1();

      console.log({data: data, message: "Obrisan"})

    } catch (err) {
      console.error("Greška prilikom brisanja usera:", err.response ? err.response.data : err.message);
    }


  }

  return (
    <div className="profile-containter"> 

      <div className="profile-box">
        <h2 className="profile-title">User Profile</h2>

        {user && (
          <>
            <p className="profile-item"><strong>Name:</strong> {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
            <p className="profile-item"><strong>Email:</strong> {user.email.charAt(0).toUpperCase() + user.email.slice(1)}</p>
            <p className="profile-item"><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          </>
        )}

        {acess && (<button className="profile-action-btn" onClick={() => getUsers1()}>
          <i className="fas fa-users"></i> Load All Users
        </button>
        )}
        {acess && (<button className="profile-action-btn" onClick={() => getUsers1({ role: "admin" })}>
          <i className="fas fa-users"></i> Load Admins
        </button>
        )}

        {users && (
          <div className="users-list">
            <h3>Users:</h3>
            {users.map(u => (
              <p key={u._id}>
                • {u.email} ({u.role}) 

                {u.role !== "admin" && (
                  <i className="fas fa-trash" style={{paddingLeft: "10px"}} onClick={() => handleDelete(u._id)}></i>
                )}

              </p>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;
