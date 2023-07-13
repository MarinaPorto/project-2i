/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { HomePage } from '../../components/main-registered/home-page';
import { HomePageAdmin } from '../../components/main-registered/home-page-admin';
import { UserPage } from '../../components/main-registered/user-page';
import { BalancePage } from '../../components/main-registered/home-balance';
import { SearchTable } from '../../components/main-registered/search-table';
import { RegistrationTable } from '../../components/main-registered/registration-table';
import { ServicesPrices } from '../../components/main-registered/services-prices';
import { useDispatch, useSelector } from 'react-redux';
import styles from './main-registered.module.css'
import Sidebar from '../../components/main-registered/sidebar/sidebar';
import SidebarFull from '../../components/main-registered/sidebar-full/sidebar-full';
import axios from "axios";
import { useEffect } from 'react';
import { saveUserData } from '../../redux/reducers/user-data-reducer';
import { saveMyDialogs } from '../../redux/reducers/dialogs-reducer';
import { saveCargosUserData } from '../../redux/reducers/cargo-users-reducer';
import { saveCountUnreadMessages, saveCountUnreadDialogs } from '../../redux/reducers/unread-reducer';
import { saveTransportsUserData } from '../../redux/reducers/transports-user-reducer';
import ResultsTable from '../../components/main-registered/results-table/results-table';
import { Details } from '../../components/main-registered/details';
import { RegistrationTableTransport } from '../../components/main-registered/registration-table-transport';
import ResultsTableTransport from '../../components/main-registered/results-table-transport/results-table-transport';
import { SearchTableTransport } from '../../components/main-registered/search-table-transport';
import DetailsTransport from '../../components/main-registered/details-transport/details-transport';
import { AnotherUserPage } from '../../components/main-registered/another-user-page';
import { Chat } from '../../components/main-registered/chat';
import { UsersInvoice } from '../../components/main-registered/users-invoice';
import { closeSubscription } from '../../http/userAPI';
import io from 'socket.io-client';

const socketIO = io('http://178.172.173.84:5030');

