import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "../../components/SinglePost/SinglePost"
import NewPost from "../NewPost/NewPost";
import { getPosts } from "../../api/services/postService";
import "./Home.css";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

    const fetchPosts = async (search, p = 1) => {
      try {
        const { data } = await getPosts(search, p);

        setPosts(data.posts);
        setPage(data.page);
        setTotalPages(data.totalPages);
        setLoading(false);
        console.log("Search je : ", search);
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
        <form className="home-search-form" onSubmit={(e) => {e.preventDefault(); fetchPosts(search, 1);}}>
          <input placeholder="Search blogs.." type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
          <button type="submit">Search</button>
        </form>
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

      <div className="page-buttons">
        {Array.from( {length: totalPages} ).map((_, i) => (
          <button key={i} onClick={() => fetchPosts(search, i + 1)}>{ i + 1 }</button>
        ))}
      </div>
    </div>
  );
};

export default Home;
