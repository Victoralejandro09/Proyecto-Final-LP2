import axios from 'axios';

const API_URL = 'https://localhost:5001/api';

// Libros
export const getBooks = () => axios.get(`${API_URL}/books`);
export const getBookById = (id) => axios.get(`${API_URL}/books/${id}`); 
export const searchBooks = (params) => axios.get(`${API_URL}/books/search`, { params });
export const postBook = (book) => axios.post(`${API_URL}/books`, book);
export const putBook = (id, book) => axios.put(`${API_URL}/books/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/books/${id}`);

// Préstamos
export const getActiveLoans = () => axios.get(`${API_URL}/loans`);
export const getLoanHistory = () => axios.get(`${API_URL}/loans/history`);
export const postLoan = (loan) => axios.post(`${API_URL}/loans`, loan);

// Miembros
export const getMembers = () => axios.get(`${API_URL}/members`);
export const getMember = (id) => axios.get(`${API_URL}/members/${id}`);
export const searchMembers = (params) => axios.get(`${API_URL}/members/search`, { params });
export const postMember = (member) => axios.post(`${API_URL}/members`, member);
export const putMember = (id, member) => axios.put(`${API_URL}/members/${id}`, member);
export const deleteMember = (id) => axios.delete(`${API_URL}/members/${id}`);
