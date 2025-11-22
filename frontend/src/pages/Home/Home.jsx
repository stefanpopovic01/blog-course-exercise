import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "../../components/SinglePost/SinglePost"
import NewPost from "../NewPost/NewPost";
import "./Home.css";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);

    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/posts");
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Greška prilikom učitavanja postova:", err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };
    
  useEffect(() => {
    fetchPosts();
  }, []);

  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to MyBlog</h1>
        <p>A place where you can share your thoughts with the world!</p> 
        {token && ( <button className="add-post-btn" type="button" aria-label="Add Post" onClick={() => setShowNewPost(!showNewPost)}> Add Post </button> )}
      </header>
      {showNewPost && <NewPost onClose={() => setShowNewPost(false)} onPostAdded={fetchPosts}/>}

      {loading ? (
        <p style={{ textAlign: "center" }}>Učitavanje postova...</p>
      ) : (
        <section className="posts-grid">
          {posts.map((post) => (
            <SinglePost key={post._id} post={post} onPostDeleted={fetchPosts}/>
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;
