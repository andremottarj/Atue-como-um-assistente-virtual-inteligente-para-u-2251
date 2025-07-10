import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiX, FiSave, FiUsers, FiPlus, FiMinus } = FiIcons;

const CustomerForm = ({ customer, onClose }) => {
  const { addCustomer, updateCustomer } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'novo',
    preferences: [],
    notes: ''
  });

  const [newPreference, setNewPreference] = useState('');

  const customerTypes = [
    { value: 'novo', label: 'Novo Cliente' },
    { value: 'frequente', label: 'Cliente Frequente' },
    { value: 'premium', label: 'Cliente Premium' },
    { value: 'inativo', label: 'Cliente Inativo' }
  ];

  const commonPreferences = [
    'Canecas', 'Ecobags', 'Camisetas', 'Azulejos', 'Toalhinhas',
    'Cores vibrantes', 'Estilo minimalista', 'Temas infantis',
    'Temas corporativos', 'Personalizações com foto'
  ];

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        type: customer.type || 'novo',
        preferences: customer.preferences || [],
        notes: customer.notes || ''
      });
    }
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Por favor, preencha o nome do cliente');
      return;
    }

    const customerData = {
      ...formData,
      preferences: formData.preferences.filter(pref => pref.trim() !== '')
    };

    if (customer) {
      updateCustomer(customer.id, customerData);
    } else {
      addCustomer(customerData);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addPreference = (preference) => {
    if (preference && !formData.preferences.includes(preference)) {
      setFormData(prev => ({
        ...prev,
        preferences: [...prev.preferences, preference]
      }));
    }
    setNewPreference('');
  };

  const removePreference = (index) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              {customer ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: João Silva"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Cliente
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {customerTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="joao@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Rua, número, bairro, cidade - CEP"
            />
          </div>

          {/* Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferências do Cliente
            </label>
            
            {/* Common Preferences */}
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-2">Preferências comuns:</p>
              <div className="flex flex-wrap gap-2">
                {commonPreferences.map(pref => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => addPreference(pref)}
                    disabled={formData.preferences.includes(pref)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      formData.preferences.includes(pref)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Preference */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newPreference}
                onChange={(e) => setNewPreference(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Adicionar preferência personalizada"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPreference(newPreference))}
              />
              <button
                type="button"
                onClick={() => addPreference(newPreference)}
                className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Preferences */}
            {formData.preferences.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Preferências selecionadas:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.preferences.map((pref, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                    >
                      {pref}
                      <button
                        type="button"
                        onClick={() => removePreference(index)}
                        className="ml-2 hover:text-red-600 transition-colors"
                      >
                        <SafeIcon icon={FiMinus} className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Observações sobre o cliente, histórico, etc."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium inline-flex items-center justify-center"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
              {customer ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CustomerForm;