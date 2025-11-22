import React, { useState } from "react";
import "./SinglePost.css";
import { AuthContext } from "../../contex/AuthContex";
import { useContext } from "react";
import axios from "axios";
import EditPost from "../EditPost/EditPost";

const SinglePost = ({ post, onPostDeleted }) => {
  // post = { title: "Naslov", description: "Opis posta", image: "" }

  const { user } = useContext(AuthContext);

  const canEditDelete = user && (user.role === "admin" || user.id === post.author);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.delete(`http://localhost:3000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.message);
      
    if (onPostDeleted) onPostDeleted();

    } catch (err) {
      console.error("Greška prilikom brisanja posta:", err.response?.data || err.message);
    }
  };

  const [editPost, setEditPost] = useState(false);

  return (
    <div className="single-post">
      <div className="post-image">
      <img src={post.image} alt={post.title} />
      </div>

      {canEditDelete && (
        <div className="post-buttons">
            <button className="edit-btn" onClick={() => setEditPost(!editPost)}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="delete-btn" onClick={() => handleDelete(post._id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
      )}

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-description">{post.description}</p>
      </div>


      {editPost && <EditPost setEditPost={setEditPost} onPostEdited={onPostDeleted} post={post}/>}

    </div>

  );
};

export default SinglePost;
