import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [marketplaceFees, setMarketplaceFees] = useState({
    shopee: 12,
    mercadolivre: 16,
    amazon: 15
  });
  const [defaultShippingCost, setDefaultShippingCost] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('gestorCriativo_products');
    const savedSuppliers = localStorage.getItem('gestorCriativo_suppliers');
    const savedCustomers = localStorage.getItem('gestorCriativo_customers');
    const savedOrders = localStorage.getItem('gestorCriativo_orders');
    const savedFees = localStorage.getItem('gestorCriativo_fees');
    const savedShipping = localStorage.getItem('gestorCriativo_shipping');

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    if (savedSuppliers) {
      setSuppliers(JSON.parse(savedSuppliers));
    }
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    if (savedFees) {
      setMarketplaceFees(JSON.parse(savedFees));
    }
    if (savedShipping) {
      setDefaultShippingCost(JSON.parse(savedShipping));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gestorCriativo_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gestorCriativo_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('gestorCriativo_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('gestorCriativo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gestorCriativo_fees', JSON.stringify(marketplaceFees));
  }, [marketplaceFees]);

  useEffect(() => {
    localStorage.setItem('gestorCriativo_shipping', JSON.stringify(defaultShippingCost));
  }, [defaultShippingCost]);

  // Product functions
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Supplier functions
  const addSupplier = (supplier) => {
    const newSupplier = {
      ...supplier,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const updateSupplier = (id, updatedSupplier) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updatedSupplier } : s));
  };

  const deleteSupplier = (id) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  // Customer functions
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: null
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updatedCustomer } : c));
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  // Order functions
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pendente'
    };
    setOrders(prev => [...prev, newOrder]);

    // Update customer statistics
    if (order.customerId) {
      updateCustomerStats(order.customerId, order.total);
    }
  };

  const updateOrder = (id, updatedOrder) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updatedOrder } : o));
  };

  const deleteOrder = (id) => {
    const order = orders.find(o => o.id === id);
    setOrders(prev => prev.filter(o => o.id !== id));

    // Update customer statistics
    if (order && order.customerId) {
      updateCustomerStats(order.customerId, -order.total);
    }
  };

  // Update customer statistics
  const updateCustomerStats = (customerId, orderValue) => {
    setCustomers(prev => prev.map(customer => {
      if (customer.id === customerId) {
        const customerOrders = orders.filter(o => o.customerId === customerId);
        const totalOrders = customerOrders.length + (orderValue > 0 ? 1 : -1);
        const totalSpent = (customer.totalSpent || 0) + orderValue;
        
        return {
          ...customer,
          totalOrders,
          totalSpent,
          lastOrderDate: orderValue > 0 ? new Date().toISOString() : customer.lastOrderDate
        };
      }
      return customer;
    }));
  };

  // Pricing calculation
  const calculatePricing = (cost, margin, shippingCost = 0) => {
    const costWithShipping = cost + shippingCost;
    const directSalePrice = costWithShipping * (1 + margin / 100);

    const marketplacePrices = {
      shopee: directSalePrice / (1 - marketplaceFees.shopee / 100),
      mercadolivre: directSalePrice / (1 - marketplaceFees.mercadolivre / 100),
      amazon: directSalePrice / (1 - marketplaceFees.amazon / 100)
    };

    const profits = {
      direct: directSalePrice - costWithShipping,
      shopee: marketplacePrices.shopee - (marketplacePrices.shopee * marketplaceFees.shopee / 100) - costWithShipping,
      mercadolivre: marketplacePrices.mercadolivre - (marketplacePrices.mercadolivre * marketplaceFees.mercadolivre / 100) - costWithShipping,
      amazon: marketplacePrices.amazon - (marketplacePrices.amazon * marketplaceFees.amazon / 100) - costWithShipping
    };

    return {
      directSalePrice,
      marketplacePrices,
      profits
    };
  };

  const value = {
    products,
    suppliers,
    customers,
    orders,
    marketplaceFees,
    defaultShippingCost,
    addProduct,
    updateProduct,
    deleteProduct,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addOrder,
    updateOrder,
    deleteOrder,
    setMarketplaceFees,
    setDefaultShippingCost,
    calculatePricing
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};