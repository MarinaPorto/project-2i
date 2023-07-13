/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
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
import { checkUserAuth, loginUserData } from './redux/reducers/user-data-reducer';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { FooterCopyrightLine } from './components/footer-bottom-copyright'
import { PrivacyPolicy } from './pages/pravila-privacy-policy';
import { RulesPlacing } from './pages/pravila-placing';
import { RulesVerifacation } from './pages/pravila-verifacation';
import { RulesOferta } from './pages/pravila-oferta';
import { PasswordConfirm } from './components/password-confirm';


function App() {
  const dispatch = useDispatch();

  async function checkAuth() {
    try {
      const response = await axios.get('http://178.172.173.84:5000/api/user/refresh', { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken);
      dispatch(checkUserAuth());
      dispatch(loginUserData(response.data));
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth()
    }
  }, [])

  const userAuht = useSelector(state => state.userData.auth);

  const Layout = () => {
    return (
      <div className='wrapper'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }

  const LayoutRegistered = () => {
    return (
      <div className='wrapper'>
        <HeaderRegistered />
        <Outlet />
        <FooterCopyrightLine />
      </div>
    )
  }
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Layout />} >
            <Route index element={<MainPage />} />
            <Route path='/perevozchiku' element={<CarrierPage />} />
            <Route path='/gruzootpravitelyu' element={<ShipperPage />} />
            <Route path='/ekspeditoru' element={<ForwarderPage />} />
            <Route path='/oplata' element={<PaymentPage />} />
            <Route path='/tariff' element={<TariffPage />} />
            <Route path='/faq' element={<FAQPage />} />
            <Route path='/pravila/polzovatelskoe-soglashenie' element={<RulesPage />} />
            <Route path='/pravila/politika-konfidencialnosti' element={<PrivacyPolicy />} />
            <Route path='/pravila/pravila-razmeshcheniya-zayavok' element={<RulesPlacing />} />
            <Route path='/pravila/verifikaciya' element={<RulesVerifacation />} />
            <Route path='/pravila/publichnaya-oferta' element={<RulesOferta />} />
            <Route path='/password/confirm/:id' element={<PasswordConfirm />} />
            <Route path="*" element={<MainPage />} />
          </Route>

          {userAuht && <Route path='/profile' element={<LayoutRegistered />} >
            <Route index element={<MainRegisteredPage />} />
          </Route>}

        </Routes>
      </div>
    </BrowserRouter >
  )
}

export default App;