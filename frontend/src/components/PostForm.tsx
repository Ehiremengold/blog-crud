import React, { useState } from "react";
import axios from "axios";
import { type Post } from "../types";
import { API_URL } from "../utils";

interface Props {
  post?: Post;
  onSubmit: () => void;
}

const PostForm = ({ post, onSubmit }: Props) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [author, setAuthor] = useState(post?.author || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, content, author };
    if (post) {
      await axios.put(`${API_URL}/${post._id}`, data);
    } else {
      await axios.post(`${API_URL}`);
    }
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow">
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
        {post ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default PostForm;
