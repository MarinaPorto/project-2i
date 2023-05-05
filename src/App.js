import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Footer from './components/footer/footer';
import Header from './components/header/header'
import { MainPage } from './pages/main';
import { CarrierPage } from './pages/сarrier';
import { ShipperPage } from './pages/shipper';
import { ForwarderPage } from './pages/forwarder';
import { PaymentPage } from './pages/payment';
import { TariffPage } from './pages/tariff';
import FAQPage from './pages/faq/faq';
import { MainRegisteredPage } from './pages/main-registered';
import { RulesPage } from './pages/pravila';
import { HeaderRegistered } from './components/header-registered';


function App() {
  const currentUrl = window.location.pathname;
    return (
    <BrowserRouter>
      <div className='wrapper'>
        {currentUrl === "/main-registered" ? <HeaderRegistered /> : < Header />} 
         <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/perevozchiku' element={<CarrierPage />} />
          <Route path='/gruzootpravitelyu' element={<ShipperPage />} />
          <Route path='/ekspeditoru' element={<ForwarderPage />} />
          <Route path='/oplata' element={<PaymentPage />} />
          <Route path='/tariff' element={<TariffPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/pravila' element={<RulesPage />} />
          <Route path='/main-registered' element={<MainRegisteredPage />} />
        </Routes>
        < Footer />
      </div>
    </BrowserRouter >
  )
}

export default App;
