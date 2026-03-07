import React, { useEffect, useState } from "react";
import { purchaseService } from "../services/api";
export const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    loadPurchaseHistory();
  }, []);
  const loadPurchaseHistory = async () => {
    try {
      setLoading(true);
      const data = await purchaseService.getHistory();
      setPurchases(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load purchase history");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const totalSpent = purchases.reduce(
    (sum, purchase) => sum + Number(purchase.total_price),
    0,
  );
  if (loading) {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "container mx-auto px-4 py-8",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "flex items-center justify-center min-h-[60vh]",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "text-center",
          },
          /*#__PURE__*/ React.createElement(
            "svg",
            {
              className:
                "animate-spin h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4",
              viewBox: "0 0 24 24",
            },
            /*#__PURE__*/ React.createElement("circle", {
              className: "opacity-25",
              cx: "12",
              cy: "12",
              r: "10",
              stroke: "currentColor",
              strokeWidth: "4",
              fill: "none",
            }),
            /*#__PURE__*/ React.createElement("path", {
              className: "opacity-75",
              fill: "currentColor",
              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
            }),
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "text-gray-600 dark:text-gray-400 text-lg",
            },
            "Loading purchase history...",
          ),
        ),
      ),
    );
  }
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "container mx-auto px-4 py-8",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "text-center mb-10",
      },
      /*#__PURE__*/ React.createElement(
        "h1",
        {
          className:
            "text-4xl font-bold mb-2 text-primary-600 dark:text-primary-400",
        },
        "\uD83D\uDCE6 My Purchases",
      ),
      /*#__PURE__*/ React.createElement(
        "p",
        {
          className: "text-gray-600 dark:text-gray-400",
        },
        "View your purchase history",
      ),
    ),
    error &&
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className:
            "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2",
        },
        /*#__PURE__*/ React.createElement(
          "svg",
          {
            className: "w-5 h-5",
            fill: "currentColor",
            viewBox: "0 0 20 20",
          },
          /*#__PURE__*/ React.createElement("path", {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
            clipRule: "evenodd",
          }),
        ),
        error,
      ),
    purchases.length === 0
      ? /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "text-center py-16",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "text-6xl mb-4",
            },
            "\uD83D\uDED2",
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className:
                "text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2",
            },
            "No purchases yet",
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "text-gray-500 dark:text-gray-400",
            },
            "Start shopping to see your purchase history here!",
          ),
        )
      : /*#__PURE__*/ React.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className:
                "bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6 mb-6 shadow-lg",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className:
                  "flex flex-col sm:flex-row justify-between items-center gap-4",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "text-center sm:text-left",
                },
                /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  },
                  "Total Purchases",
                ),
                /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    className:
                      "text-3xl font-bold text-primary-600 dark:text-primary-400",
                  },
                  purchases.length,
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "text-center sm:text-right",
                },
                /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  },
                  "Total Spent",
                ),
                /*#__PURE__*/ React.createElement(
                  "p",
                  {
                    className:
                      "text-3xl font-bold text-primary-600 dark:text-primary-400",
                  },
                  "\u20B9",
                  totalSpent.toFixed(2),
                ),
              ),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className:
                "bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden border border-gray-200 dark:border-gray-700",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "overflow-x-auto",
              },
              /*#__PURE__*/ React.createElement(
                "table",
                {
                  className:
                    "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
                },
                /*#__PURE__*/ React.createElement(
                  "thead",
                  {
                    className: "bg-gray-50 dark:bg-gray-700",
                  },
                  /*#__PURE__*/ React.createElement(
                    "tr",
                    null,
                    /*#__PURE__*/ React.createElement(
                      "th",
                      {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",
                      },
                      "Date",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "th",
                      {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",
                      },
                      "Item",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "th",
                      {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",
                      },
                      "Category",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "th",
                      {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",
                      },
                      "Quantity",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "th",
                      {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",
                      },
                      "Unit Price",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "th",
                      {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",
                      },
                      "Total",
                    ),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  "tbody",
                  {
                    className:
                      "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700",
                  },
                  purchases.map((purchase) =>
                    /*#__PURE__*/ React.createElement(
                      "tr",
                      {
                        key: purchase.id,
                        className:
                          "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                      },
                      /*#__PURE__*/ React.createElement(
                        "td",
                        {
                          className:
                            "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
                        },
                        formatDate(purchase.created_at),
                      ),
                      /*#__PURE__*/ React.createElement(
                        "td",
                        {
                          className:
                            "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100",
                        },
                        purchase.sweet_name,
                      ),
                      /*#__PURE__*/ React.createElement(
                        "td",
                        {
                          className:
                            "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
                        },
                        /*#__PURE__*/ React.createElement(
                          "span",
                          {
                            className:
                              "bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs font-semibold px-2 py-1 rounded-full",
                          },
                          purchase.sweet_category,
                        ),
                      ),
                      /*#__PURE__*/ React.createElement(
                        "td",
                        {
                          className:
                            "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
                        },
                        purchase.quantity,
                      ),
                      /*#__PURE__*/ React.createElement(
                        "td",
                        {
                          className:
                            "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100",
                        },
                        "\u20B9",
                        Number(purchase.price_per_unit).toFixed(2),
                      ),
                      /*#__PURE__*/ React.createElement(
                        "td",
                        {
                          className:
                            "px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600 dark:text-primary-400",
                        },
                        "\u20B9",
                        Number(purchase.total_price).toFixed(2),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
  );
};
