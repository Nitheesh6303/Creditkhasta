// src/components/Customer/CustomerDetail.jsx
import { useState } from 'react';
import CustomerForm from '../Forms/CustomerForm';
import CreditForm from '../Forms/CreditForm';
import RepaymentForm from '../Forms/RepaymentForm';
import TransactionList from './TransactionList';

export default function CustomerDetail({ customer, transactions }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{customer.name}</h2>
        <button 
          onClick={() => setEditMode(!editMode)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {editMode ? (
        <CustomerForm customer={customer} onCancel={() => setEditMode(false)} />
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <p>Email: {customer.email || 'N/A'}</p>
          <p>Phone: {customer.phone || 'N/A'}</p>
          <p className="font-bold">
            Outstanding Balance: ₹{customer.balance.toFixed(2)}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <CreditForm customerId={customer.id} />
        <RepaymentForm customerId={customer.id} />
      </div>

      <TransactionList transactions={transactions} />
    </div>
  );
}