import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import { getAllClients } from '../../services/clients';
import CustomizableTable from '../../components/table/customizableTable';
import DetailsCard from '../../components/card/detailsCard';

function ClientsList(){
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const response = await getAllClients();
    setClients(response);
  }

  function handleEdit(client) {
    navigate(`/client/${client._id}`);
  }

  function handleDetails(client) {
    const purchasesSummary = client.purchases.map((summary) => ({
      items: [
        { label: `Compra - ${moment(summary.saleDate).format('DD/MM/YYYY HH:mm')}`, value: '' },
        { label: 'Pagamento', value: summary.paymentMethod },
        { label: 'Valor Compra', value: summary.saleAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
        { label: 'Vendedor', value: summary.sellerPerson.name },
      ],
    }));
    setSelectedClient({ name: client.name, purchasesSummary });
  } 

  const columns = [
    { header: 'Nome', accessor: 'name' },
    { 
      header: 'Última Compra', 
      accessor: 'lastPurchase', 
      cellRenderr: (date) => date ?  moment(date).format('DD/MM/YYYY') : ''
    },
    { header: 'Vendedor', accessor: "sellerClient" },
  ];
  
  const actions = [
    {
      icon: 'receipt',
      label: 'Resumo Vendas',
      onClick: (client) => handleDetails(client),
    },
    {
      icon: 'pencil-square',
      label: 'Editar',
      onClick: (client) => handleEdit(client),
    }
  ];

  return (
    <div className="container">
      <h3 className="m-0">Gerenciamento de Clientes</h3>
      <hr className="m-0 mb-1"></hr>
      {selectedClient && (
        <DetailsCard 
          title={`Registro de Compras cliente: ${selectedClient.name}`} 
          details={selectedClient.purchasesSummary}
          onClose={() => setSelectedClient(null)}
        />
      )}
      <div className="d-flex float-end">
        <div className="p-2 align-self-end">
          <Link to="/client" className="btn btn-primary btn-sm">Novo Cadastro</Link>
        </div>
      </div>
      <CustomizableTable columns={columns} data={clients} actions={actions} />
    </div>
  );
}

export default ClientsList;