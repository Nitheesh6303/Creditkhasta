// src/context/CreditContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';

const CreditContext = createContext();

const initialState = {
  customers: [],
  transactions: [],
  loading: true
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload, loading: false };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        customers: state.customers.map(customer => 
          customer.id === action.payload.customerId 
            ? { ...customer, balance: action.payload.newBalance } 
            : customer
        )
      };
    default:
      return state;
  }
}

export function CreditProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Load initial data from localStorage
    const loadData = () => {
      const customers = JSON.parse(localStorage.getItem('credikhasta_customers') || '[]');
      const transactions = JSON.parse(localStorage.getItem('credikhasta_transactions') || '[]');
      
      dispatch({
        type: 'LOAD_DATA',
        payload: { customers, transactions }
      });
    };

    loadData();
  }, []);

  const saveCustomers = (customers) => {
    localStorage.setItem('credikhasta_customers', JSON.stringify(customers));
  };

  const saveTransactions = (transactions) => {
    localStorage.setItem('credikhasta_transactions', JSON.stringify(transactions));
  };

  const addCustomer = (customer) => {
    const newCustomer = { 
      ...customer, 
      id: Date.now().toString(),
      balance: 0,
      nextDueDate: null,
      createdAt: new Date().toISOString()
    };
    const updatedCustomers = [...state.customers, newCustomer];
    saveCustomers(updatedCustomers);
    dispatch({ type: 'ADD_CUSTOMER', payload: newCustomer });
    return newCustomer;
  };

  const addTransaction = (transaction) => {
    const newTransaction = { 
      ...transaction, 
      id: `t${Date.now()}`,
      date: new Date().toISOString()
    };
    const updatedTransactions = [newTransaction, ...state.transactions];
    saveTransactions(updatedTransactions);
    
    // Update customer balance if needed
    if (transaction.type === 'credit' || transaction.type === 'repayment') {
      const customer = state.customers.find(c => c.id === transaction.customerId);
      if (customer) {
        const newBalance = transaction.type === 'credit' 
          ? customer.balance + transaction.amount 
          : customer.balance - transaction.amount;
        
        const updatedCustomers = state.customers.map(c => 
          c.id === transaction.customerId 
            ? { ...c, balance: newBalance } 
            : c
        );
        saveCustomers(updatedCustomers);
        dispatch({ 
          type: 'UPDATE_BALANCE', 
          payload: { customerId: transaction.customerId, newBalance } 
        });
      }
    }
    
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    return newTransaction;
  };

  const getCustomer = (id) => {
    const customer = state.customers.find(c => c.id === id);
    const transactions = state.transactions.filter(t => t.customerId === id);
    return { customer, transactions };
  };

  return (
    <CreditContext.Provider value={{
      ...state,
      addCustomer,
      addTransaction,
      getCustomer
    }}>
      {children}
    </CreditContext.Provider>
  );
}

export const useCredit = () => useContext(CreditContext);   