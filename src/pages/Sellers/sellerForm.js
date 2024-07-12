import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Form from '../../components/form/form';
import { getSeller, saveSeller } from '../../services/sellers';

function SellerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
    name: '',
    hireDate: '',
    commissionPerc: '',
    entryTime: '',
    exitTime: '',
    status: true,
  });

  useEffect(() => {
    if (id) {
      fetchSeller(id);
    }
  }, [id]);

  async function fetchSeller(id) {
    try {
      const response = await getSeller(id);
      setSeller({
        ...response,
        hireDate: new Date(response.hireDate).toISOString().split('T')[0],
        entryTime: moment(response.entryTime, 'hh:mm A').format('HH:mm'),
        exitTime: moment(response.exitTime, 'hh:mm A').format('HH:mm'),
      });
    } catch (error) {
      alert('Error fetching seller: ' + error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSeller((prevState) => ({
      ...prevState,
      [name]: name === 'status' ? (value === 'true') : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formattedSeller = {
        ...seller,
        entryTime: moment(seller.entryTime, 'HH:mm').format('hh:mm A'),
        exitTime: moment(seller.exitTime, 'HH:mm').format('hh:mm A'),
      };
      await saveSeller(formattedSeller);
      navigate('/sellers');
    } catch (error) {
      alert('Error saving seller: ' + error);
    }
  }

  const formLabels = [
    { id: 'name', name: 'name', text: 'Nome', type: 'text', required: true },
    { id: 'hireDate', name: 'hireDate', text: 'Contratação', type: 'date', required: true },
    { id: 'commissionPerc', name: 'commissionPerc', text: 'Comissão (%)', type: 'number', required: true },
    { id: 'entryTime', name: 'entryTime', text: 'Entrada', type: 'time', required: true },
    { id: 'exitTime', name: 'exitTime', text: 'Saída', type: 'time', required: true },
    { id: 'status', name: 'status', text: 'Status', type: 'select', required: true, 
      options: [
        { value: true, label: 'Ativo' }, 
        { value: false, label: 'Inativo' }
      ] 
    },
  ];

  return (
    <div className="container">
      <h3 className="m-0">{id ? 'Editar Vendedor' : 'Adicionar Vendedor'}</h3>
      <hr className="m-0 mb-1"></hr>
      <Form 
        values={seller} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        labels={formLabels} 
      />
    </div>
  );
}

export default SellerForm;