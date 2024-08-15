import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoanForm.css';

const LoanForm = () => {
  const [loan, setLoan] = useState({ bookId: '', borrowerName: '', borrowDate: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:5001/api/loans', loan);
      navigate('/active-loans');
    } catch (error) {
      console.error('Error saving loan:', error);
    }
  };

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  return (
    <div className="loan-form-container">
      <h1>Agregar Nuevo Préstamo</h1>
      <form onSubmit={handleSubmit} className="loan-form">
        <label htmlFor="bookId">ID del Libro</label>
        <input 
          type="number" 
          name="bookId" 
          value={loan.bookId} 
          onChange={handleChange} 
          placeholder="ID del libro" 
          className="form-input"
          required 
        />
        
        <label htmlFor="borrowerName">Nombre del Prestatario</label>
        <input 
          type="text" 
          name="borrowerName" 
          value={loan.borrowerName} 
          onChange={handleChange} 
          placeholder="Nombre del prestatario" 
          className="form-input"
          required 
        />
        
        <label htmlFor="borrowDate">Fecha de Préstamo</label>
        <input 
          type="date" 
          name="borrowDate" 
          value={loan.borrowDate} 
          onChange={handleChange} 
          className="form-input"
          required 
        />
        
        <button type="submit" className="form-button">Guardar</button>
      </form>
    </div>
  );
};

export default LoanForm;
