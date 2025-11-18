import { useEffect, useState } from "react";
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
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <a href="/create">
          <button className="bg-blue-500 px-4 rounded-md   py-2 text-white">
            Create +{" "}
          </button>
        </a>
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Create one!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>
                  By <strong>{post.author}</strong>
                </span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <a
                  href={`/${post._id}`}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
