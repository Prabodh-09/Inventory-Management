import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ContainerModal from './ContainerModal';
import ContainersTable from './ContainersTable';
import axios from 'axios';
import './ContainersPage.css';

export default function ContainersPage() {
  const [containers, setContainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);

  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    try {
      const res = await axios.get('/api/containers');
      setContainers(res.data);
    } catch (err) {
      console.error('Error fetching containers:', err);
    }
  };

  const handleAdd = () => {
    setSelectedContainer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (container) => {
    setSelectedContainer(container);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this container?')) {
      try {
        await axios.delete(`/api/containers/${id}`);
        fetchContainers();
      } catch (err) {
        console.error('Error deleting container:', err);
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedContainer) {
        await axios.put(`/api/containers/${selectedContainer._id}`, data);
      } else {
        await axios.post('/api/containers', data);
      }
      setIsModalOpen(false);
      fetchContainers();
    } catch (err) {
      console.error('Error saving container:', err);
    }
  };

  return (
    <div className="containers-page">
      <Sidebar />
      <div className="containers-content">
        <h1>Containers</h1>
        <button className="add-btn" onClick={handleAdd}>+ Add Container</button>

        <ContainersTable
          containers={containers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {isModalOpen && (
          <ContainerModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            initialData={selectedContainer}
          />
        )}
      </div>
    </div>
  );
}
