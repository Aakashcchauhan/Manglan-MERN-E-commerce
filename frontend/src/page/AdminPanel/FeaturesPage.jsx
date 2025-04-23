import React, { useState } from 'react';
import { Plus, Edit, Trash, Star } from 'lucide-react';

const FeaturesPage = () => {
  const [features, setFeatures] = useState([
    { 
      id: 1, 
      title: 'Free Shipping', 
      description: 'Free shipping on all orders over $50', 
      active: true 
    },
    { 
      id: 2, 
      title: 'Summer Sale', 
      description: '20% off on all summer products', 
      active: true 
    },
    { 
      id: 3, 
      title: 'Loyalty Program', 
      description: 'Earn points with every purchase', 
      active: true 
    },
    { 
      id: 4, 
      title: 'Back to School', 
      description: 'Special discounts for students', 
      active: false 
    },
    { 
      id: 5, 
      title: 'Holiday Bundles', 
      description: 'Special product bundles for the holidays', 
      active: false 
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [newFeature, setNewFeature] = useState({
    title: '',
    description: '',
    active: true
  });

  const handleToggleActive = (id) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, active: !feature.active } : feature
    ));
  };

  const handleEditFeature = (feature) => {
    setEditingFeature(feature);
    setNewFeature(feature);
    setShowForm(true);
  };

  const handleDeleteFeature = (id) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewFeature({
      ...newFeature,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingFeature) {
      // Update existing feature
      setFeatures(features.map(feature => 
        feature.id === editingFeature.id ? { ...newFeature, id: feature.id } : feature
      ));
    } else {
      // Add new feature
      const feature = {
        ...newFeature,
        id: Math.max(0, ...features.map(f => f.id)) + 1
      };
      setFeatures([...features, feature]);
    }
    
    // Reset form
    setShowForm(false);
    setEditingFeature(null);
    setNewFeature({
      title: '',
      description: '',
      active: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Features & Promotions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          Add New Feature
        </button>
      </div>
      
      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">
            {editingFeature ? 'Edit Feature' : 'Add New Feature'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Feature Title</label>
              <input
                type="text"
                name="title"
                value={newFeature.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={newFeature.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={newFeature.active}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingFeature(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {editingFeature ? 'Update Feature' : 'Add Feature'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`bg-white p-6 rounded-lg shadow border-l-4 ${
                feature.active ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  {feature.active && <Star size={18} className="text-yellow-500 fill-yellow-500" />}
                  {feature.title}
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditFeature(feature)}
                    className="p-1 text-blue-500 hover:text-blue-700"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteFeature(feature.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="flex justify-between items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  feature.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {feature.active ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => handleToggleActive(feature.id)}
                  className={`text-sm font-medium ${
                    feature.active ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  {feature.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturesPage;