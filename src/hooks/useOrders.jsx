import { useState } from "react";
import useApi from "./useApi";

const useOrders = () => {
  const api = useApi();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================================================
  // GET ALL ORDERS
  // =========================================================

  const getAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/orders/");

      setOrders(response.data.orders || []);

      return response.data.orders || [];
    } catch (error) {
      console.error("Failed to fetch orders:", error);

      setError(
        error.response?.data?.detail ||
        "Failed to load orders."
      );

      return [];
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GET SINGLE ORDER DETAILS
  // =========================================================

  const getOrderDetails = async (orderId) => {
    const response = await api.get(
      `/api/orders/details/${orderId}`
    );

    return response.data.order;
  };

  // =========================================================
  // UPDATE ORDER STATUS
  // =========================================================

  const updateOrderStatus = async (orderId, status) => {
    const response = await api.patch(
      `/api/orders/${orderId}/status`,
      {
        status: status,
      }
    );

    return response.data;
  };

  return {
    orders,
    loading,
    error,
    getAllOrders,
    getOrderDetails,
    updateOrderStatus,
  };
};

export default useOrders;