// src/pages/CustomerPage.jsx
import { useParams } from 'react-router-dom';
import { useCredit } from '../context/CreditContext';
import CustomerDetail from '../components/Customer/CustomerDetail';

export default function CustomerPage() {
  const { id } = useParams();
  const { getCustomer } = useCredit();
  const { customer, transactions } = getCustomer(id);

  if (!customer) return <div>Customer not found</div>;

  return (
    <div>
      <CustomerDetail customer={customer} transactions={transactions} />
    </div>
  );
}