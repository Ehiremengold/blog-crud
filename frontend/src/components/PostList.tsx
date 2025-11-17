import React, { useEffect, useState } from "react";
import { type Post } from "../types";
import axios from "axios";
import { API_URL } from "../utils";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${API_URL}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setPosts(posts.filter((post: Post) => post._id !== id));
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 mb-4 shadow">
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm">
            By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <button
            className="bg-red-500 text-white px-2 py-1"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
          {/* Add edit button later */}
        </div>
      ))}
    </div>
  );
};

export default PostList;
