import axios from 'axios';
import { Transaction } from '../types/types';

const API_URL = 'http://localhost:5000/api/transactions';

export const createTransaction = async (transaction: Transaction) => {
  const response = await axios.post(API_URL, transaction);
  return response.data;
};

export const getTransactionsByUser = async (userId: string) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const updateTransaction = async ({ id, ...transaction}: { id: string; transaction: Transaction; }) => {
  const response = await axios.put(`${API_URL}/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};