import React, { useState, useEffect } from 'react';
import { getSumary } from '../../services/sales';
import SalesReport from './SalesReport/salesReport';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SumaryList(){
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getSumary();
    const data = response.salesSummary;
    setData(data);
  }

  return (
    <div className="container">
      <h3 className="m-0">Resumo de Vendas</h3>
      <hr className="m-0 mb-3"></hr>
      <SalesReport salesSummary={data} />
    </div>
  );
}

export default SumaryList;