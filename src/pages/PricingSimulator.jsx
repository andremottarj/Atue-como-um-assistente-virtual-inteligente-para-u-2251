import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../context/DataContext';

const { FiCalculator, FiDollarSign, FiTrendingUp, FiShoppingCart } = FiIcons;

const PricingSimulator = () => {
  const { marketplaceFees, calculatePricing } = useData();
  const [cost, setCost] = useState('');
  const [margin, setMargin] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const costNum = parseFloat(cost) || 0;
    const marginNum = parseFloat(margin) || 0;
    const shippingNum = parseFloat(shippingCost) || 0;

    if (costNum <= 0 || marginNum <= 0) {
      alert('Por favor, insira valores válidos para custo e margem');
      return;
    }

    const pricing = calculatePricing(costNum, marginNum, shippingNum);
    setResults(pricing);
  };

  const handleReset = () => {
    setCost('');
    setMargin('');
    setShippingCost('');
    setResults(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Simulador de Preços</h1>
        <p className="text-gray-600 mt-2">
          Calcule o preço ideal para seus produtos em diferentes canais de venda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <SafeIcon icon={FiCalculator} className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Dados do Produto</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custo de Compra (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0,00"
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
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0,00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custo de Frete (R$) - Opcional
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0,00"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Calcular Preços
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>

          {/* Current Fees Display */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Taxas dos Marketplaces</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Shopee:</span>
                <span className="font-medium">{marketplaceFees.shopee}%</span>
              </div>
              <div className="flex justify-between">
                <span>Mercado Livre:</span>
                <span className="font-medium">{marketplaceFees.mercadolivre}%</span>
              </div>
              <div className="flex justify-between">
                <span>Amazon:</span>
                <span className="font-medium">{marketplaceFees.amazon}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Resultados</h2>
          </div>

          {results ? (
            <div className="space-y-6">
              {/* Direct Sale */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <SafeIcon icon={FiShoppingCart} className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-800">Venda Direta</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-600">
                    R$ {results.directSalePrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-700">
                    Lucro: R$ {results.profits.direct.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Marketplace Prices */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <SafeIcon icon={FiTrendingUp} className="w-5 h-5 mr-2" />
                  Preços para Marketplaces
                </h3>

                {/* Shopee */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-orange-800">Shopee</span>
                    <span className="text-sm text-orange-600">Taxa: {marketplaceFees.shopee}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-orange-600">
                      R$ {results.marketplacePrices.shopee.toFixed(2)}
                    </p>
                    <p className="text-sm text-orange-700">
                      Lucro: R$ {results.profits.shopee.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Mercado Livre */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-yellow-800">Mercado Livre</span>
                    <span className="text-sm text-yellow-600">Taxa: {marketplaceFees.mercadolivre}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-yellow-600">
                      R$ {results.marketplacePrices.mercadolivre.toFixed(2)}
                    </p>
                    <p className="text-sm text-yellow-700">
                      Lucro: R$ {results.profits.mercadolivre.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Amazon */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Amazon</span>
                    <span className="text-sm text-blue-600">Taxa: {marketplaceFees.amazon}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-blue-600">
                      R$ {results.marketplacePrices.amazon.toFixed(2)}
                    </p>
                    <p className="text-sm text-blue-700">
                      Lucro: R$ {results.profits.amazon.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <SafeIcon icon={FiCalculator} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Preencha os dados do produto
              </h3>
              <p className="text-gray-500">
                Insira o custo e margem desejada para calcular os preços
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PricingSimulator;