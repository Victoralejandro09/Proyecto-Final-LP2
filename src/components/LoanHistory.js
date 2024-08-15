import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoanHistory.css';

const LoanHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/loans/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching loan history:', error);
      }
    };

    fetchHistory();
  }, []);

  
  const sortedHistory = history.sort((a, b) => {
    if (!a.returnDate && b.returnDate) return -1;
    if (a.returnDate && !b.returnDate) return 1;
    return new Date(b.borrowDate) - new Date(a.borrowDate);
  });

  return (
    <div className="loan-history-container">
      <h1>Historial de Préstamos</h1>
      <table className="loan-history-table">
        <thead>
          <tr>
            <th>ID del libro</th>
            <th>Nombre del prestatario</th>
            <th>Fecha de préstamo</th>
            <th>Fecha de retorno</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map(record => (
            <tr key={record.id}>
              <td>{record.bookId}</td>
              <td>{record.borrowerName}</td>
              <td>{new Date(record.borrowDate).toLocaleDateString()}</td>
              <td>{record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'No retornado'}</td>
              <td>{record.returnDate ? 'Finalizado' : 'Activo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanHistory;
