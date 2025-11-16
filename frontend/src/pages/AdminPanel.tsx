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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary-600">Admin Panel</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition"
        >
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
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sweets.map((sweet) => (
                <tr key={sweet.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sweet.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sweet.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{sweet.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sweet.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setEditingSweet(sweet)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const qty = prompt('Enter restock quantity:');
                        if (qty) handleRestock(sweet.id, parseInt(qty));
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      Restock
                    </button>
                    <button
                      onClick={() => handleDelete(sweet.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

