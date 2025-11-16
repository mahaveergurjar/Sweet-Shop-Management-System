import { useEffect, useState } from 'react';
import { sweetService } from '../services/api';
import { Sweet, CreateSweetInput, UpdateSweetInput } from '../types';
import { SweetForm } from '../components/SweetForm';
import { SweetEditModal } from '../components/SweetEditModal';

export const AdminPanel = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAll();
      setSweets(data);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (input: CreateSweetInput) => {
    try {
      await sweetService.create(input);
      setShowForm(false);
      await loadSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create sweet');
    }
  };

  const handleUpdate = async (id: number, input: UpdateSweetInput) => {
    try {
      await sweetService.update(id, input);
      setEditingSweet(null);
      await loadSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update sweet');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sweet?')) {
      return;
    }
    try {
      await sweetService.delete(id);
      await loadSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete sweet');
    }
  };

  const handleRestock = async (id: number, quantity: number) => {
    try {
      await sweetService.restock(id, quantity);
      await loadSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to restock sweet');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your sweet inventory</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 dark:bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Sweet
        </button>
      </div>

      {showForm && (
        <SweetForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingSweet && (
        <SweetEditModal
          sweet={editingSweet}
          onUpdate={handleUpdate}
          onClose={() => setEditingSweet(null)}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sweets.map((sweet) => (
                  <tr key={sweet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {sweet.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs font-semibold px-2 py-1 rounded-full">
                        {sweet.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ₹{sweet.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {sweet.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setEditingSweet(sweet)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          const qty = prompt('Enter restock quantity:');
                          if (qty) handleRestock(sweet.id, parseInt(qty));
                        }}
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                      >
                        Restock
                      </button>
                      <button
                        onClick={() => handleDelete(sweet.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

