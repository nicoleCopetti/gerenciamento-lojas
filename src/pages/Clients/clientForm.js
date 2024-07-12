import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../../components/form/form';
import { getClient, saveClient } from '../../services/clients';
import { getAllSellers } from '../../services/sellers';
import { getAddressByCEP } from '../../services/viacep';

function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: '',
    cpf: '',
    rg: '',
    cellphone: '',
    phone: '',
    birthDate: '',
    maritalStatus: 'Single',
    spouseName: '',
    spousePhone: '',
    sellerPerson: '',
    status: true,
    city: '',
    number: '',
    cep: '',
    country: '',
    state: '',
  });

  const [formLabels, setFormLabels] = useState([
    { id: 'name', name: 'name', text: 'Nome', type: 'text', required: true },
    { id: 'cpf', name: 'cpf', text: 'CPF', type: 'text', required: true, mask: '999.999.999-99' },
    { id: 'rg', name: 'rg', text: 'RG', type: 'text', required: true },
    { id: 'cellphone', name: 'cellphone', text: 'Celular', type: 'text', required: true,  mask: '(99) 99999-9999' },
    { id: 'phone', name: 'phone', text: 'Telefone', type: 'text', required: true,  mask: '(99) 9999-9999' },
    { id: 'birthDate', name: 'birthDate', text: 'Data Nascimento', type: 'date', required: true },
    { id: 'maritalStatus', name: 'maritalStatus', text: 'Status Civil', type: 'select', required: true, 
      options: [
        { value: 'Single', label: 'Solteiro' },
        { value: 'Married', label: 'Casado' },
        { value: 'Divorced', label: 'Divorciado' }, 
      ] 
    },
    { id: 'spouseName', name: 'spouseName', text: 'Nome Cônjuge', type: 'text', display: 'none'},
    { id: 'spousePhone', name: 'spousePhone', text: 'Telefone Cônjuge', type: 'text', mask: '(99) 99999-9999', display: 'none'},
    { id: 'cep', name: 'cep', text: 'CEP', type: 'text', required: true, mask: '99999-999' },
    { id: 'country', name: 'country', text: 'Cidade', type: 'text', required: true },
    { id: 'state', name: 'state', text: 'Estado', type: 'text', required: true },
    { id: 'city', name: 'city', text: 'Cidade', type: 'text', required: true },
    { id: 'complement', name: 'complement', text: 'Complemento', type: 'text', required: true },
    { id: 'number', name: 'number', text: 'Número', type: 'text', required: true },
    { id: 'sellerPerson', name: 'sellerPerson', text: 'Vendedor', type: 'select', required: true, options: [] },
    { id: 'status', name: 'status', text: 'Status', type: 'select', required: true, 
      options: [
        { value: true, label: 'Ativo' }, 
        { value: false, label: 'Inativo' }
      ] 
    },
  ]);

  useEffect(() => {
    fetchSellers();
    if (id) {
      fetchClient(id);
    }
  }, [id]);

  async function fetchClient(id) {
    try {
      const response = await getClient(id);
      const updatedClient = {
        ...response,
        birthDate: new Date(response.birthDate).toISOString().split('T')[0],
        cep: response.address.cep || '',
        country: response.address.country || '',
        state: response.address.state || '',
        city: response.address.city || '',
        number: response.address.number || '',
        complement: response.address.complement || '',
        spouseName: (response.spouse) ? response.spouse.name : '',
        spousePhone: (response.spouse) ? response.spouse.phone : '',
      };
  
      setClient(updatedClient);
  
      if (response.maritalStatus === 'Married') {
        setFormLabels((prevLabels) =>
          prevLabels.map((label) => {
            if (label.name === 'spouseName' || label.name === 'spousePhone') {
              return { ...label, display: 'block', required: true };
            }
            return label;
          })
        );
      } else {
        setFormLabels((prevLabels) =>
          prevLabels.map((label) => {
            if (label.name === 'spouseName' || label.name === 'spousePhone') {
              return { ...label, display: 'none', required: false };
            }
            return label;
          })
        );
      }
    } catch (error) {
      alert('Error fetching client:' + error.message);
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

  async function fetchAddress(cep) {
    try {
      const response = await getAddressByCEP(cep);
      if (!response.erro) {
        setClient((prevState) => ({
          ...prevState,
          country: 'Brasil',
          state: response.uf,
          city: response.localidade,
          number: '',
          complement: response.logradouro,
        }));
      } else {
        alert('CEP não encontrado.');
        setClient((prevState) => ({
          ...prevState,
          country: 'Brasil',
          state: response.uf,
          city: response.localidade,
          number: '',
          complement: response.logradouro,
        }));
      }
    } catch (error) {
      alert('Error fetching client: ' + error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: name === 'status' ? (value === 'true') : value,
    }));

    if(name === 'cep' && value.match(/^\d{5}-\d{3}$/)){
      const cep = value.replace(/[.-]/g, '');
      fetchAddress(cep);
    }

    if(name === 'maritalStatus'){
      setFormLabels((prevLabels) => 
        prevLabels.map((label) => {
          if (label.name === 'spouseName' || label.name === 'spousePhone') {
            if(value !== 'Married'){
              setClient((prevState) => ({
                ...prevState,
                spouseName: '',
                spousePhone: '',
              }));
            }
            return { ...label, display: value === 'Married' ? 'block' : 'none', required: value === 'Married'};
          }
          return label;
        })
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formattedClients = {
        ...client,
        address: {
          cep: client.cep || '',
          country: client.country || '',
          state: client.state || '',
          city: client.city || '',
          number: client.number || '',
          complement: client.complement || '',
        },
        spouse: {
          name: client.spouseName || '',
          phone: client.spousePhone || '',
        }
      };
      await saveClient(formattedClients);
      navigate('/clients');
    } catch (error) {
      alert('Error saving client: ' + error);
    }
  }

  return (
    <div className="container">
      <h3 className="m-0">{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h3>
      <hr className="m-0 mb-1"></hr>
      <Form 
        values={client} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        labels={formLabels} 
      />
    </div>
  );
}

export default ClientForm;