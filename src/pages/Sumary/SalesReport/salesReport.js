import React, { useState } from 'react';

const SalesReport = ({ salesSummary }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredSalesSummary = salesSummary.filter(period => {
    const formattedFilter = filter.replace(/[^\d]/g, '');
    const monthYear = `${period._id.month}/${period._id.year}`;
    return monthYear.includes(formattedFilter);
  });

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="filterInput" className="form-label">Filtrar período:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="filterInput"
          value={filter}
          onChange={handleChange}
          maxLength="7"
          pattern="\d{2}/\d{4}"
        />
      </div>
      <table className="table">
        <tbody>
          {filteredSalesSummary.map((period, index) => (
            <React.Fragment key={index}>
              <tr>
                <th className="bg-secondary-subtle" colSpan="3">
                  Período - {period._id.month}/{period._id.year}
                </th>
              </tr>
              <tr>
                <th>Método de Pagamento</th>
                <th>Quantidade</th>
                <th>Total (R$)</th>
              </tr>
              {period.salesPaymentMethod.map((method, idx) => (
                <tr key={`${index}-${idx}`}>
                  <td>{method.paymentMethod}</td>
                  <td>{method.quantity}</td>
                  <td>{formatCurrency(method.totalAmount)}</td>
                </tr>
              ))}
              <tr>
                <td className="text-end bg-body-tertiary fw-medium" colSpan="2">Total Geral:</td>
                <td className="bg-body-tertiary fw-medium">{formatCurrency(period.totalAmountAllPayments)}</td>
              </tr>
              <tr>
                <td className="text-end bg-body-tertiary fw-medium" colSpan="2">Total Comissão:</td>
                <td className="bg-body-tertiary fw-medium">{formatCurrency(period.totalCommission)}</td>
              </tr>
              <tr>
                <td className="text-end bg-body-tertiary fw-medium" colSpan="2">Novos Clientes:</td>
                <td className="bg-body-tertiary fw-medium">{period.newCustomersSummary}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;