import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { categoryMap } from "./buildData/buildData";

const API_URL =
  "https://pc-builder-api-eabc.onrender.com/api/products";

const useBuildProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL, {
          timeout: 30000,
        });

        if (!response.data?.success) {
          throw new Error("Invalid API response");
        }

        const data = response.data.data;

        if (!Array.isArray(data)) {
          throw new Error(
            "Product data is not an array"
          );
        }

        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        console.error(
          "Build PC product error:",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.detail ||
              err.message ||
              "Failed to load products"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const productsByCategory = useMemo(() => {
    const result = {};

    Object.keys(categoryMap).forEach(
      (builderCategory) => {
        const apiCategories =
          categoryMap[builderCategory];

        result[builderCategory] =
          products.filter((product) =>
            apiCategories.includes(
              product.category
            )
          );
      }
    );

    return result;
  }, [products]);

  return {
    products,
    productsByCategory,
    loading,
    error,
  };
};

export default useBuildProducts;