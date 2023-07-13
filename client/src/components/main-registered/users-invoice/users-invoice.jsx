/* eslint-disable react-hooks/exhaustive-deps */
import styles from './users-invoice.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openSelectedPage } from '../../../redux/reducers/selected-page-reducer';
import { setUsers } from '../../../redux/reducers/users-list-reducer';
import axios from "axios";
import { useEffect } from 'react';
import { saveCurrentSelectedUser } from '../../../redux/reducers/current-selected-user-reducer';
import { useMemo } from 'react';
import { Pagination } from '../../pagination';

export function UsersInvoice() {
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.users.users);
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  function goToUserPage(user) {
    dispatch(openSelectedPage("anotherUserPage"))
    dispatch(saveCurrentSelectedUser(user))
  }

  async function getAllUsers() {
    try {
      const response = await axios.get(`http://178.172.173.84:5000/api/user/invoice-list`)
      const resp = response.data.reverse();
      dispatch(setUsers(resp));
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allUsers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className={styles.home_wrapper}>
      <h2 className={`${styles.title} section__title `} >Список пользователей запросивших счет-фактуру на оплату</h2>
      {allUsers.length < 10 &&
        allUsers.map((user, index) => {
          if (user.role === "Admin") {
            return ""
          }
          return (
            <div className={`${styles.users__content}`} key={"n" + user.id} onClick={() => goToUserPage(user)}>
              {(user.role === "Юридическое лицо") ? `${user.orgname} ` : `${user.name} ${user.surname}`}
            </div>
          )
        })
      }

      {((allUsers.length > 10) && currentTableData) &&
        <>
          {currentTableData &&
            currentTableData.map((user, index) => {
              if (user.role === "Admin") {
                return ""
              }
              return (
                <div className={`${styles.users__content}`} key={"n" + user.id} onClick={() => goToUserPage(user)}>
                  {(user.role === "Юридическое лицо") ? `${user.orgname} ` : `${user.name} ${user.surname}`}
                </div>
              )
            })
          }
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={allUsers.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </>

      }
    </div >
  )
}
export default UsersInvoice;