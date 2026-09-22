import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

const MyOrders = () => {
  const api = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/api/orders/${user.uid}`
        );

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Failed to load orders:", error);

        setError(
          error.response?.data?.detail ||
          "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user?.uid]);

  const getStatusStep = (status) => {
    const steps = {
      pending: 1,
      accepted: 2,
      onWay: 3,
      complete: 4,
    };

    return steps[status] || 1;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: "Pending",
      accepted: "Accepted",
      onWay: "On the Way",
      complete: "Complete",
    };

    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-lg">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Orders
          </h1>

          <p className="text-base-content/60 mt-2">
            Track the current status of your orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="card bg-base-100 shadow">
            <div className="card-body text-center py-16">
              <h2 className="text-2xl font-semibold">
                No Orders Yet
              </h2>

              <p className="text-base-content/60 mt-2">
                You haven't placed any orders yet.
              </p>

              <button
                onClick={() => navigate("/components")}
                className="btn btn-primary mt-5"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => {
              const currentStep = getStatusStep(order.status);

              return (
                <div
                  key={order.order_id}
                  className="card bg-base-100 shadow"
                >
                  <div className="card-body">

                    {/* ORDER HEADER */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>
                        <h2 className="text-xl font-bold">
                          Order #{order.order_id}
                        </h2>

                        <p className="text-sm text-base-content/60">
                          {new Date(
                            order.created_at
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="badge badge-lg badge-primary">
                        {getStatusText(order.status)}
                      </div>

                    </div>

                    {/* STATUS TRACKER */}
                    <div className="mt-8">

                      <ul className="steps steps-vertical md:steps-horizontal w-full">

                        <li
                          className={`step ${
                            currentStep >= 1
                              ? "step-primary"
                              : ""
                          }`}
                        >
                          Pending
                        </li>

                        <li
                          className={`step ${
                            currentStep >= 2
                              ? "step-primary"
                              : ""
                          }`}
                        >
                          Accepted
                        </li>

                        <li
                          className={`step ${
                            currentStep >= 3
                              ? "step-primary"
                              : ""
                          }`}
                        >
                          On the Way
                        </li>

                        <li
                          className={`step ${
                            currentStep >= 4
                              ? "step-primary"
                              : ""
                          }`}
                        >
                          Complete
                        </li>

                      </ul>

                    </div>

                    {/* PRODUCTS */}
                    <div className="mt-8">

                      <h3 className="font-semibold text-lg mb-4">
                        Ordered Products
                      </h3>

                      <div className="space-y-4">

                        {order.products?.map((product) => (
                          <div
                            key={product.product_id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-lg p-4"
                          >

                            <div className="flex items-center gap-4">

                              {product.product_images && (
                                <img
                                  src={product.product_images}
                                  alt={product.product_name}
                                  className="w-20 h-20 object-contain rounded"
                                />
                              )}

                              <div>
                                <h4 className="font-semibold">
                                  {product.product_name}
                                </h4>

                                <p className="text-sm text-base-content/60">
                                  Quantity: {product.quantity}
                                </p>
                              </div>

                            </div>

                            <div className="text-right">
                              <p className="font-semibold">
                                $
                                {(
                                  Number(product.product_price) *
                                  Number(product.quantity)
                                ).toFixed(2)}
                              </p>

                              <p className="text-sm text-base-content/60">
                                ${Number(
                                  product.product_price
                                ).toFixed(2)} each
                              </p>
                            </div>

                          </div>
                        ))}

                      </div>

                    </div>

                    {/* TOTAL */}
                    <div className="flex justify-end mt-6 border-t pt-5">

                      <div className="text-right">

                        <p className="text-sm text-base-content/60">
                          Total Order Amount
                        </p>

                        <p className="text-2xl font-bold">
                          $
                          {Number(
                            order.total_price || 0
                          ).toFixed(2)}
                        </p>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;