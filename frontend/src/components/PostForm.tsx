import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils";

const PostForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const res = await axios.get(`${API_URL}/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setAuthor(res.data.author);
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, content, author };
    if (id) {
      await axios.put(`${API_URL}/${id}`, data);
    } else {
      await axios.post(`${API_URL}`, data);
    }
    window.location.href = "/";
  };
  return (
    <section className="mx-auto my-20 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        {id ? "Edit Post" : "Create Post"}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow ">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </section>
  );
};

export default PostForm;
