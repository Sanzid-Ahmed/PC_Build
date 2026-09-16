import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://pc-builder-api-eabc.onrender.com/api/products";

const CACHE_KEY = "thriftbuild_products_cache_v1";

// Cache remains fresh for 10 minutes
const CACHE_DURATION = 10 * 60 * 1000;

// ==========================================
// Read Products From Browser Cache
// ==========================================

const getCachedProducts = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);

    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached);

    if (
      !parsed ||
      !Array.isArray(parsed.products) ||
      !parsed.cachedAt
    ) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Failed to read product cache:", error);
    return null;
  }
};

// ==========================================
// Save Products To Browser Cache
// ==========================================

const saveProductsToCache = (products) => {
  try {
    const cacheData = {
      products,
      cachedAt: Date.now(),
    };

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify(cacheData)
    );
  } catch (error) {
    // If localStorage is full or unavailable,
    // the website will continue working normally.
    console.warn(
      "Could not save products to browser cache:",
      error
    );
  }
};

// ==========================================
// Fetch Products
// ==========================================

const useProducts = () => {
  // ------------------------------------------
  // Get cache immediately
  // ------------------------------------------

  const [products, setProducts] = useState(() => {
    const cached = getCachedProducts();

    return cached?.products || [];
  });

  // ------------------------------------------
  // Loading state
  // ------------------------------------------

  const [loading, setLoading] = useState(() => {
    const cached = getCachedProducts();

    return !cached?.products?.length;
  });

  // ------------------------------------------
  // Background refreshing state
  // ------------------------------------------

  const [refreshing, setRefreshing] = useState(false);

  // ------------------------------------------
  // Error state
  // ------------------------------------------

  const [error, setError] = useState("");

  // ==========================================
  // Fetch API
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      const cached = getCachedProducts();

      const hasCache =
        Array.isArray(cached?.products) &&
        cached.products.length > 0;

      const cacheAge = cached?.cachedAt
        ? Date.now() - cached.cachedAt
        : Infinity;

      // ----------------------------------------
      // Fresh cache
      // ----------------------------------------
      // If cache is less than 10 minutes old,
      // don't request the API again.
      // ----------------------------------------

      if (
        hasCache &&
        cacheAge < CACHE_DURATION
      ) {
        setLoading(false);
        return;
      }

      // ----------------------------------------
      // Stale cache
      // ----------------------------------------
      // Show old products immediately while
      // getting fresh products in background.
      // ----------------------------------------

      if (hasCache) {
        setLoading(false);
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        // ======================================
        // API Request
        // ======================================

        const response = await axios.get(API_URL, {
          timeout: 20000,
        });

        // ======================================
        // Your FastAPI response:
        //
        // {
        //   success: true,
        //   count: 1736,
        //   data: [...]
        // }
        // ======================================

        if (
          !response.data?.success ||
          !Array.isArray(response.data?.data)
        ) {
          throw new Error(
            "Invalid product data received from API"
          );
        }

        const freshProducts = response.data.data;

        if (cancelled) {
          return;
        }

        // ======================================
        // Update React state
        // ======================================

        setProducts(freshProducts);

        setError("");

        // ======================================
        // Save fresh data
        // ======================================

        saveProductsToCache(freshProducts);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to fetch products:",
          err
        );

        // --------------------------------------
        // If cache exists, keep using it.
        // Don't break the website just because
        // the API failed.
        // --------------------------------------

        if (hasCache) {
          console.warn(
            "API unavailable. Using cached products."
          );

          setError("");
        } else {
          setError(
            err.response?.data?.detail ||
              err.message ||
              "Failed to load products"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    fetchProducts();

    // ==========================================
    // Cleanup
    // ==========================================

    return () => {
      cancelled = true;
    };
  }, []);

  // ==========================================
  // Return
  // ==========================================

  return {
    products,
    loading,
    refreshing,
    error,
  };
};

export default useProducts;