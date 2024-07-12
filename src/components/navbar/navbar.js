import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/sellers" className="nav-link">Vendedores</Link>
            </li>
            <li className="nav-item">
              <Link to="/clients" className="nav-link">Clientes</Link>
              </li>
            <li className="nav-item">
              <Link to="/sales" className="nav-link">Vendas</Link>
              </li>
            <li className="nav-item">
              <Link to="/sumary" className="nav-link">Relatórios</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;