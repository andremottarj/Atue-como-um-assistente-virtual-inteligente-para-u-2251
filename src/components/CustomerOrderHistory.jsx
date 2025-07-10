import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiX, FiCalendar, FiDollarSign, FiPackage, FiTrendingUp } = FiIcons;

const CustomerOrderHistory = ({ customer, onClose }) => {
  const { orders } = useData();

  // Filter orders for this customer
  const customerOrders = orders.filter(order => order.customerId === customer.id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'producao':
        return 'bg-blue-100 text-blue-800';
      case 'concluido':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'producao':
        return 'Em Produção';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Histórico de Pedidos - {customer.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {customerOrders.length} pedidos encontrados
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Customer Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <SafeIcon icon={FiPackage} className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{customer.totalOrders || 0}</p>
              <p className="text-sm text-gray-500">Total de Pedidos</p>
            </div>
            <div className="text-center">
              <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">R$ {(customer.totalSpent || 0).toFixed(2)}</p>
              <p className="text-sm text-gray-500">Total Gasto</p>
            </div>
            <div className="text-center">
              <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                R$ {customer.totalOrders > 0 ? ((customer.totalSpent || 0) / customer.totalOrders).toFixed(2) : '0.00'}
              </p>
              <p className="text-sm text-gray-500">Ticket Médio</p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {customerOrders.length > 0 ? (
          <div className="space-y-4">
            {customerOrders
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Pedido #{order.id.slice(-8)}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-lg font-bold text-gray-900">
                        R$ {order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium text-gray-900">{item.productName}</span>
                            <span className="text-gray-500 ml-2">x{item.quantity}</span>
                          </div>
                          <span className="text-gray-600">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Notes */}
                  {order.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Observações:</strong> {order.notes}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SafeIcon icon={FiPackage} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum pedido encontrado
            </h3>
            <p className="text-gray-500">
              Este cliente ainda não fez nenhum pedido
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CustomerOrderHistory;