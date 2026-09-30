import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import useOrders from "../../../hooks/useOrders";

const ManageUser = () => {

  const {
    orders,
    loading,
    error,
    getAllOrders,
    deleteOrder
  } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [deletingOrderId, setDeletingOrderId] = useState(null);

  const navigate = useNavigate();


  // =========================================================
  // LOAD ALL ORDERS
  // =========================================================

  useEffect(() => {

    getAllOrders();

  }, []);


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) return "N/A";

    return new Date(date).toLocaleString();

  };


  // =========================================================
  // CLOSE DETAILS MODAL
  // =========================================================

  const closeDetails = () => {

    setSelectedOrder(null);

  };


  // =========================================================
  // DELETE ORDER
  // =========================================================

  const handleDeleteOrder = async (orderId) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete Order #${orderId}?`
    );

    if (!confirmed) {
      return;
    }

    try {

      setDeletingOrderId(orderId);

      await deleteOrder(orderId);

      // If deleted order was open in modal,
      // close the modal.
      if (
        selectedOrder &&
        selectedOrder.order_id === orderId
      ) {
        setSelectedOrder(null);
      }

    } catch (error) {

      console.error(
        "Failed to delete order:",
        error
      );

      alert(
        error.response?.data?.detail ||
        "Failed to delete order."
      );

    } finally {

      setDeletingOrderId(null);

    }

  };


  return (

    <div className="p-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Manage Orders
        </h1>

        <p className="text-gray-500 mt-1">
          View and manage customer orders
        </p>

      </div>


      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div className="flex justify-center py-10">

          <span className="loading loading-spinner loading-lg"></span>

        </div>

      )}


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div className="alert alert-error mb-6">

          <span>
            {error}
          </span>

        </div>

      )}


      {/* =====================================================
          NO ORDERS
      ===================================================== */}

      {!loading &&
        !error &&
        orders.length === 0 && (

          <div className="text-center py-10">

            <p className="text-gray-500">
              No orders found.
            </p>

          </div>

        )}


      {/* =====================================================
          ORDERS TABLE
      ===================================================== */}

      {!loading && orders.length > 0 && (

        <div className="overflow-x-auto bg-base-100 rounded-xl shadow">

          <table className="table">

            <thead>

              <tr>

                <th>
                  Order ID
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Email
                </th>

                <th>
                  Date
                </th>

                <th>
                  Status
                </th>

                <th>
                  Total
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map((order) => (

                <tr key={order.order_id}>

                  {/* =================================================
                      ORDER ID
                  ================================================= */}

                  <td>

                    <span className="font-semibold">
                      #{order.order_id}
                    </span>

                  </td>


                  {/* =================================================
                      CUSTOMER
                  ================================================= */}

                  <td>
                    {order.user_name || "Unknown User"}
                  </td>


                  {/* =================================================
                      EMAIL
                  ================================================= */}

                  <td>
                    {order.user_email || "N/A"}
                  </td>


                  {/* =================================================
                      DATE
                  ================================================= */}

                  <td>
                    {formatDate(order.created_at)}
                  </td>


                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <td>

                    <span
                      className={`badge ${
                        order.status === "pending"
                          ? "badge-warning"
                          : order.status === "accepted"
                            ? "badge-info"
                            : order.status === "onWay"
                              ? "badge-primary"
                              : order.status === "complete"
                                ? "badge-success"
                                : "badge-ghost"
                      }`}
                    >

                      {order.status}

                    </span>

                  </td>


                  {/* =================================================
                      TOTAL PRICE
                  ================================================= */}

                  <td>

                    ৳{" "}

                    {Number(
                      order.total_price || 0
                    ).toLocaleString()}

                  </td>


                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <td>

                    <div className="flex items-center gap-2">

                      {/* VIEW DETAILS */}

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/manage-orders/${order.order_id}`
                          )
                        }
                        className="btn btn-sm btn-primary"
                      >
                        View Details
                      </button>


                      {/* DELETE */}

                      <button
                        onClick={() =>
                          handleDeleteOrder(
                            order.order_id
                          )
                        }
                        disabled={
                          deletingOrderId ===
                          order.order_id
                        }
                        className="btn btn-sm btn-error"
                      >

                        {deletingOrderId ===
                        order.order_id ? (

                          <>
                            <span className="loading loading-spinner loading-xs"></span>

                            Deleting...
                          </>

                        ) : (

                          "Delete"

                        )}

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}


      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {selectedOrder && (

        <div className="modal modal-open">

          <div className="modal-box max-w-4xl">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex justify-between items-start mb-6">

              <div>

                <h2 className="text-2xl font-bold">

                  Order #{selectedOrder.order_id}

                </h2>

                <p className="text-gray-500">

                  {formatDate(
                    selectedOrder.created_at
                  )}

                </p>

              </div>


              <button
                onClick={closeDetails}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>

            </div>


            {/* =================================================
                CUSTOMER INFORMATION
            ================================================= */}

            <div className="bg-base-200 rounded-lg p-4 mb-6">

              <h3 className="font-bold text-lg mb-2">
                Customer Information
              </h3>

              <p>

                <span className="font-semibold">
                  Name:
                </span>{" "}

                {selectedOrder.user_name || "N/A"}

              </p>


              <p>

                <span className="font-semibold">
                  Email:
                </span>{" "}

                {selectedOrder.user_email || "N/A"}

              </p>


              <p>

                <span className="font-semibold">
                  Firebase ID:
                </span>{" "}

                {selectedOrder.firebase_id || "N/A"}

              </p>

            </div>


            {/* =================================================
                ORDER STATUS
            ================================================= */}

            <div className="mb-6">

              <h3 className="font-bold text-lg mb-2">
                Order Status
              </h3>

              <span
                className={`badge badge-lg ${
                  selectedOrder.status === "pending"
                    ? "badge-warning"
                    : selectedOrder.status === "accepted"
                      ? "badge-info"
                      : selectedOrder.status === "onWay"
                        ? "badge-primary"
                        : selectedOrder.status === "complete"
                          ? "badge-success"
                          : "badge-ghost"
                }`}
              >

                {selectedOrder.status}

              </span>

            </div>


            {/* =================================================
                PRODUCTS
            ================================================= */}

            <div>

              <h3 className="font-bold text-lg mb-3">
                Products
              </h3>


              <div className="overflow-x-auto">

                <table className="table">

                  <thead>

                    <tr>

                      <th>
                        Product
                      </th>

                      <th>
                        Price
                      </th>

                      <th>
                        Quantity
                      </th>

                      <th>
                        Subtotal
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {selectedOrder.products?.map(
                      (product) => (

                        <tr
                          key={product.product_id}
                        >

                          <td>

                            <div className="flex items-center gap-3">

                              {product.product_images && (

                                <img
                                  src={
                                    product.product_images
                                  }
                                  alt={
                                    product.product_name
                                  }
                                  className="w-12 h-12 object-contain rounded"
                                />

                              )}

                              <span>
                                {product.product_name}
                              </span>

                            </div>

                          </td>


                          <td>

                            ৳{" "}

                            {Number(
                              product.product_price || 0
                            ).toLocaleString()}

                          </td>


                          <td>
                            {product.quantity}
                          </td>


                          <td>

                            ৳{" "}

                            {(
                              Number(
                                product.product_price || 0
                              ) *
                              Number(
                                product.quantity || 0
                              )
                            ).toLocaleString()}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>


            {/* =================================================
                TOTAL
            ================================================= */}

            <div className="flex justify-end mt-6">

              <div className="text-xl font-bold">

                Total: ৳{" "}

                {Number(
                  selectedOrder.total_price || 0
                ).toLocaleString()}

              </div>

            </div>


            {/* =================================================
                CLOSE
            ================================================= */}

            <div className="modal-action">

              <button
                onClick={closeDetails}
                className="btn"
              >
                Close
              </button>

            </div>

          </div>


          {/* =================================================
              MODAL BACKDROP
          ================================================= */}

          <div
            className="modal-backdrop"
            onClick={closeDetails}
          ></div>

        </div>

      )}

    </div>

  );

};

export default ManageUser;