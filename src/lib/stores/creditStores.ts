import { writable } from 'svelte/store';
import type { Customer, Loan, Payment } from '$lib/types';

export const customers = writable<Customer[]>([]);
export const loans = writable<Loan[]>([]);
export const payments = writable<Payment[]>([]);

export const fetchCustomers = async () => {
  try {
    const response = await fetch('/api/customers');
    if (!response.ok) throw new Error('Error fetching customers');
    const data: Customer[] = await response.json();
    customers.set(data);
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};

export const fetchLoans = async () => {
  try {
    const response = await fetch('/api/loans');
    if (!response.ok) throw new Error('Error fetching loans');
    const data: Loan[] = await response.json();
    loans.set(data);
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
};

export const fetchPayments = async () => {
  try {
    const response = await fetch('/api/payments');
    if (!response.ok) throw new Error('Error fetching payments');
    const data: Payment[] = await response.json();
    payments.set(data);
  } catch (error) {
    console.error('Error fetching payments:', error);
  }
};
