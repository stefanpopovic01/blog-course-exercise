import React from "react";
import "./EditPost.css";
import { useState } from "react";
import axios from "axios";


const EditPost = ({ post, setEditPost, onPostEdited }) => {

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(post.image || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.patch( `http://localhost:3000/posts/${post._id}`, { title, description, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Post uspešno izmenjen!");
      setError("");

      if (onPostEdited) onPostEdited();
      setEditPost(false);

    } catch (err) {
      console.error(err);
      setError("Greska prilikom izmene posta.");
    }
  };
  return (
    <div className="editpost-overlay">
      <div className="editpost-form">
        <form onSubmit={handleEdit}>
        <h3>Izmeni post</h3>

        <input type="text" placeholder="Naslov (opciono)" value={title} onChange={(e) => setTitle(e.target.value)}/>

        <textarea placeholder="Opis (opciono)" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <input type="text" placeholder="URL slike (opciono)" value={image} onChange={(e) => setImage(e.target.value)}/>

        <div className="form-buttons">
          <button type="submit">Save</button>
          <button onClick={() => setEditPost(false)} type="button">Cancel</button>
        </div>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
      </div>
    </div>
  );
};

export default EditPost;
