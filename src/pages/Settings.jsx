import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiSettings, FiPercent, FiTruck, FiSave } = FiIcons;

const Settings = () => {
  const { marketplaceFees, setMarketplaceFees, defaultShippingCost, setDefaultShippingCost } = useData();
  const [fees, setFees] = useState(marketplaceFees);
  const [shipping, setShipping] = useState(defaultShippingCost);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setMarketplaceFees(fees);
    setDefaultShippingCost(shipping);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">
          Configure as taxas dos marketplaces e custos padrão
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Marketplace Fees */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <SafeIcon icon={FiPercent} className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Taxas dos Marketplaces</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shopee (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={fees.shopee}
                onChange={(e) => setFees({...fees, shopee: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mercado Livre (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={fees.mercadolivre}
                onChange={(e) => setFees({...fees, mercadolivre: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amazon (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={fees.amazon}
                onChange={(e) => setFees({...fees, amazon: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Default Shipping */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <SafeIcon icon={FiTruck} className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Custo de Frete Padrão</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor Padrão (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={shipping}
                onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0,00"
              />
              <p className="text-sm text-gray-500 mt-2">
                Este valor será usado como padrão no simulador de preços
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          <SafeIcon icon={FiSave} className="w-5 h-5 mr-2" />
          {saved ? 'Salvo!' : 'Salvar Configurações'}
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-blue-50 rounded-xl p-6 border border-blue-200"
        >
          <h3 className="font-semibold text-blue-900 mb-2">Sobre as Taxas</h3>
          <p className="text-blue-700 text-sm">
            As taxas dos marketplaces são valores médios de mercado. Verifique sempre as taxas atuais 
            de cada plataforma, pois podem variar conforme categoria do produto e tipo de conta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-green-50 rounded-xl p-6 border border-green-200"
        >
          <h3 className="font-semibold text-green-900 mb-2">Dica de Precificação</h3>
          <p className="text-green-700 text-sm">
            Considere sempre os custos de embalagem, tempo de produção e outros custos operacionais 
            ao definir sua margem de lucro desejada.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;