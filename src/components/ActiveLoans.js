import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ActiveLoans.css';

const ActiveLoans = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoans, setSelectedLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/loans');
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  const handleMarkAsCompleted = async () => {
    try {
      await axios.post('https://localhost:5001/api/loans/mark-as-completed', selectedLoans);
      setLoans(loans.filter(loan => !selectedLoans.includes(loan.id)));
      setSelectedLoans([]);
    } catch (error) {
      console.error('Error marking loans as completed:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedLoans(prev => 
      prev.includes(id) ? prev.filter(loanId => loanId !== id) : [...prev, id]
    );
  };

  return (
    <div className="loan-list-container">
      <h1>Prestamos Activos</h1>
      <table className="loan-list-table">
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>ID del libro</th>
            <th>Nombre del prestatario</th>
            <th>Fecha de préstamo</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedLoans.includes(loan.id)} 
                  onChange={() => handleCheckboxChange(loan.id)} 
                />
              </td>
              <td>{loan.bookId}</td>
              <td>{loan.borrowerName}</td>
              <td>{new Date(loan.borrowDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleMarkAsCompleted} className="mark-completed-button">
        Marcar préstamos seleccionados como finalizados
      </button>
      <a href="/loan-form" className="add-loan-button">Agregar nuevo préstamo</a>
    </div>
  );
};

export default ActiveLoans;