export function MainRegisteredPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const userId = useSelector(state => state.userData.userLogin.user.id);
  const userName = useSelector(state => state.userData.userData.name);
  const userRole = useSelector(state => state.userData.userData.role);
  const myCargoList = useSelector(state => state.cargoUsers.cargoUser);
  const myTransportList = useSelector(state => state.transportsUser.transportsUser);
  const foundCargo = useSelector(state => state.cargoFound.cargoFound);
  const notfoundCargo = useSelector(state => state.cargoFound.cargoNotFound);
  const foundTransport = useSelector(state => state.transportFound.transportFound);
  const notfoundTransport = useSelector(state => state.transportFound.transportNotFound);
  const currentItem = useSelector(state => state.currentId.currentId);
  const chatIsOpen = useSelector(state => state.chatIsOpen.chatIsOpen);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userDeleted, setuserDeleted] = useState(false);

  async function getUserData() {
    try {
      const response = await axios.get(`http://178.172.173.84:5000/api/user/data/${userId}`)
      if (response.data.deleted) {
        setuserDeleted(true);
      }
      if (new Date(response.data.period) < new Date()) {
        await closeSubscription({ userId })
      }
      dispatch(saveUserData(response.data));
      socketIO.emit('login', userId);
      socketIO.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  async function getMyCargos() {
    try {
      const response = await axios.get(`http://178.172.173.84:5000/api/cargo/list/${userId}`)
      dispatch(saveCargosUserData(response.data));
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }
  async function getMyTransport() {
    try {
      const response = await axios.get(`http://178.172.173.84:5000/api/transport/list/${userId}`)
      dispatch(saveTransportsUserData(response.data));
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }
  async function getMyDialogs() {
    try {
      const response = await axios.get(`http://178.172.173.84:5000/api/dialog/${userId}`)
      dispatch(saveMyDialogs(response.data));
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  async function getNewMessages() {
    try {
      const unreadMessages = await axios.get(`http://178.172.173.84:5000/api/message/unread/${userId}`)
      if (unreadMessages.data.length > 0) {
        dispatch(saveCountUnreadMessages(unreadMessages.data.length));
        let newMessagesData = [];
        unreadMessages.data.forEach(el => {
          newMessagesData.push(el.dialogId)
        })
        const res = newMessagesData.reduce((acc, i) => {
          if (acc.hasOwnProperty(i)) {
            acc[i] += 1;
          } else {
            acc[i] = 1;
          }
          return acc;
        }, {})
        let countOfDialogs = res;
        dispatch(saveCountUnreadDialogs(countOfDialogs));
      }
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserData()
      getMyCargos()
      getMyTransport()
      getMyDialogs()
      getNewMessages()
      socketIO.on("new-dialog", (dialog) => {
        if (dialog.partner === userId) {
        }
      });
    }
  }, [])

  const selectedPage = useSelector(state => state.selectedPage.selectedPage);
  const burger = useSelector(state => state.burger.burger);
  return (
    <>
      {userDeleted ? <div className={styles.deleted}>Ваш профиль удален</div> :
        <>
          <main className={styles.main}>
            {!burger && <Sidebar />}
            {burger && <SidebarFull />}
            {((selectedPage === "userspage" && userRole === "Admin") || (selectedPage === "homepage" && userRole === "Admin")) && <HomePageAdmin />}
            {(selectedPage === "homepage" && userRole !== "Admin") && <HomePage />}
            {(selectedPage === "balancepage") && <BalancePage />}
            {(selectedPage === "mypage") && <UserPage onlineUsers={onlineUsers} />}
            {(selectedPage === "cargoSearch") && <SearchTable title={"Поиск грузов для перевозки"} />}
            {(selectedPage === "transportSearch") && <SearchTableTransport title={"Поиск транспорта для перевозки"} />}
            {(selectedPage === "transportRegistration") && <RegistrationTableTransport title={"Регистрация транспорта"} />}
            {(selectedPage === "cargoRegistration") && <RegistrationTable title={"Регистрация груза"} />}
            {(selectedPage === "servicesPrices") && <ServicesPrices />}
            {(selectedPage === "anotherUserPage") && <AnotherUserPage onlineUsers={onlineUsers} />}
            {(selectedPage === "usersInvoicePage") && <UsersInvoice />}
          </main>
          {(selectedPage === "cargoRegistration") && myCargoList.length > 0 && userId && <ResultsTable typeOfAction="registrationCargo" />}
          {(selectedPage === "transportRegistration") && myTransportList.length > 0 && userId && <ResultsTableTransport typeOfAction="registrationTransport" />}
          {(selectedPage === "cargoSearch") && foundCargo.length > 0 && userId && <ResultsTable typeOfAction="searchCargo" />}
          {(selectedPage === "transportSearch") && foundTransport.length > 0 && userId && <ResultsTableTransport typeOfAction="searchTransport" />}
          {(selectedPage === "cargoSearch") && foundCargo.length === 0 && notfoundCargo && userId && <div className={styles.notfound}>По заданным параметрам грузов не найдено</div>}
          {(selectedPage === "transportSearch") && foundTransport.length === 0 && notfoundTransport && userId && <div className={styles.notfound}>По заданным параметрам транспорта не найдено</div>}
          {(selectedPage === "cargoSearch") && foundCargo.length > 0 && currentItem && <Details currentID={currentItem} typeOfAction="searchCargo" />}
          {(selectedPage === "transportSearch") && foundTransport.length > 0 && currentItem && <DetailsTransport currentID={currentItem} typeOfAction="searchTransport" />}
          {(selectedPage === "cargoRegistration") && myCargoList.length > 0 && currentItem && <Details currentID={currentItem} typeOfAction="registrationCargo" />}
          {(selectedPage === "transportRegistration") && myTransportList.length > 0 && currentItem && <DetailsTransport currentID={currentItem} typeOfAction="registrationTransport" />}

          {chatIsOpen && <Chat username={userName} />}
        </>
      }
    </>
  )
}
export default MainRegisteredPage;