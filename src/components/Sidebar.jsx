import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiPackage, FiUsers, FiCalculator, FiSettings, FiX, FiMenu, FiUserCheck } = FiIcons;

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: FiHome },
    { name: 'Produtos', href: '/products', icon: FiPackage },
    { name: 'Fornecedores', href: '/suppliers', icon: FiUsers },
    { name: 'Clientes', href: '/customers', icon: FiUserCheck },
    { name: 'Simulador de Preços', href: '/pricing', icon: FiCalculator },
    { name: 'Configurações', href: '/settings', icon: FiSettings },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50 transition-colors"
        >
          <SafeIcon icon={sidebarOpen ? FiX : FiMenu} className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="lg:translate-x-0 lg:static lg:inset-0 fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-xl lg:shadow-none"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary-600">Gestor Criativo</h1>
            <p className="text-sm text-gray-500 mt-1">Gestão de Personalizados</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <SafeIcon icon={item.icon} className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2024 Gestor Criativo
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;