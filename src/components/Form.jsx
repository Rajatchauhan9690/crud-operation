import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../api/api";

const Form = ({ posts, setPosts, updateData, setUpdateData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    updateData &&
      setAddData({
        title: updateData.title || "",
        body: updateData.body || "",
      });
  }, [updateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    try {
      const res = await createPost(addData);
      // console.log("Post created:", res.data);
      if (res.status === 201) {
        const newPost = {
          ...res.data,
          id: Date.now(),
        };

        setPosts((prev) => [...prev, newPost]);
      } else {
        console.log("failed to create the post : ", res.status);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (updateData) {
      updatePostData();
    } else {
      addPostData();
    }

    setAddData({
      title: "",
      body: "",
    });
  };

  const updatePostData = async () => {
    try {
      const res = await updatePost(updateData.id, addData);
      console.log(res);

      if (res.status === 200) {
        setPosts((prev) =>
          prev.map((post) => (post.id === res.data.id ? res.data : post)),
        );

        setUpdateData(null);
      } else {
        console.log("Failed to update:", res.status);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className=" p-6 flex justify-center">
      <form onSubmit={handleAdd} className="flex items-center gap-4">
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-200 text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="text"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-200 text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 active:scale-95 transition duration-200"
        >
          {updateData ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Form;
