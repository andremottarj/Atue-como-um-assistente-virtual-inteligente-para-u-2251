import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiEdit, FiTrash2, FiPhone, FiMail, FiMapPin, FiShoppingBag, FiDollarSign, FiCalendar } = FiIcons;

const CustomerCard = ({ customer, onEdit, onViewOrders }) => {
  const { deleteCustomer } = useData();

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      deleteCustomer(customer.id);
    }
  };

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'frequente':
        return 'bg-blue-100 text-blue-800';
      case 'novo':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{customer.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCustomerTypeColor(customer.type)}`}>
              {customer.type}
            </span>
          </div>
          <p className="text-sm text-gray-500">Cliente desde {new Date(customer.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(customer)}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiEdit} className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        {customer.email && (
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
            <span>{customer.email}</span>
          </div>
        )}
        {customer.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
            <span>{customer.phone}</span>
          </div>
        )}
        {customer.address && (
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
            <span>{customer.address}</span>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <SafeIcon icon={FiShoppingBag} className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Pedidos</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {customer.totalOrders || 0}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Total Gasto</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            R$ {(customer.totalSpent || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Preferences */}
      {customer.preferences && customer.preferences.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preferências:</h4>
          <div className="flex flex-wrap gap-1">
            {customer.preferences.map((pref, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-600 rounded text-xs"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Last Order */}
      {customer.lastOrderDate && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
              <span>Último pedido:</span>
            </div>
            <span className="font-medium text-gray-900">
              {new Date(customer.lastOrderDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onViewOrders(customer)}
          className="w-full bg-primary-50 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-100 transition-colors font-medium text-sm"
        >
          Ver Histórico de Pedidos
        </button>
      </div>
    </motion.div>
  );
};

export default CustomerCard;