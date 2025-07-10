import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiEdit, FiTrash2, FiPhone, FiClock, FiDollarSign } = FiIcons;

const SupplierCard = ({ supplier, onEdit }) => {
  const { deleteSupplier } = useData();
  
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      deleteSupplier(supplier.id);
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
          <h3 className="font-semibold text-gray-900 text-lg mb-1">{supplier.name}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(supplier)}
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

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
          <span>{supplier.contact}</span>
        </div>

        {supplier.deliveryTime && (
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
            <span>{supplier.deliveryTime}</span>
          </div>
        )}

        {supplier.unitCost > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-2" />
              <span>Custo médio:</span>
            </div>
            <span className="text-sm font-medium text-primary-600">
              R$ {supplier.unitCost.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SupplierCard;