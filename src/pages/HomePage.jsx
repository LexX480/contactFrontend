// pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Save, X, Loader2, Home } from 'lucide-react';

const HomePage = () => {
  const { contacts, setContacts } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        alert('Failed to load contacts');
      }
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingContact(null);
    setForm({ name: '', email: '', phone: '' });
    setShowModal(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingContact) {
        await api.put(`/contacts/${editingContact._id}`, form);
      } else {
        await api.post('/contacts', form);
      }
      close();
      fetchContacts();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Home size={28} />
          My Contacts
        </h1>
        <button
          onClick={openAddModal}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Contact
        </button>
      </div>

      {/* Contact List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : contacts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No contacts yet. Add one!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact._id} className="card bg-base-100 shadow-md hover:shadow-lg transition duration-200">
              <div className="card-body">
                <h2 className="card-title">{contact.name}</h2>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <div className="card-actions justify-end mt-4 gap-2">
                  <button
                    onClick={() => openEditModal(contact)}
                    className="btn btn-sm btn-outline flex items-center gap-1"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={close} // Close on backdrop click
        >
          <div
            className="bg-base-100 rounded-lg shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              <button
                onClick={close}
                className="btn btn-sm btn-circle btn-ghost hover:bg-gray-200"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={close}
                className="btn btn-ghost flex items-center gap-1 px-4 py-2"
              >
                <X size={16} />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="btn btn-primary flex items-center gap-1 px-4 py-2"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;