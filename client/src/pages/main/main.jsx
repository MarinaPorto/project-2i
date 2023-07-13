import MainAbout from '../../components/main-about/main-about';
import { MainTop } from '../../components/main-top';
import { MainStages } from '../../components/main-stages';
import { MainTariff } from '../../components/main-tariff';
import styles from './main.module.css'
import MainPromo from '../../components/main-promotions/main-promotions';
import { MainClients } from '../../components/main-clients';
import MainContacts from '../../components/main-contacts/main-contacts';
import { useEffect } from 'react';

export function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main">
      <MainTop />
      <MainAbout />
      <MainStages />
      <MainTariff />
      <MainPromo />
      <MainClients />
      <MainContacts />
    </main>
  )
}
export default MainPage;