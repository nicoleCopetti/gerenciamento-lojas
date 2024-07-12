import React from 'react';
import InputMask from 'react-input-mask';

const Form = ({ values, handleChange, handleSubmit, labels }) => (
  <form onSubmit={handleSubmit} className="py-2">
    { labels.map((label, index) => (
      <div className="row w-100 mb-2" key={index}  style={{ display: label.display || 'block' }}>
        <div className="col">
          <label htmlFor={label.id} className="form-label">{label.text}</label>
          {label.type === 'select' ? (
            <select
              className="form-select"
              id={label.id}
              name={label.name}
              value={values[label.name]}
              onChange={handleChange}
              required={label.required}
            >
              {label.options.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : label.mask ? (
            <InputMask
              mask={label.mask}
              className="form-control"
              id={label.id}
              name={label.name}
              value={values[label.name]}
              onChange={handleChange}
              required={label.required}
            />
          ) : (
            <input
              type={label.type}
              className="form-control"
              id={label.id}
              name={label.name}
              value={values[label.name]}
              onChange={handleChange}
              required={label.required}
            />
          )}
        </div>
      </div>
    ))}
    <div className="row w-100 mb-2">
      <div className="col">
        <button type="submit" className="btn btn-primary float-end">Salvar</button>
      </div>
    </div>
  </form>
);

export default Form;