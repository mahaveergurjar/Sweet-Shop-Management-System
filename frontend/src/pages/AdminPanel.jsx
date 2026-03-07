import React, { useEffect, useState } from "react";
import { sweetService } from "../services/api";
import { SweetForm } from "../components/SweetForm";
import { SweetEditModal } from "../components/SweetEditModal";
import { AnalyticsDashboard } from "../components/AnalyticsDashboard";
import toast from "react-hot-toast";

export const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSweet, setEditingSweet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    loadSweets();
  }, []);
  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAll();
      setSweets(data);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = async (input) => {
    try {
      await sweetService.create(input);
      setShowForm(false);
      toast.success("Sweet created successfully");
      await loadSweets();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create sweet");
    }
  };
  const handleUpdate = async (id, input) => {
    try {
      await sweetService.update(id, input);
      setEditingSweet(null);
      toast.success("Sweet updated successfully");
      await loadSweets();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update sweet");
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this sweet?")) {
      return;
    }
    try {
      await sweetService.delete(id);
      toast.success("Sweet deleted successfully");
      await loadSweets();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete sweet");
    }
  };
  const handleRestock = async (id, quantity) => {
    try {
      await sweetService.restock(id, quantity);
      toast.success("Inventory restocked");
      await loadSweets();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to restock sweet");
    }
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "container mx-auto px-4 py-8",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        null,
        /*#__PURE__*/ React.createElement(
          "h1",
          {
            className:
              "text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2",
          },
          "Admin Panel",
        ),
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "text-gray-600 dark:text-gray-400",
          },
          "Manage your sweet inventory",
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "button",
        {
          onClick: () => setShowForm(true),
          className:
            "bg-primary-600 dark:bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-semibold shadow-lg hover:shadow-xl flex items-center gap-2",
        },
        /*#__PURE__*/ React.createElement(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
          },
          /*#__PURE__*/ React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M12 4v16m8-8H4",
          }),
        ),
        "Add New Sweet",
      ),
    ),
    /*#__PURE__*/ React.createElement(AnalyticsDashboard, null),
    showForm &&
      /*#__PURE__*/ React.createElement(SweetForm, {
        onSubmit: handleCreate,
        onCancel: () => setShowForm(false),
      }),
    editingSweet &&
      /*#__PURE__*/ React.createElement(SweetEditModal, {
        sweet: editingSweet,
        onUpdate: handleUpdate,
        onClose: () => setEditingSweet(null),
      }),
    loading
      ? /*#__PURE__*/ React.createElement(
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
              "Loading...",
            ),
          ),
        )
      : /*#__PURE__*/ React.createElement(
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
                    "Name",
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
                    "Price",
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
                    "Actions",
                  ),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "tbody",
                {
                  className:
                    "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700",
                },
                sweets.map((sweet) =>
                  /*#__PURE__*/ React.createElement(
                    "tr",
                    {
                      key: sweet.id,
                      className:
                        "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                    },
                    /*#__PURE__*/ React.createElement(
                      "td",
                      {
                        className:
                          "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100",
                      },
                      sweet.name,
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
                        sweet.category,
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      "td",
                      {
                        className:
                          "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
                      },
                      "\u20B9",
                      Number(sweet.price).toFixed(2),
                    ),
                    /*#__PURE__*/ React.createElement(
                      "td",
                      {
                        className:
                          "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
                      },
                      `${sweet.quantity} ${sweet.unit || "piece"}`,
                    ),
                    /*#__PURE__*/ React.createElement(
                      "td",
                      {
                        className:
                          "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2",
                      },
                      /*#__PURE__*/ React.createElement(
                        "button",
                        {
                          onClick: () => setEditingSweet(sweet),
                          className:
                            "text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors",
                        },
                        "Edit",
                      ),
                      /*#__PURE__*/ React.createElement(
                        "button",
                        {
                          onClick: () => {
                            const qty = prompt("Enter restock quantity:");
                            if (qty) handleRestock(sweet.id, parseInt(qty));
                          },
                          className:
                            "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors",
                        },
                        "Restock",
                      ),
                      /*#__PURE__*/ React.createElement(
                        "button",
                        {
                          onClick: () => handleDelete(sweet.id),
                          className:
                            "text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors",
                        },
                        "Delete",
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
