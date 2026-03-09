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
      toast.success(`Successfully added ${input.name} to our royal catalog.`);
      await loadSweets();
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "We couldn't create the delicacy at this time.",
      );
    }
  };

  const handleUpdate = async (id, input) => {
    try {
      await sweetService.update(id, input);
      setEditingSweet(null);
      toast.success(`Details for ${input.name} have been updated.`);
      await loadSweets();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "We couldn't update the delicacy details.",
      );
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this sweet?")) {
      return;
    }
    try {
      await sweetService.delete(id);
      toast.success("The delicacy has been removed from the catalog.");
      await loadSweets();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "We couldn't remove the delicacy.",
      );
    }
  };

  const handleRestock = async (id, quantity) => {
    try {
      await sweetService.restock(id, quantity);
      toast.success("Inventory has been successfully updated.");
      await loadSweets();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "We couldn't update the inventory levels.",
      );
    }
  };

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 animate-fadeIn">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary-600 rounded-2xl shadow-premium">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L4 5v14l8 3 8-3V5l-8-3zm0 2.18L18.15 6.5 12 8.82 5.85 6.5 12 4.18zM6 8.58l5 1.88v9.36l-5-1.88V8.58zm7 11.24V10.46l5-1.88v9.36l-5 1.88z" />
                </svg>
              </div>
              <h1 className="text-5xl font-serif font-bold text-gray-900 ">
                Royal <span className="text-primary-600">Inventory</span>
              </h1>
            </div>
            <p className="text-gray-500  text-lg font-medium ml-1">
              Curate and manage your collection of exquisite Indian delicacies.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="group bg-primary-600 text-white px-8 py-4 rounded-2xl hover:bg-primary-700 transition-all font-bold shadow-premium hover:shadow-premium-hover flex items-center gap-3 transform hover:-translate-y-1"
          >
            <div className="p-1 bg-white/20 rounded-lg group-hover:rotate-90 transition-transform">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            Add New Delicacy
          </button>
        </div>

        {/* Analytics Dashboard */}
        <div className="mb-20">
          <AnalyticsDashboard />
        </div>

        {/* Modals */}
        {showForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-2xl bg-white  rounded-[2.5rem] shadow-premium p-1 border border-gray-100 ">
              <div className="p-8">
                <SweetForm
                  onSubmit={handleCreate}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        {editingSweet && (
          <SweetEditModal
            sweet={editingSweet}
            onUpdate={handleUpdate}
            onClose={() => setEditingSweet(null)}
          />
        )}

        {/* Main Content (Table) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-pulse">
            <div className="w-20 h-20 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-8"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              Syncing Inventory...
            </p>
          </div>
        ) : (
          <div className="bg-white  rounded-[2.5rem] shadow-premium overflow-hidden border border-gray-100  transition-all duration-500">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 ">
                <thead className="bg-gray-50/50 ">
                  <tr>
                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400  uppercase tracking-[0.2em]">
                      Delicacy
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400  uppercase tracking-[0.2em]">
                      Category
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400  uppercase tracking-[0.2em]">
                      Price (₹)
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400  uppercase tracking-[0.2em]">
                      Availability
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400  uppercase tracking-[0.2em]">
                      Management
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 ">
                  {sweets.map((sweet) => (
                    <tr
                      key={sweet.id}
                      className="hover:bg-primary-50/30  transition-colors group"
                    >
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gray-100  overflow-hidden shadow-inner">
                            {sweet.image_url ? (
                              <img
                                src={sweet.image_url}
                                alt={sweet.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center opacity-20">
                                <svg
                                  className="w-6 h-6"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 2L4 5v14l8 3 8-3V5l-8-3zm0 2.18L18.15 6.5 12 8.82 5.85 6.5 12 4.18z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="text-base font-bold text-gray-700  group-hover:text-primary-600 transition-colors">
                            {sweet.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="bg-gray-100  text-gray-500  text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider">
                          {sweet.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-lg font-serif font-black text-gray-900 ">
                          {Number(sweet.price).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${sweet.quantity > 10 ? "bg-green-500" : sweet.quantity > 0 ? "bg-amber-500" : "bg-red-500"}`}
                          ></span>
                          <span className="text-sm font-bold text-gray-600 ">
                            {sweet.quantity} {sweet.unit || "pcs"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setEditingSweet(sweet)}
                            className="p-2.5 bg-gray-100  text-gray-600  rounded-xl hover:bg-primary-50 hover:text-primary-600  transition-all active:scale-95"
                            title="Edit"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              const qty = prompt("Enter restock quantity:");
                              if (qty) handleRestock(sweet.id, parseInt(qty));
                            }}
                            className="p-2.5 bg-gray-100  text-gray-600  rounded-xl hover:bg-green-50 hover:text-green-600  transition-all active:scale-95"
                            title="Restock"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(sweet.id)}
                            className="p-2.5 bg-gray-100  text-gray-600  rounded-xl hover:bg-red-50 hover:text-red-600  transition-all active:scale-95"
                            title="Delete"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
