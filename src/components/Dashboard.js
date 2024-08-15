import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    availableBooks: 0,
    borrowedBooks: 0,
    activeMembers: 0,
    overdueLoans: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/members/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-card">
        <h2>Total de Libros Disponibles</h2>
        <p>{dashboardData.availableBooks}</p>
      </div>
      <div className="dashboard-card">
        <h2>Libros Prestados</h2>
        <p>{dashboardData.borrowedBooks}</p>
      </div>
      <div className="dashboard-card">
        <h2>Total de Miembros</h2>
        <p>{dashboardData.activeMembers}</p>
      </div>
      <div className="dashboard-card">
        <h2>Préstamos Vencidos</h2>
        <p>{dashboardData.overdueLoans}</p>
      </div>
    </div>
  );
};

export default Dashboard;
