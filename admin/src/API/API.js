import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
})

export const fetchTotalUsers = async () => {
  try {
    const { data } = await api.get("/admin/users", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log("Users Data fetching error", error);
  }
};

export const fetchAdminData = async() => {
  try {
    const {data} = await api.get('/admin')
    return data[0]
  } catch (error) {
    console.log("Admin Data fetching error", error);
  }
}

export const fetchAllProductData = async () => {
  try {
    const { data } = await api.get("/admin/products", {
      withCredentials: true,
    });
    return data
  } catch (error) {
    console.log("Product Data Fetching Error", error);
  }
};

export const fetchProductData = async (id) => {
  try {
      const { data } = await api.get(`/admin/products/${id}`, {
          withCredentials: true,
      });
      return data
  } catch (error) {
      console.log("Product Data Fetching Error", error);
  }
};

