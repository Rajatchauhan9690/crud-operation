import React, { useState, useEffect } from "react";
import { deletePost, getPosts } from "../api/api.js";
import Form from "./Form.jsx";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [updateData, setUpdateData] = useState({});

  const getPostsData = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } else {
        console.log("failed to delete the post : ", res.status);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdatedData = async ({ id, title, body }) => {
    setUpdateData({ id, title, body });
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      <Form
        posts={posts}
        setPosts={setPosts}
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
      <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ id, title, body }, index) => (
          <div
            key={id}
            className="rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 bg-gray-200"
          >
            <h2 className="text-sm font-bold text-blue-600 mb-2">
              Post #{index + 1}
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">{body}</p>

            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setUpdateData({ id, title, body })}
              >
                Edit
              </button>

              <button
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
