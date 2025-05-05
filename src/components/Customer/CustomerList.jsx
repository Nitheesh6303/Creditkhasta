// src/components/Customer/CustomerList.jsx
import CustomerCard from './CustomerCard';

export default function CustomerList({ customers, onExport }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers.map(customer => (
        <CustomerCard 
          key={customer.id} 
          customer={customer} 
          onExport={() => onExport(customer.id)}
        />
      ))}
    </div>
  );
}