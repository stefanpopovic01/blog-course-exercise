import React, { useState } from "react";
import axios from "axios";
import "./NewPost.css";
import { useContext } from "react";
import { AuthContext } from "../../contex/AuthContex";

const NewPost = ({ onClose, onPostAdded }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/posts",
        { title, description, image, author: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setSuccess("Post uspešno dodat!");
      setError("");
      setTitle("");
      setDescription("");
      setImage("");

    if (onPostAdded) onPostAdded();
    if (onClose) onClose();
    } catch (err) {
      setError("Došlo je do greške prilikom dodavanja posta.");
      setSuccess("");
    }
  };

  return (
    <div className="newpost-overlay">
      <form className="newpost-form" onSubmit={handleSubmit}>
        <h3>Dodaj novi post</h3>

        <input
          type="text"
          placeholder="Naslov"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="URL fotografije (opciono)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>

        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default NewPost;
