import React from 'react';
import PropTypes from 'prop-types';

function CustomizableTable({ columns, data, actions }) {
  return (
    <table className="table table-hover caption-top">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.length !== 0 ? (
          data.map((item, rowIndex) => (
            <tr key={item._id}>
              {columns.map((column, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  {column.cellRenderer ? column.cellRenderer(item[column.accessor]) : item[column.accessor]}
                </td>
              ))}
              <td>
                {actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    type="button"
                    className={`btn btn-light btn-sm mx-1${action.variant ? ` btn-${action.variant}` : ''}`}
                    title={action.label}
                    onClick={() => action.onClick(item)}
                  >
                    <i className={`bi bi-${action.icon}`}></i>
                  </button>
                ))}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1}>Nenhum dado encontrado</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

CustomizableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      cellRenderer: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.string,
    })
  ).isRequired,
};

export default CustomizableTable;