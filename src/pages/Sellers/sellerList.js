import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import { getAllSellers } from '../../services/sellers';
import CustomizableTable from '../../components/table/customizableTable';
import DetailsCard from '../../components/card/detailsCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SellersList() {
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedSeller, setSelectedSeller] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellers();
  }, []);

  useEffect(() => {
    if (filter === 'active') {
      setFilteredSellers(sellers.filter((seller) => seller.status));
    } else if (filter === 'inactive') {
      setFilteredSellers(sellers.filter((seller) => !seller.status));
    } else {
      setFilteredSellers(sellers);
    }
  }, [sellers, filter]);

  async function fetchSellers() {
    const response = await getAllSellers();
    setSellers(response);
  }

  function handleDetails(seller) {
    const salesSummary = seller.salesSummary.map((summary) => ({
      items: [
        { label: `Período - ${moment(summary.month).format('MM/YYYY')}`, value: '' },
        { label: 'Quantidade', value: summary.totalSales },
        { label: 'Valor Total', value: summary.totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
        { label: 'Total Comissão', value: summary.totalCommission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
      ],
    }));
    setSelectedSeller({ name: seller.name, salesSummary });
  }

  function handleEdit(seller) {
    navigate(`/seller/${seller._id}`);
  }

  const columns = [
    { header: 'Nome', accessor: 'name' },
    { 
        header: 'Contratação', 
        accessor: 'hireDate', 
        cellRenderer: (date) => moment(date).format('DD/MM/YYYY') 
    },
    { header: '% Comissão', accessor: 'commissionPerc' },
    { header: 'Entrada', accessor: 'entryTime' },
    { header: 'Saída', accessor: 'exitTime' },
    { header: 'Status', accessor: 'status', cellRenderer: (status) => status ? 'Ativo' : 'Inativo' }, 
    { header: 'Disponível', accessor: 'isWorking', cellRenderer: (isWorking) => isWorking ? 'Sim' : 'Não' },
  ];

  const actions = [
    {
      icon: 'receipt',
      label: 'Resumo Vendas',
      onClick: (seller) => handleDetails(seller),
    },
    {
      icon: 'pencil-square',
      label: 'Editar',
      onClick: (seller) => handleEdit(seller),
    }
  ];

  return (
    <div className="container">
      <h3 className="m-0">Gerenciamento de Vendedores</h3>
      <hr className="m-0 mb-1"></hr>
      {selectedSeller && (
        <DetailsCard 
          title={`Resumo de vendas: ${selectedSeller.name}`} 
          details={selectedSeller.salesSummary}
          onClose={() => setSelectedSeller(null)}
        />
      )}
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
          <Link to="/seller" className="btn btn-primary btn-sm">Novo Cadastro</Link>
        </div>
      </div>
      <CustomizableTable columns={columns} data={filteredSellers} actions={actions} />
    </div>
  );
}

export default SellersList;
