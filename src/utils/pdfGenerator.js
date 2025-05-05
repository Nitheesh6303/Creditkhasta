// src/utils/pdfGenerator.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function generateCustomerStatement(customer, transactions) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(18);
  doc.text(`Credit Statement for ${customer.name}`, 14, 20);
  
  // Summary
  doc.setFontSize(12);
  doc.text(`As of ${new Date().toLocaleDateString()}`, 14, 30);
  doc.text(`Outstanding Balance: ₹${customer.balance.toFixed(2)}`, 14, 40);
  
  // Transactions table
  const tableData = transactions.map(txn => [
    new Date(txn.date).toLocaleDateString(),
    txn.type === 'credit' ? 'Credit Sale' : 'Repayment',
    `₹${txn.amount.toFixed(2)}`,
    txn.dueDate ? new Date(txn.dueDate).toLocaleDateString() : '-',
    `₹${(txn.balance || 0).toFixed(2)}`
  ]);
  
  doc.autoTable({
    startY: 50,
    head: [['Date', 'Type', 'Amount', 'Due Date', 'Balance']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] }
  });
  
  doc.save(`CrediKhasta_Statement_${customer.name}_${Date.now()}.pdf`);
}