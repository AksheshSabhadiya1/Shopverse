import axios from "axios";

export const fetchTotalUsers = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/admin/users", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log("Error while fetching total users data");
  }
};

export const fetchAdminData = async() => {
  const {data} = await axios.get('http://localhost:5000/admin')
  return data[0]
}

export const fetchAllProductData = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/admin/products", {
      withCredentials: true,
    });
    return data
  } catch (error) {
    console.log("Data Fetching Error", error);
  }
};

export const fetchProductData = async (id) => {
  try {
      const { data } = await axios.get(`http://localhost:5000/admin/products/${id}`, {
          withCredentials: true,
      });
      return data
  } catch (error) {
      console.log("Product Fetching Error", error);
  }
};

