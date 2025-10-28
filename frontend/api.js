import axios from "axios";

// ✅ Base URL of your FastAPI backend
const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // change if running on a server
});

// ✅ Add token automatically (if user logged in)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ---------------- AUTH ----------------

// Register
export const registerUser = (data) => API.post("/register", data);

// Login
export const loginUser = (data) => API.post("/login", data);

// Current user
export const fetchMe = () => API.get("/me");

// ---------------- PRODUCTS ----------------

// Get all products
export const getProducts = () => API.get("/products");

// Create product (for farmers/vendors)
export const createProduct = (data) => API.post("/products", data);

// ---------------- ORDERS ----------------

// Place an order
export const placeOrder = (data) => API.post("/orders", data);

// Get my orders
export const getOrders = () => API.get("/orders");

// ---------------- CHATBOT ----------------

// Ask chatbot
export const askChatbot = (query) => API.get(`/chatbot?query=${query}`);

// ---------------- DISEASE PREDICTION ----------------

// Upload image for crop disease detection
export const predictDisease = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ---------------- CONTACT ----------------

// Save contact form
export const sendContact = (data) => API.post("/contact", data);

export default API;
