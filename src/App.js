import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import SellersList from './pages/Sellers/sellerList';
import SellerForm from './pages/Sellers/sellerForm';
import ClientesList from './pages/Clients/clientList';
import ClientForm from './pages/Clients/clientForm';
import SaleList from './pages/Sales/saleList';
import SaleForm from './pages/Sales/saleForm';
import SumaryList from './pages/Sumary/sumaryList';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/sellers" element={< SellersList />}/>
                        <Route path="/seller/:id" element={< SellerForm />}/>
                        <Route path="/seller" element={< SellerForm />}/>
                        <Route path="/clients" element={< ClientesList />}/>
                        <Route path="/client/:id" element={< ClientForm />}/>
                        <Route path="/client" element={< ClientForm />}/>
                        <Route path="/sales" element={< SaleList />}/>
                        <Route path="/sale/:id" element={< SaleForm />}/>
                        <Route path="/sale" element={< SaleForm />}/>
                        <Route path="/sumary" element={< SumaryList />}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;