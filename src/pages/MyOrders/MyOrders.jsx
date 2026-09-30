import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaExclamationTriangle,
  FaShoppingBag,
  FaSpinner,
  FaTruck,
} from "react-icons/fa";

import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

const STATUS_STEPS = [
  {
    key: "pending",
    label: "Pending",
    icon: FaClock,
  },
  {
    key: "accepted",
    label: "Accepted",
    icon: FaCheckCircle,
  },
  {
    key: "onWay",
    label: "On the Way",
    icon: FaTruck,
  },
  {
    key: "complete",
    label: "Complete",
    icon: FaCheckCircle,
  },
];

const MyOrders = () => {
  const api = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // ------------------------------------------------------------
  // PRICE FORMAT
  // ------------------------------------------------------------

  const formatPrice = (price) => {
    const value = Number(price);

    if (!Number.isFinite(value)) {
      return "৳0.00";
    }

    return `৳${value.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ------------------------------------------------------------
  // GET PRODUCT IMAGE
  // ------------------------------------------------------------

  const getProductImage = (product) => {
    const images = product?.product_images;

    if (!images) {
      return null;
    }

    // If backend returns an array
    if (Array.isArray(images)) {
      return images[0] || null;
    }

    // If backend returns a JSON string containing an array
    if (
      typeof images === "string" &&
      images.trim().startsWith("[")
    ) {
      try {
        const parsedImages = JSON.parse(images);

        if (Array.isArray(parsedImages)) {
          return parsedImages[0] || null;
        }
      } catch {
        // Ignore invalid JSON and use the original value below
      }
    }

    // If backend returns a normal image URL
    return images;
  };

  // ------------------------------------------------------------
  // CALCULATE ORDER TOTAL
  // ------------------------------------------------------------

  const calculateOrderTotal = (order) => {
    if (!Array.isArray(order?.products)) {
      return 0;
    }

    return order.products.reduce((total, product) => {
      const price = Number(product?.product_price) || 0;
      const quantity = Number(product?.quantity) || 0;

      return total + price * quantity;
    }, 0);
  };

  // ------------------------------------------------------------
  // LOAD ORDERS
  // ------------------------------------------------------------

  const loadOrders = async (initialLoad = false) => {
    if (!user?.uid) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      if (initialLoad) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const response = await api.get(
        `/api/orders/${user.uid}`
      );

      const receivedOrders = response.data?.orders;

      setOrders(
        Array.isArray(receivedOrders)
          ? receivedOrders
          : []
      );

      setError("");
    } catch (err) {
      console.error("Failed to load orders:", err);

      if (initialLoad) {
        setError(
          err.response?.data?.detail ||
            "Failed to load your orders."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ------------------------------------------------------------
  // INITIAL LOAD
  // ------------------------------------------------------------

  useEffect(() => {
    if (!user?.uid) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrders([]);
      setLoading(false);
      return;
    }

    loadOrders(true);
  }, [user?.uid]);

  // ------------------------------------------------------------
  // AUTOMATIC REFRESH
  // ------------------------------------------------------------

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const interval = setInterval(() => {
      loadOrders(false);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [user?.uid]);

  // ------------------------------------------------------------
  // STATUS
  // ------------------------------------------------------------

  const getStatusStep = (status) => {
    switch (status) {
      case "pending":
        return 1;

      case "accepted":
        return 2;

      case "onWay":
        return 3;

      case "complete":
        return 4;

      default:
        return 1;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";

      case "accepted":
        return "Accepted";

      case "onWay":
        return "On the Way";

      case "complete":
        return "Complete";

      default:
        return "Unknown";
    }
  };

  // ------------------------------------------------------------
  // LOADING
  // ------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />

          <p className="mt-4 text-sm text-base-content/60">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // ERROR
  // ------------------------------------------------------------

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">

            <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center">
              <FaExclamationTriangle className="text-error text-xl" />
            </div>

            <h2 className="card-title mt-2">
              Unable to load orders
            </h2>

            <p className="text-sm text-base-content/60">
              {error}
            </p>

            <button
              onClick={() => loadOrders(true)}
              className="btn btn-primary mt-3"
            >
              Try Again
            </button>

          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // MAIN
  // ------------------------------------------------------------

  return (
    <div className="min-h-screen bg-base-200 py-8 mt-15">
      <div className="mx-auto px-4">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FaShoppingBag className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                My Orders
              </h1>

              <p className="text-sm text-base-content/60 mt-1">
                Track your orders and delivery status.
              </p>
            </div>

          </div>

          {/* LIVE TRACKING */}

          <div className="flex items-center gap-2 self-start sm:self-auto">

            {refreshing ? (
              <>
                <FaSpinner className="animate-spin text-primary text-xs" />

                <span className="text-xs text-base-content/50">
                  Updating...
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-success" />

                <span className="text-xs text-base-content/50">
                  Live tracking
                </span>
              </>
            )}

          </div>

        </div>

        {/* NO ORDERS */}

        {orders.length === 0 ? (

          <div className="card bg-base-100 shadow-sm border border-base-300">

            <div className="card-body items-center text-center py-20">

              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <FaBoxOpen className="text-3xl" />
              </div>

              <h2 className="text-2xl font-bold mt-4">
                No Orders Yet
              </h2>

              <p className="text-base-content/60 max-w-md">
                You haven't placed any orders yet.
                Start shopping and your orders will
                appear here.
              </p>

              <button
                onClick={() => navigate("/components")}
                className="btn btn-primary mt-4 gap-2"
              >
                Start Shopping

                <FaChevronRight className="text-xs" />
              </button>

            </div>

          </div>

        ) : (

          /* ORDERS */

          <div className="space-y-6">

            {orders.map((order) => {

              const currentStep =
                getStatusStep(order.status);

              const orderTotal =
                calculateOrderTotal(order);

              const productCount =
                order.products?.reduce(
                  (total, product) =>
                    total +
                    (Number(product?.quantity) || 0),
                  0
                ) || 0;

              return (

                <div
                  key={order.order_id}
                  className="bg-base-100 border border-base-300 rounded-2xl shadow-sm overflow-hidden"
                >

                  {/* ORDER HEADER */}

                  <div className="p-5 sm:p-6 border-b border-base-300">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h2 className="text-xl font-bold">
                            Order #{order.order_id}
                          </h2>

                          <span className="badge badge-primary">
                            {getStatusText(
                              order.status
                            )}
                          </span>

                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-base-content/50">

                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />

                            {order.created_at
                              ? new Date(
                                  order.created_at
                                ).toLocaleString()
                              : "Date unavailable"}
                          </span>

                          <span>•</span>

                          <span>
                            {productCount}{" "}
                            {productCount === 1
                              ? "item"
                              : "items"}
                          </span>

                        </div>

                      </div>

                      {/* ORDER TOTAL */}

                      <div className="bg-base-200 rounded-xl px-5 py-3">

                        <p className="text-xs text-base-content/50">
                          Order Total
                        </p>

                        <p className="text-xl font-bold text-primary">
                          {formatPrice(orderTotal)}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ORDER STATUS */}

                  <div className="p-5 sm:p-6 border-b border-base-300">

                    <div className="flex items-center justify-between mb-6">

                      <div>

                        <h3 className="font-semibold">
                          Order Status
                        </h3>

                        <p className="text-xs text-base-content/50 mt-1">
                          Current status:{" "}

                          <span className="font-semibold text-base-content">
                            {getStatusText(
                              order.status
                            )}
                          </span>
                        </p>

                      </div>

                      <FaTruck className="text-primary text-xl" />

                    </div>

                    {/* DESKTOP STATUS */}

                    <div className="hidden md:block">

                      <div className="grid grid-cols-4">

                        {STATUS_STEPS.map(
                          (step, index) => {

                            const stepNumber =
                              index + 1;

                            const completed =
                              currentStep >=
                              stepNumber;

                            const Icon =
                              step.icon;

                            return (

                              <div
                                key={step.key}
                                className="relative flex flex-col items-center"
                              >

                                {/* CONNECTING LINE */}

                                {index <
                                  STATUS_STEPS.length -
                                    1 && (

                                  <div
                                    className={`absolute top-5 left-1/2 w-full h-0.5 ${
                                      currentStep >
                                      stepNumber
                                        ? "bg-primary"
                                        : "bg-base-300"
                                    }`}
                                  />

                                )}

                                {/* STATUS ICON */}

                                <div
                                  className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                                    completed
                                      ? "border-primary bg-primary text-primary-content"
                                      : "border-base-300 bg-base-100 text-base-content/30"
                                  }`}
                                >

                                  <Icon className="text-sm" />

                                </div>

                                <span
                                  className={`mt-3 text-xs font-semibold ${
                                    completed
                                      ? "text-base-content"
                                      : "text-base-content/40"
                                  }`}
                                >
                                  {step.label}
                                </span>

                              </div>

                            );
                          }
                        )}

                      </div>

                    </div>

                    {/* MOBILE STATUS */}

                    <div className="md:hidden space-y-4">

                      {STATUS_STEPS.map(
                        (step, index) => {

                          const stepNumber =
                            index + 1;

                          const completed =
                            currentStep >=
                            stepNumber;

                          const Icon =
                            step.icon;

                          return (

                            <div
                              key={step.key}
                              className="flex items-center gap-3"
                            >

                              <div
                                className={`w-9 h-9 shrink-0 rounded-full border-2 flex items-center justify-center ${
                                  completed
                                    ? "border-primary bg-primary text-primary-content"
                                    : "border-base-300 bg-base-100 text-base-content/30"
                                }`}
                              >

                                <Icon className="text-xs" />

                              </div>

                              <div>

                                <p
                                  className={`text-sm font-semibold ${
                                    completed
                                      ? "text-base-content"
                                      : "text-base-content/40"
                                  }`}
                                >
                                  {step.label}
                                </p>

                                {currentStep ===
                                  stepNumber && (

                                  <p className="text-[11px] text-primary">
                                    Current status
                                  </p>

                                )}

                              </div>

                            </div>

                          );
                        }
                      )}

                    </div>

                  </div>

                  {/* PRODUCTS */}

                  <div className="p-5 sm:p-6">

                    <div className="flex items-center justify-between mb-4">

                      <div>

                        <h3 className="font-semibold">
                          Ordered Products
                        </h3>

                        <p className="text-xs text-base-content/50 mt-1">
                          Components included in this order.
                        </p>

                      </div>

                      <span className="badge badge-ghost">
                        {productCount}{" "}
                        {productCount === 1
                          ? "Item"
                          : "Items"}
                      </span>

                    </div>

                    <div className="space-y-3">

                      {order.products?.map(
                        (product, index) => {

                          const price =
                            Number(
                              product?.product_price
                            ) || 0;

                          const quantity =
                            Number(
                              product?.quantity
                            ) || 0;

                          const subtotal =
                            price * quantity;

                          const productImage =
                            getProductImage(product);

                          return (

                            <div
                              key={
                                product?.product_id ||
                                index
                              }
                              className="border border-base-300 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-base-200/40 transition"
                            >

                              {/* PRODUCT */}

                              <div className="flex items-center gap-4 min-w-0">

                                <div className="w-20 h-20 shrink-0 rounded-xl bg-base-200 overflow-hidden flex items-center justify-center">

                                  {productImage ? (

                                    <img
                                      src={productImage}
                                      alt={
                                        product?.product_name ||
                                        "Product"
                                      }
                                      className="w-full h-full object-contain"
                                      onError={(event) => {
                                        event.currentTarget.style.display =
                                          "none";
                                      }}
                                    />

                                  ) : (

                                    <FaBoxOpen className="text-xl text-base-content/20" />

                                  )}

                                </div>

                                <div className="min-w-0">

                                  <h4 className="font-semibold text-sm line-clamp-2">
                                    {product?.product_name ||
                                      "Unknown Product"}
                                  </h4>

                                  <p className="text-xs text-base-content/50 mt-1">
                                    Quantity:{" "}

                                    <span className="font-semibold text-base-content/70">
                                      {quantity}
                                    </span>
                                  </p>

                                  <p className="text-xs text-base-content/50 mt-1">
                                    {formatPrice(price)} each
                                  </p>

                                </div>

                              </div>

                              {/* SUBTOTAL */}

                              <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0">

                                <p className="text-[10px] uppercase tracking-wide text-base-content/40">
                                  Subtotal
                                </p>

                                <p className="font-bold text-base">
                                  {formatPrice(
                                    subtotal
                                  )}
                                </p>

                              </div>

                            </div>

                          );
                        }
                      )}

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div className="bg-base-200/50 border-t border-base-300 px-5 sm:px-6 py-4">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                      <div className="flex items-center gap-2 text-xs text-base-content/50">

                        <FaShoppingBag className="text-primary" />

                        <span>
                          Order #{order.order_id}
                        </span>

                        <span>•</span>

                        <span>
                          {getStatusText(
                            order.status
                          )}
                        </span>

                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">

                        <span className="text-sm text-base-content/50">
                          Total
                        </span>

                        <span className="text-xl font-bold text-primary">
                          {formatPrice(orderTotal)}
                        </span>

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