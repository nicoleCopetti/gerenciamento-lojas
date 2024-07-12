import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import { getAllSales } from '../../services/sales';
import CustomizableTable from '../../components/table/customizableTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SaleList() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    if (filter === 'active') {
      setFilteredSales(sales.filter((seller) => seller.status));
    } else if (filter === 'inactive') {
      setFilteredSales(sales.filter((seller) => !seller.status));
    } else {
      setFilteredSales(sales);
    }
  }, [sales, filter]);

  async function fetchSales() {
    const response = await getAllSales();
    setSales(response);
  }

  function handleEdit(seller) {
    navigate(`/sale/${seller._id}`);
  }

  const columns = [
    { 
      header: 'Cliente', 
      accessor: 'clientPerson', 
      cellRenderer: (clientPerson) => {
        if (clientPerson && clientPerson.name) {
          return clientPerson.name;
        } else {
          return ''; 
        }
      }
    },
    { 
      header: 'Vendedor', 
      accessor: 'sellerPerson', 
      cellRenderer: (sellerPerson) => {
        if (sellerPerson && sellerPerson.name) {
          return sellerPerson.name;
        } else {
          return ''; 
        }
      }
    },
    { header: 'Data Venda', accessor: 'saleDate', cellRenderer: (date) => moment(date).format('DD/MM/YYYY') },
    { header: 'Valor', accessor: 'saleAmount', cellRenderer: (amount) => amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
    { header: 'Método Pgto', accessor: 'paymentMethod' },
    { header: 'Status', accessor: 'status', cellRenderer: (status) => status ? 'Ativo' : 'Inativo' }, 
  ];

  const actions = [
    {
      icon: 'pencil-square',
      label: 'Editar',
      onClick: (seller) => handleEdit(seller),
    },
  ];

  return (
    <div className="container">
      <h3 className="m-0">Gerenciamento de Vendas</h3>
      <hr className="m-0 mb-1"></hr>
      <div className="d-flex">
        <div className="p-2 flex-grow-1">
          <label htmlFor="filterStatus" className="col-form-label"> Filtrar por Status: </label>
          <select className="form-select form-select-sm" value={filter} onChange={(e) => setFilter(e.target.value)} >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>
        <div className="p-2 align-self-end">
          <Link to="/sale" className="btn btn-primary btn-sm">Novo Cadastro</Link>
        </div>
      </div>
      <CustomizableTable columns={columns} data={filteredSales} actions={actions} />
    </div>
  );
}

export default SaleList;