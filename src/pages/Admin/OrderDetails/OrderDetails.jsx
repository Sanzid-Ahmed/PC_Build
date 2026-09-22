import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useOrders from "../../../hooks/useOrders";
import { useNavigate } from "react-router";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { getOrderDetails, updateOrderStatus } = useOrders();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD ORDER
  // =========================================================

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrderDetails(orderId);

        setOrder(data);
      } catch (error) {
        console.error("Failed to load order:", error);

        setError(error.response?.data?.detail || "Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  // =========================================================
  // CHANGE STATUS
  // =========================================================

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;

    try {
      setUpdating(true);

      await updateOrderStatus(orderId, newStatus);

      setOrder((currentOrder) => ({
        ...currentOrder,
        status: newStatus,
      }));
    } catch (error) {
      console.error("Failed to update order status:", error);

      alert(error.response?.data?.detail || "Failed to update order status.");
    } finally {
      setUpdating(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="p-6">
        <div className="alert alert-error">{error}</div>

        <Link
          //   to="/manage-user"
          to="/admin"
          className="btn mt-4"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate("/admin")}
            className="btn btn-outline"
          >
            ← Back to Orders
          </button>

          <h1 className="text-3xl font-bold mt-2">Order #{order.order_id}</h1>

          <p className="text-gray-500 mt-1">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        {/* STATUS */}

        <div className="flex items-center gap-3">
          <span className="font-semibold">Status:</span>

          <select
            value={order.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="select select-bordered"
          >
            <option value="pending">Pending</option>

            <option value="accepted">Accepted</option>

            <option value="onWay">On Way</option>

            <option value="complete">Complete</option>
          </select>
        </div>
      </div>

      {/* =====================================================
          CUSTOMER INFORMATION
      ===================================================== */}

      <div className="bg-base-100 rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Customer Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>

            <p className="font-semibold">{order.user_name || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>

            <a
              href={`mailto:${order.user_email}`}
              className="font-semibold text-primary hover:underline"
            >
              {order.user_email || "N/A"}
            </a>
          </div>

          <div>
            <p className="text-sm text-gray-500">User ID</p>

            <p className="font-semibold break-all">{order.user_id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Firebase ID</p>

            <p className="font-semibold break-all">{order.firebase_id}</p>
          </div>
        </div>
      </div>

      {/* =====================================================
          ORDERED PRODUCTS
      ===================================================== */}

      <div className="bg-base-100 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Ordered Products</h2>

        <div className="space-y-4">
          {order.products?.map((product) => (
            <div
              key={product.product_id}
              className="flex flex-col md:flex-row md:items-center gap-4 border rounded-lg p-4"
            >
              {/* IMAGE */}

              {product.product_images && (
                <img
                  src={product.product_images}
                  alt={product.product_name}
                  className="w-24 h-24 object-contain rounded"
                />
              )}

              {/* PRODUCT INFO */}

              <div className="flex-1">
                <h3 className="font-bold text-lg">{product.product_name}</h3>

                <p className="text-sm text-gray-500">
                  Product ID: {product.product_id}
                </p>

                <p className="mt-2">
                  Price: ৳ {Number(product.product_price).toLocaleString()}
                </p>

                <p>Quantity: {product.quantity}</p>
              </div>

              {/* SUBTOTAL */}

              <div className="text-right">
                <p className="text-sm text-gray-500">Subtotal</p>

                <p className="text-xl font-bold">
                  ৳{" "}
                  {(
                    Number(product.product_price) * Number(product.quantity)
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===================================================
            TOTAL
        =================================================== */}

        <div className="border-t mt-6 pt-6 flex justify-end">
          <div className="text-right">
            <p className="text-gray-500">Total Order Amount</p>

            <p className="text-3xl font-bold">
              ৳ {Number(order.total_price).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
