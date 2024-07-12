import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Form from '../../components/form/form';
import { getSale, saveSale } from '../../services/sales';
import { getAllSellers } from '../../services/sellers';
import { getAllClients } from '../../services/clients';

function SaleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState({
    clientPerson: '',
    sellerPerson: '',
    saleDate: '',
    saleAmount: '',
    paymentMethod: 'Dinheiro',
    status: true,
  });

  useEffect(() => {
    fetchSellers();
    fetchClients();
    if (id) {
      fetchSale(id);
    }
  }, [id]);

  async function fetchSale(id) {
    try {
      const response = await getSale(id);
      setSale({
        ...response,
        saleDate: new Date(response.saleDate).toISOString().split('T')[0],
      });
    } catch (error) {
      alert('Error fetching sale: ' + error);
    }
  }

  async function fetchSellers() {
    try {
      const response = await getAllSellers();
      const sellers = response;
      setFormLabels((prevLabels) =>
        prevLabels.map((label) => {
          if (label.name === 'sellerPerson') {
            return {
              ...label,
              options: sellers.map((seller) => ({
                value: seller._id,
                label: seller.name,
              })),
            };
          }
          return label;
        })
      );
    } catch (error) {
      alert('Error fetching client: ' + error);
    }
  }

  async function fetchClients() {
    try {
      const response = await getAllClients();
      const clients = response;
      setFormLabels((prevLabels) =>
        prevLabels.map((label) => {
          if (label.name === 'clientPerson') {
            return {
              ...label,
              options: clients.map((client) => ({
                value: client._id,
                label: client.name,
              })),
            };
          }
          return label;
        })
      );
    } catch (error) {
      alert('Error fetching client: ' + error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSale((prevState) => ({
      ...prevState,
      [name]: name === 'status' ? (value === 'true') : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formattedSale = {
        ...sale,
        saleDate: `${moment(sale.saleDate).toISOString()}`,
      };
      await saveSale(formattedSale);
      navigate('/sales');
    } catch (error) {
      alert('Error saving sale: ' + error);
    }
  }

  const [formLabels, setFormLabels] = useState([
    { id: 'sellerPerson', name: 'sellerPerson', text: 'Vendedor', type: 'select', required: true, options: [] },
    { id: 'clientPerson', name: 'clientPerson', text: 'Cliente', type: 'select', required: true, options: [] },
    { id: 'saleDate', name: 'saleDate', text: 'Data Venda', type: 'date', required: true },
    { id: 'saleAmount', name: 'saleAmount', text: 'Valor Venda', type: 'number', required: true },
    { id: 'paymentMethod', name: 'paymentMethod', text: 'Forma de Pagamento', type: 'select', required: true, 
      options: [
        { value: 'Dinheiro', label: 'Dinheiro' }, 
        { value: 'Cartão', label: 'Cartão' }, 
        { value: 'Pix', label: 'Pix' }
      ] 
    },
    { id: 'status', name: 'status', text: 'Status', type: 'select', required: true, 
      options: [
        { value: true, label: 'Ativo' }, 
        { value: false, label: 'Inativo' }
      ] 
    },
  ]);

  return (
    <div className="container">
      <h3 className="m-0">{id ? 'Editar Venda' : 'Adicionar Venda'}</h3>
      <hr className="m-0 mb-1"></hr>
      <Form 
        values={sale} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        labels={formLabels} 
      />
    </div>
  );
}

export default SaleForm;