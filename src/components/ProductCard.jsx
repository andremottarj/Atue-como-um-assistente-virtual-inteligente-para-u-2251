import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiEdit, FiTrash2, FiDollarSign, FiPackage, FiUser, FiTrendingUp } = FiIcons;

const ProductCard = ({ product, onEdit }) => {
  const { deleteProduct, calculatePricing } = useData();
  
  const pricing = calculatePricing(product.cost, product.margin, 0);
  
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(product.id);
    }
  };

  const getStockColor = (stock) => {
    if (stock <= 5) return 'text-red-600 bg-red-50';
    if (stock <= 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{product.type}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
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
          <SafeIcon icon={FiUser} className="w-4 h-4 mr-2" />
          <span>{product.supplier}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiPackage} className="w-4 h-4 mr-2" />
            <span>Estoque:</span>
          </div>
          <span className={`text-sm font-medium px-2 py-1 rounded ${getStockColor(product.stock || 0)}`}>
            {product.stock || 0} un.
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-2" />
            <span>Custo:</span>
          </div>
          <span className="text-sm font-medium">R$ {product.cost.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-2" />
            <span>Margem:</span>
          </div>
          <span className="text-sm font-medium text-green-600">{product.margin}%</span>
        </div>
      </div>

      {/* Pricing */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Preço Venda Direta:</span>
          <span className="text-lg font-bold text-primary-600">
            R$ {pricing.directSalePrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">Lucro por unidade:</span>
          <span className="text-sm font-medium text-green-600">
            R$ {pricing.profits.direct.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;