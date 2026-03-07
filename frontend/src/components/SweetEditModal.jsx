import React, { useState, useEffect } from "react";
export const SweetEditModal = ({ sweet, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price,
    quantity: sweet.quantity,
    unit: sweet.unit || "piece",
    image_url: sweet.image_url || "",
  });
  useEffect(() => {
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      unit: sweet.unit || "piece",
      image_url: sweet.image_url || "",
    });
  }, [sweet]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(sweet.id, formData);
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className:
        "fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4",
      onClick: onClose,
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className:
          "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 max-h-screen overflow-y-auto",
        onClick: (e) => e.stopPropagation(),
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "flex justify-between items-center mb-6",
        },
        /*#__PURE__*/ React.createElement(
          "h2",
          {
            className: "text-2xl font-bold text-gray-800 dark:text-gray-100",
          },
          "Edit Sweet",
        ),
        /*#__PURE__*/ React.createElement(
          "button",
          {
            onClick: onClose,
            className:
              "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors",
          },
          /*#__PURE__*/ React.createElement(
            "svg",
            {
              className: "w-6 h-6",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
            },
            /*#__PURE__*/ React.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M6 18L18 6M6 6l12 12",
            }),
          ),
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-5",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "label",
            {
              className:
                "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            },
            "Name",
          ),
          /*#__PURE__*/ React.createElement("input", {
            type: "text",
            value: formData.name,
            onChange: (e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              }),
            required: true,
            className:
              "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors",
          }),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            "label",
            {
              className:
                "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
            },
            "Category",
          ),
          /*#__PURE__*/ React.createElement("input", {
            type: "text",
            value: formData.category,
            onChange: (e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              }),
            required: true,
            className:
              "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors",
          }),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "grid grid-cols-2 gap-4",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "label",
              {
                className:
                  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              },
              "Price (\u20B9)",
            ),
            /*#__PURE__*/ React.createElement("input", {
              type: "number",
              step: "0.01",
              min: "0",
              value: formData.price,
              onChange: (e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value),
                }),
              required: true,
              className:
                "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors",
            }),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "label",
              {
                className:
                  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              },
              "Quantity",
            ),
            /*#__PURE__*/ React.createElement("input", {
              type: "number",
              min: "0",
              value: formData.quantity,
              onChange: (e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value),
                }),
              required: true,
              className:
                "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors",
            }),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "grid grid-cols-2 gap-4",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "label",
              {
                className:
                  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              },
              "Unit (kg, piece, box)",
            ),
            /*#__PURE__*/ React.createElement("input", {
              type: "text",
              value: formData.unit,
              onChange: (e) =>
                setFormData({
                  ...formData,
                  unit: e.target.value,
                }),
              className:
                "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors",
              placeholder: "piece, kg, box",
            }),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "label",
              {
                className:
                  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              },
              "Image URL",
            ),
            /*#__PURE__*/ React.createElement("input", {
              type: "url",
              value: formData.image_url,
              onChange: (e) =>
                setFormData({
                  ...formData,
                  image_url: e.target.value,
                }),
              className:
                "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors",
              placeholder: "https://images.unsplash...",
            }),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "flex gap-3 pt-2",
          },
          /*#__PURE__*/ React.createElement(
            "button",
            {
              type: "submit",
              className:
                "flex-1 bg-primary-600 dark:bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-semibold shadow-md hover:shadow-lg",
            },
            "Update Sweet",
          ),
          /*#__PURE__*/ React.createElement(
            "button",
            {
              type: "button",
              onClick: onClose,
              className:
                "flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold",
            },
            "Cancel",
          ),
        ),
      ),
    ),
  );
};
