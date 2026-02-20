import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const res = await axios.delete(`${API_URL}/posts/${postId}`);
    return res;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const res = await axios.post(`${API_URL}/posts`, postData);
    return res;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const res = await axios.put(`${API_URL}/posts/${id}`, post);
    return res;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
