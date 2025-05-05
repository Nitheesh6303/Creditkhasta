// src/pages/DashboardPage.jsx
import { useEffect } from 'react';
import { useCredit } from '../context/CreditContext';
import CustomerList from '../components/Customer/CustomerList';
import { generateCustomerStatement } from '../utils/pdfGenerator';

export default function DashboardPage() {
  const { customers, loading } = useCredit();

  const handleExport = (customerId) => {
    const { customer, transactions } = getCustomer(customerId);
    generateCustomerStatement(customer, transactions);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customer Credits</h1>
      <CustomerList customers={customers} onExport={handleExport} />
    </div>
  );
}