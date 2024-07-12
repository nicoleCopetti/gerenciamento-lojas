import React from 'react';

const DetailsCard = ({ title, details, onClose }) => {
  return (
    <div className="card w-100">
      <div className="card-header">
        <div className="d-flex">
          <div className="px-2 w-100">{title}</div>
          <div className="px-2 flex-shrink-1" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </div>
        </div>
      </div>
      <div className="card-body">
        {details.length !== 0 ? (
          details.map((detail, index) => (
            <ul key={index} className="w-100 list-group list-group-horizontal">
              {detail.items.map((item, itemIndex) => (
                <li key={itemIndex} className="w-25 list-group-item justify-content-between align-items-center list-group-item-light">
                  <div className="d-flex">
                    <div className="px-2 w-100">{item.label}</div>
                    <div className="px-2 flex-shrink-1">
                      <span className="badge text-bg-secondary">
                        {item.value}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ))
        ) : (
          <p className="px-2 m-0 text-body-secondary">Nenhum registrado encontrado!</p>
        )}
      </div>
    </div>
  );
};

export default DetailsCard;