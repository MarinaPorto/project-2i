import { HomePage } from '../../components/main-registered/home-page';
import { UserPage } from '../../components/main-registered/user-page';
import { BalancePage } from '../../components/main-registered/home-balance';
import { SearchTable } from '../../components/main-registered/search-table';
import { ServicesPrices } from '../../components/main-registered/services-prices';
import styles from './main-registered.module.css'
import Sidebar from '../../components/main-registered/sidebar/sidebar';
import SidebarFull from '../../components/main-registered/sidebar-full/sidebar-full';
import { useSelector } from 'react-redux';


export function MainRegisteredPage() {

  const selectedPage = useSelector(state => state.selectedPage.selectedPage);
  const burger = useSelector(state => state.burger.burger);
  return (
    <main className={styles.main}>
      {!burger && <Sidebar />}
      {burger && <SidebarFull />}
      {(selectedPage === "homepage") && <HomePage />}
      {(selectedPage === "balancepage") && <BalancePage />}
      {(selectedPage === "mypage") && <UserPage />}
      {(selectedPage === "cargoSearch") && <SearchTable title={"Поиск грузов для перевозки"} />}
      {(selectedPage === "transportSearch") && <SearchTable title={"Поиск транспорта для перевозки"} />}
      {(selectedPage === "transportRegistration") && <SearchTable title={"Регистрация транспорта"} />}
      {(selectedPage === "cargoRegistration") && <SearchTable title={"Регистрация груза"} />}
      {(selectedPage === "servicesPrices") && <ServicesPrices/>}
    </main>
  )
}
export default MainRegisteredPage;