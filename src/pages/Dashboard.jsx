import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiPackage, FiUsers, FiTrendingUp, FiDollarSign, FiBarChart3, FiShoppingBag } = FiIcons;

const Dashboard = () => {
  const { products, suppliers, calculatePricing } = useData();

  // Calculate statistics
  const totalProducts = products.length;
  const totalSuppliers = suppliers.length;
  const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  
  // Calculate most profitable products
  const profitableProducts = products
    .map(product => {
      const pricing = calculatePricing(product.cost, product.margin, 0);
      return {
        ...product,
        profit: pricing.profits.direct
      };
    })
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 5);

  // Calculate low stock products
  const lowStockProducts = products
    .filter(product => (product.stock || 0) <= 5)
    .sort((a, b) => (a.stock || 0) - (b.stock || 0));

  const stats = [
    {
      name: 'Total de Produtos',
      value: totalProducts,
      icon: FiPackage,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      name: 'Fornecedores',
      value: totalSuppliers,
      icon: FiUsers,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      name: 'Estoque Total',
      value: totalStock,
      icon: FiShoppingBag,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      name: 'Produtos em Baixa',
      value: lowStockProducts.length,
      icon: FiBarChart3,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral da sua loja de personalizados</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Profitable Products */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Produtos Mais Lucrativos</h2>
            <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-500" />
          </div>
          
          {profitableProducts.length > 0 ? (
            <div className="space-y-4">
              {profitableProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      R$ {product.profit.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">lucro/unidade</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Nenhum produto cadastrado ainda
            </p>
          )}
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Estoque Baixo</h2>
            <SafeIcon icon={FiBarChart3} className="w-5 h-5 text-red-500" />
          </div>
          
          {lowStockProducts.length > 0 ? (
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      {product.stock || 0} unidades
                    </p>
                    <p className="text-sm text-gray-500">restantes</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Todos os produtos com estoque adequado
            </p>
          )}
        </motion.div>
      </div>

      {/* Welcome Message */}
      {totalProducts === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white text-center"
        >
          <SafeIcon icon={FiDollarSign} className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Gestor Criativo!</h2>
          <p className="text-lg opacity-90 mb-4">
            Seu assistente inteligente para gerenciar sua loja de personalizados
          </p>
          <p className="opacity-80">
            Comece cadastrando seus produtos e fornecedores para ter uma visão completa do seu negócio
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;