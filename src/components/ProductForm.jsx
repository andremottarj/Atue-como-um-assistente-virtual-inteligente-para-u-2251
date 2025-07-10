import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiX, FiSave, FiPackage } = FiIcons;

const ProductForm = ({ product, onClose }) => {
  const { addProduct, updateProduct, suppliers } = useData();
  const [formData, setFormData] = useState({
    name: '',
    type: 'caneca',
    supplier: '',
    cost: '',
    margin: '',
    stock: ''
  });

  const productTypes = [
    { value: 'caneca', label: 'Caneca' },
    { value: 'ecobag', label: 'Ecobag' },
    { value: 'toalhinha', label: 'Toalhinha' },
    { value: 'camisa', label: 'Camisa' },
    { value: 'azulejo', label: 'Azulejo' },
    { value: 'outro', label: 'Outro' }
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        type: product.type || 'caneca',
        supplier: product.supplier || '',
        cost: product.cost || '',
        margin: product.margin || '',
        stock: product.stock || ''
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.supplier || !formData.cost || !formData.margin) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const productData = {
      name: formData.name,
      type: formData.type,
      supplier: formData.supplier,
      cost: parseFloat(formData.cost),
      margin: parseFloat(formData.margin),
      stock: parseInt(formData.stock) || 0
    };

    if (product) {
      updateProduct(product.id, productData);
    } else {
      addProduct(productData);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <SafeIcon icon={FiPackage} className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? 'Editar Produto' : 'Novo Produto'}
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Produto *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: Caneca Personalizada"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo do Produto *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              {productTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fornecedor *
            </label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Nome do fornecedor"
              list="suppliers"
              required
            />
            <datalist id="suppliers">
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.name} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custo de Compra (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Margem de Lucro (%) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="margin"
              value={formData.margin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade em Estoque
            </label>
            <input
              type="number"
              min="0"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0"
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
              {product ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductForm;