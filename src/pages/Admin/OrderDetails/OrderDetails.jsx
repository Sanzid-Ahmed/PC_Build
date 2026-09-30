import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router";

import useOrders from "../../../hooks/useOrders";

import useProducts from "../../../hooks/useProducts";

const OrderDetails = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const { getOrderDetails, updateOrderStatus } = useOrders();

  // =========================================================
  // PRODUCTS
  // =========================================================

  const {
    products: allProducts,
    loading: productsLoading,
  } = useProducts();

  // =========================================================
  // ORDER STATE
  // =========================================================

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

        console.log("ORDER DETAILS:", data);

        setOrder(data);
      } catch (error) {
        console.error("Failed to load order:", error);

        setError(
          error.response?.data?.detail ||
            "Failed to load order."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  // =========================================================
  // UPDATE STATUS
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
      console.error(
        "Failed to update order status:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to update order status."
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================================================
  // FIND PRODUCT FROM useProducts()
  // =========================================================

  const getMatchedProduct = (orderProduct) => {
    if (!orderProduct || !allProducts?.length) {
      return null;
    }

    const productId =
      orderProduct.product_id ??
      orderProduct.id;

    const matchedProduct = allProducts.find(
      (product) =>
        Number(product.id) === Number(productId)
    );

    return matchedProduct || null;
  };

  // =========================================================
  // GET PRODUCT URL
  // =========================================================

  const getProductUrl = (product) => {
    if (!product?.url) {
      return null;
    }

    const url = product.url;

    // URL is already an array
    if (Array.isArray(url)) {
      const firstUrl = url[0];

      if (
        typeof firstUrl === "string" &&
        firstUrl.trim()
      ) {
        return firstUrl.trim();
      }

      return null;
    }

    // URL is a string
    if (typeof url === "string") {
      const trimmedUrl = url.trim();

      if (!trimmedUrl) {
        return null;
      }

      // Try JSON parsing
      try {
        const parsed = JSON.parse(trimmedUrl);

        if (Array.isArray(parsed)) {
          const firstUrl = parsed[0];

          if (
            typeof firstUrl === "string" &&
            firstUrl.trim()
          ) {
            return firstUrl.trim();
          }

          return null;
        }

        if (typeof parsed === "string") {
          return parsed.trim() || null;
        }
      } catch {
        // It is a normal URL string.
      }

      return trimmedUrl;
    }

    return null;
  };

  // =========================================================
  // GET PRODUCT IMAGE
  // =========================================================

  const getProductImage = (product) => {
    if (!product?.images) {
      return null;
    }

    const image = product.images;

    // Already an array
    if (Array.isArray(image)) {
      const firstImage = image[0];

      if (
        typeof firstImage === "string" &&
        firstImage.trim()
      ) {
        return firstImage.trim();
      }

      return null;
    }

    // String
    if (typeof image === "string") {
      const trimmedImage = image.trim();

      if (!trimmedImage) {
        return null;
      }

      // Try JSON parsing
      try {
        const parsed = JSON.parse(trimmedImage);

        if (Array.isArray(parsed)) {
          const firstImage = parsed[0];

          if (
            typeof firstImage === "string" &&
            firstImage.trim()
          ) {
            return firstImage.trim();
          }

          return null;
        }

        if (typeof parsed === "string") {
          return parsed.trim() || null;
        }
      } catch {
        // Not JSON
      }

      return trimmedImage;
    }

    return null;
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";

      case "accepted":
        return "badge-info";

      case "onWay":
        return "badge-primary";

      case "complete":
        return "badge-success";

      default:
        return "badge-neutral";
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>

          <p className="text-sm text-base-content/60">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-base-100 border border-error/20 shadow-lg rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Unable to Load Order
          </h2>

          <p className="text-base-content/60 mb-6">
            {error}
          </p>

          <Link
            to="/admin"
            className="btn btn-primary"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const orderProducts = order.products || [];

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-base-200/50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8">
          <button
            onClick={() => navigate("/admin")}
            className="btn btn-ghost btn-sm mb-5 gap-2"
          >
            ← Back to Orders
          </button>

          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* ORDER INFORMATION */}

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">

                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Order #{order.order_id || orderId}
                  </h1>

                  <span
                    className={`badge ${getStatusStyle(
                      order.status
                    )} capitalize font-semibold px-3 py-3`}
                  >
                    {order.status || "unknown"}
                  </span>

                </div>

                <p className="text-sm text-base-content/50">
                  {order.created_at
                    ? `Placed on ${new Date(
                        order.created_at
                      ).toLocaleString()}`
                    : "Order details"}
                </p>
              </div>

              {/* STATUS */}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                <label className="text-sm font-semibold text-base-content/70">
                  Update Status
                </label>

                <select
                  value={
                    order.status || "pending"
                  }
                  onChange={handleStatusChange}
                  disabled={updating}
                  className="select select-bordered select-sm sm:select-md min-w-[160px]"
                >
                  <option value="pending">
                    Pending
                  </option>

                  <option value="accepted">
                    Accepted
                  </option>

                  <option value="onWay">
                    On Way
                  </option>

                  <option value="complete">
                    Complete
                  </option>
                </select>

                {updating && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CUSTOMER + SUMMARY
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* CUSTOMER */}

          <div className="lg:col-span-2 bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-lg">
                👤
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Customer Information
                </h2>

                <p className="text-xs text-base-content/50">
                  Customer details for this order
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

              {/* NAME */}

              <div>
                <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
                  Name
                </p>

                <p className="font-semibold">
                  {order.user_name || "N/A"}
                </p>
              </div>

              {/* EMAIL */}

              <div>
                <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
                  Email
                </p>

                {order.user_email ? (
                  <a
                    href={`mailto:${order.user_email}`}
                    className="font-semibold text-primary hover:underline break-all"
                  >
                    {order.user_email}
                  </a>
                ) : (
                  <p className="font-semibold">
                    N/A
                  </p>
                )}
              </div>

              {/* USER ID */}

              <div>
                <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
                  User ID
                </p>

                <p className="font-mono text-sm break-all">
                  {order.user_id || "N/A"}
                </p>
              </div>

              {/* FIREBASE ID */}

              <div>
                <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
                  Firebase ID
                </p>

                <p className="font-mono text-sm break-all">
                  {order.firebase_id || "N/A"}
                </p>
              </div>

            </div>
          </div>

          {/* ORDER SUMMARY */}

          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success text-lg">
                🛒
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Order Summary
                </h2>

                <p className="text-xs text-base-content/50">
                  Purchase overview
                </p>
              </div>

            </div>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-base-content/60">
                  Products
                </span>

                <span className="font-semibold">
                  {orderProducts.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-base-content/60">
                  Total Quantity
                </span>

                <span className="font-semibold">
                  {orderProducts.reduce(
                    (total, product) =>
                      total +
                      Number(
                        product.quantity || 0
                      ),
                    0
                  )}
                </span>
              </div>

              <div className="border-t border-base-300 pt-4">

                <p className="text-xs text-base-content/50 mb-1">
                  Total Order Amount
                </p>

                <p className="text-2xl font-black text-primary">
                  ৳{" "}
                  {Number(
                    order.total_price || 0
                  ).toLocaleString()}
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">

          {/* PRODUCTS HEADER */}

          <div className="p-5 sm:p-6 border-b border-base-300">

            <div>
              <h2 className="text-xl font-bold">
                Ordered Products
              </h2>

              <p className="text-sm text-base-content/50 mt-1">
                {orderProducts.length} product
                {orderProducts.length !== 1
                  ? "s"
                  : ""}{" "}
                in this order
              </p>
            </div>

          </div>

          {/* PRODUCT LIST */}

          <div className="p-4 sm:p-6 space-y-4">

            {orderProducts.length === 0 ? (
              <div className="text-center py-12">

                <div className="text-5xl mb-3">
                  📦
                </div>

                <p className="font-semibold">
                  No products found
                </p>

              </div>
            ) : (
              orderProducts.map(
                (orderProduct, index) => {

                  // =================================================
                  // MATCH ORDER PRODUCT
                  // =================================================

                  const matchedProduct =
                    getMatchedProduct(
                      orderProduct
                    );

                  // =================================================
                  // PRODUCT INFORMATION
                  // =================================================

                  const productImage =
                    getProductImage(
                      matchedProduct
                    );

                  const productUrl =
                    getProductUrl(
                      matchedProduct
                    );

                  const productName =
                    matchedProduct?.name ||
                    orderProduct.product_name ||
                    "Unnamed Product";

                  const storeName =
                    matchedProduct?.store ||
                    orderProduct.store ||
                    "Unknown Store";

                  const productId =
                    orderProduct.product_id ??
                    matchedProduct?.id ??
                    orderProduct.id;

                  const price = Number(
                    orderProduct.product_price ??
                      matchedProduct?.price ??
                      0
                  );

                  const quantity = Number(
                    orderProduct.quantity || 0
                  );

                  const subtotal =
                    price * quantity;

                  return (
                    <div
                      key={
                        productId ||
                        `${productName}-${index}`
                      }
                      className="border border-base-300 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                    >

                      <div className="flex flex-col lg:flex-row gap-5">

                        {/* =================================================
                            IMAGE
                        ================================================= */}

                        <div className="shrink-0">

                          <div className="w-full lg:w-32 h-44 lg:h-32 rounded-xl bg-base-200 border border-base-300 flex items-center justify-center overflow-hidden">

                            {productImage ? (
                              <img
                                src={productImage}
                                alt={productName}
                                className="w-full h-full object-contain p-3"
                                onError={(event) => {
                                  event.currentTarget.style.display =
                                    "none";

                                  const parent =
                                    event.currentTarget
                                      .parentElement;

                                  if (parent) {
                                    parent.innerHTML =
                                      '<div class="text-4xl opacity-40">📦</div>';
                                  }
                                }}
                              />
                            ) : (
                              <div className="text-4xl opacity-40">
                                📦
                              </div>
                            )}

                          </div>
                        </div>

                        {/* =================================================
                            INFORMATION
                        ================================================= */}

                        <div className="flex-1 min-w-0">

                          {/* PRODUCT NUMBER */}

                          <div className="flex items-center gap-2 mb-2">

                            <span className="badge badge-ghost badge-sm">
                              Product #{index + 1}
                            </span>

                          </div>

                          {/* PRODUCT NAME */}

                          <h3 className="text-lg sm:text-xl font-bold leading-tight mb-3">
                            {productName}
                          </h3>

                          {/* STORE */}

                          <div className="flex items-center gap-2 mb-3">

                            <span className="text-sm text-base-content/50">
                              Shop:
                            </span>

                            <span className="font-black text-primary text-sm sm:text-base">
                              {storeName}
                            </span>

                          </div>

                          {/* PRODUCT ID */}

                          <p className="text-xs text-base-content/50 mb-4">
                            Product ID:{" "}
                            <span className="font-mono">
                              {productId || "N/A"}
                            </span>
                          </p>

                          {/* PRICE INFORMATION */}

                          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">

                            <div>
                              <p className="text-xs text-base-content/50">
                                Unit Price
                              </p>

                              <p className="font-bold">
                                ৳{" "}
                                {price.toLocaleString()}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-base-content/50">
                                Quantity
                              </p>

                              <p className="font-bold">
                                × {quantity}
                              </p>
                            </div>

                          </div>
                        </div>

                        {/* =================================================
                            RIGHT SIDE
                        ================================================= */}

                        <div className="lg:w-48 flex lg:flex-col justify-between lg:justify-center items-end gap-4 border-t lg:border-t-0 lg:border-l border-base-300 pt-4 lg:pt-0 lg:pl-5">

                          {/* SUBTOTAL */}

                          <div className="text-right">

                            <p className="text-xs text-base-content/50 mb-1">
                              Subtotal
                            </p>

                            <p className="text-xl sm:text-2xl font-black">
                              ৳{" "}
                              {subtotal.toLocaleString()}
                            </p>

                          </div>

                          {/* =================================================
                              OPEN PRODUCT
                          ================================================= */}

                          {productUrl ? (
                            <a
                              href={productUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline btn-primary btn-sm gap-2"
                            >
                              ↗ Open Product
                            </a>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="btn btn-outline btn-warning btn-sm gap-2"
                              title={
                                matchedProduct
                                  ? "This product has no original shop URL"
                                  : "Product information is still loading or could not be matched"
                              }
                            >
                              ⚠ URL Missing
                            </button>
                          )}

                        </div>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>

          {/* =====================================================
              TOTAL
          ===================================================== */}

          <div className="border-t border-base-300 bg-base-200/40 p-5 sm:p-6">

            <div className="flex justify-end">

              <div className="w-full sm:w-auto sm:min-w-[300px]">

                <div className="flex justify-between items-center mb-3">

                  <span className="text-base-content/60">
                    Total Products
                  </span>

                  <span className="font-semibold">
                    {orderProducts.length}
                  </span>

                </div>

                <div className="flex justify-between items-center mb-3">

                  <span className="text-base-content/60">
                    Total Quantity
                  </span>

                  <span className="font-semibold">
                    {orderProducts.reduce(
                      (total, product) =>
                        total +
                        Number(
                          product.quantity || 0
                        ),
                      0
                    )}
                  </span>

                </div>

                <div className="border-t border-base-300 pt-4 flex justify-between items-center">

                  <span className="font-bold text-lg">
                    Total
                  </span>

                  <span className="text-2xl sm:text-3xl font-black text-primary">
                    ৳{" "}
                    {Number(
                      order.total_price || 0
                    ).toLocaleString()}
                  </span>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;