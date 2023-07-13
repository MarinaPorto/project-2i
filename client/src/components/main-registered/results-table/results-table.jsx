/* eslint-disable react-hooks/exhaustive-deps */
import styles from './results-table.module.css';
import { saveCurrentID } from '../../../redux/reducers/current-id-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useState } from 'react';
import { Pagination } from '../../pagination';
import { cargoDelete } from '../../../http/cargoApi';
import attentionIcon from './images/icon-attention.png';
export function ResultsTable(props) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userData);
  const myCargoList = useSelector(state => state.cargoUsers.cargoUser);
  const foundCargo = useSelector(state => state.cargoFound.cargoFound);
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  let [resultsDataRegistration, setResultsDataRegistration] = useState((props.typeOfAction === "registrationCargo") ? myCargoList : "");
  let resultsDataSearch = (props.typeOfAction === "searchCargo") ? foundCargo : ""
  let resultsData = (props.typeOfAction === "searchCargo") ? resultsDataSearch : resultsDataRegistration
  function dateParse(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if (month < 10) {
      month = `0${month}`;
      return `${day}.${month}.${year}`;
    }
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return resultsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const deleteCurrenCargo = async (cargoId, e) => {
    const response = await cargoDelete({ cargoId })
    if (response.statusText === "OK") {
      setResultsDataRegistration(resultsDataRegistration.filter(cargo => cargo.id !== cargoId))
    } else {
    }
  }

  return (
    <div className={styles.payment}>
      <section className={`${styles.block} ${styles.block__data} `}>
        <div className={` ${styles.block__content_payment} ${styles.block__header}`}>
          <div className={styles.payment_title}>Страны</div>
          <div className={styles.payment_title}>Дата</div>
          <div className={styles.payment_title}>Транспорт</div>
          <div className={styles.payment_title}>Откуда</div>
          <div className={styles.payment_title}>Куда</div>
          <div className={styles.payment_title}>Груз</div>
          <div className={styles.payment_title}>Оплата</div>
          <div className={styles.payment_title}>Контакты</div>
        </div>
        {resultsData.length < 10 &&
          resultsData.map((cargo, index) => {
            return (
              <div className={`${styles.block__content} ${styles.block__content_payment} `} key={index + cargo.id} onClick={() => dispatch(saveCurrentID(cargo.id))}>
                <div className={styles.payment_text}>{cargo.countryfrom} - {cargo.countryto}</div>
                <div className={styles.payment_text}>
                  {(cargo.calendar !== null) ? dateParse(cargo.calendar) : "-"}
                </div>
                <div className={styles.payment_text}>
                  {(cargo.transporttype && cargo.transporttype.length > 0) ?
                    cargo.transporttype.map((transport, index) => {
                      if (index === cargo.transporttype.length - 1) {
                        return (
                          <span key={index + transport.id}>{transport.name || transport.value} </span>
                        )
                      }
                      return (
                        <span key={index + transport.id}>{transport.name || transport.value}, </span>
                      )
                    })
                    : <div>-</div>
                  }
                </div>
                <div className={styles.payment_text}>{cargo.cityfrom}</div>
                <div className={styles.payment_text}>{cargo.cityto}</div>
                <div className={styles.payment_text}>
                  {(cargo.danger) && <span>{cargo.danger} </span>}
                  {(cargo.weighMax > 0) && <span>{cargo.weighMax} т {(cargo.volumeMax > 0) && ", "} </span>}
                  {(cargo.volumeMax > 0) && <span>{`${cargo.volumeMax}`}  м <sup><small>3</small></sup>, </span>}
                  {((cargo.long > 0) || (cargo.weighMax > 0) || (cargo.heightMax > 0)) &&
                    <p> габариты:
                      {(cargo.long > 0) && <span> д. {`${cargo.long}`} м. </span>}
                      {(cargo.weighMax > 0) && <span> ш. {`${cargo.weighMax}`} м.  </span>}
                      {(cargo.heightMax > 0) && <span> в. {`${cargo.heightMax}`}  м.</span>}
                    </p>
                  }
                  {((cargo.distancefrom > 0) || (cargo.distanceto > 0)) &&
                    <p> расстояние:
                      {(cargo.distancefrom > 0) && <span> от {`${cargo.distancefrom}`} км. </span>}
                      {(cargo.distanceto > 0) && <span> до {`${cargo.distanceto}`} км.  </span>}
                    </p>
                  }
                  {(cargo.loadingtype && cargo.loadingtype.length > 0) &&
                    <p>загрузка:
                      {cargo.loadingtype.map((loading, index) => {
                        if (index === cargo.loadingtype.length - 1) {
                          return (
                            <span key={index + loading.id}> {loading.name || loading.value} </span>
                          )
                        }
                        return (
                          <span key={index + loading.id}> {loading.name || loading.value}, </span>
                        )
                      })}
                    </p>
                  }
                  {(cargo.doctype && cargo.doctype.length > 0) &&
                    <p>документы:
                      {cargo.doctype.map((doc, index) => {
                        if (index === cargo.doctype.length - 1) {
                          return (
                            <span key={index + doc.id}> {doc.name || doc.value} </span>
                          )
                        }
                        return (
                          <span key={index + doc.id}> {doc.name || doc.value},  </span>
                        )
                      })}
                    </p>
                  }
                </div>
                <div className={styles.payment_text}>
                  {(cargo.paymenttype && cargo.paymenttype.length > 0) ?
                    cargo.paymenttype.map((payment, index) => {
                      if (index === cargo.paymenttype.length - 1) {
                        return (
                          <span key={index + payment.id}>{payment.name || payment.value}</span>
                        )
                      }
                      return (
                        <span key={index + payment.id}>{payment.name || payment.value}, </span>
                      )
                    })
                    : <div>-</div>
                  }
                </div>
                {props.typeOfAction === "searchCargo" &&
                  <>
                    {((props.typeOfAction === "searchCargo" && userData.isPaid) || (props.typeOfAction === "searchCargo" && userData.role === "Admin")) ?
                      <div className={styles.payment_text}>
                        <p>{(cargo.user.role === "Юридическое лицо") ? `${cargo.user.orgname} ` : `${cargo.user.name} ${cargo.user.surname}`}
                          {(cargo.user.role === "Юридическое лицо") ? `${cargo.user.name}` : ""}
                        </p> <p>{cargo.user.number} </p></div> : < div className={`${styles.payment_text} ${styles.payment_text_attention} `} >
                        <img src={attentionIcon} alt="attention" className={styles.img_attention} />
                        Контактная информация не доступна в вашем тарифном плане, оформите подписку
                      </div>}
                  </>
                }
                {(props.typeOfAction === "registrationCargo") &&
                  <div className={styles.payment_text}>
                    <p>{(userData.role === "Юридическое лицо") ? `${userData.orgname}, ` : `${userData.name} ${userData.surname},`}
                      {(userData.role === "Юридическое лицо") ? `${userData.name}` : ""}</p>
                    <p>{userData.number} </p>
                    <div className={styles.delete} onClick={() => deleteCurrenCargo(cargo.id)}>Удалить запись</div>
                  </div>
                }
              </div>
            )
          })}
        {((resultsData.length > 10) && currentTableData) &&
          <>
            {currentTableData &&
              currentTableData.map((cargo, index) => {
                return (
                  <div className={`${styles.block__content} ${styles.block__content_payment} `} key={index + cargo.id} onClick={() => dispatch(saveCurrentID(cargo.id))}>
                    <div className={styles.payment_text}>{cargo.countryfrom} - {cargo.countryto}</div>
                    <div className={styles.payment_text}>
                      {(cargo.calendar !== null) ? dateParse(cargo.calendar) : "-"}
                    </div>
                    <div className={styles.payment_text}>
                      {(cargo.transporttype && cargo.transporttype.length > 0) ?
                        cargo.transporttype.map((transport, index) => {
                          if (index === cargo.transporttype.length - 1) {
                            return (
                              <span key={index + transport.id}>{transport.name || transport.value} </span>
                            )
                          }
                          return (
                            <span key={index + transport.id}>{transport.name || transport.value}, </span>
                          )
                        })
                        : <div>-</div>
                      }
                    </div>
                    <div className={styles.payment_text}>{cargo.cityfrom}</div>
                    <div className={styles.payment_text}>{cargo.cityto}</div>
                    <div className={styles.payment_text}>
                      {(cargo.danger) && <span>{cargo.danger} </span>}
                      {(cargo.weighMax > 0) && <span>{cargo.weighMax} т {(cargo.volumeMax > 0) && ", "} </span>}
                      {(cargo.volumeMax > 0) && <span>{`${cargo.volumeMax}`}  м <sup><small>3</small></sup>, </span>}
                      {((cargo.long > 0) || (cargo.weighMax > 0) || (cargo.heightMax > 0)) &&
                        <p> габариты:
                          {(cargo.long > 0) && <span> д. {`${cargo.long}`} м. </span>}
                          {(cargo.weighMax > 0) && <span> ш. {`${cargo.weighMax}`} м.  </span>}
                          {(cargo.heightMax > 0) && <span> в. {`${cargo.heightMax}`}  м.</span>}
                        </p>
                      }
                      {((cargo.distancefrom > 0) || (cargo.distanceto > 0)) &&
                        <p> расстояние:
                          {(cargo.distancefrom > 0) && <span> от {`${cargo.distancefrom}`} км. </span>}
                          {(cargo.distanceto > 0) && <span> до {`${cargo.distanceto}`} км.  </span>}

                        </p>
                      }
                      {(cargo.loadingtype && cargo.loadingtype.length > 0) &&
                        <p>загрузка:
                          {cargo.loadingtype.map((loading, index) => {
                            if (index === cargo.loadingtype.length - 1) {
                              return (
                                <span key={index + loading.id}> {loading.name || loading.value} </span>
                              )
                            }
                            return (
                              <span key={index + loading.id}> {loading.name || loading.value}, </span>
                            )
                          })}
                        </p>
                      }
                      {(cargo.doctype && cargo.doctype.length > 0) &&
                        <p>документы:
                          {cargo.doctype.map((doc, index) => {
                            if (index === cargo.doctype.length - 1) {
                              return (
                                <span key={index + doc.id}> {doc.name || doc.value} </span>
                              )
                            }
                            return (
                              <span key={index + doc.id}> {doc.name || doc.value},  </span>
                            )
                          })}
                        </p>
                      }
                    </div>
                    <div className={styles.payment_text}>
                      {(cargo.paymenttype && cargo.paymenttype.length > 0) ?
                        cargo.paymenttype.map((payment, index) => {
                          if (index === cargo.paymenttype.length - 1) {
                            return (
                              <span key={index + payment.id}>{payment.name || payment.value}</span>
                            )
                          }
                          return (
                            <span key={index + payment.id}>{payment.name || payment.value}, </span>
                          )
                        })
                        : <div>-</div>
                      }
                    </div>
                    {props.typeOfAction === "searchCargo" &&
                      <>
                        {((props.typeOfAction === "searchCargo" && userData.isPaid) || (props.typeOfAction === "searchCargo" && userData.role === "Admin")) ?
                          <div className={styles.payment_text}>
                            <p>{(cargo.user.role === "Юридическое лицо") ? `${cargo.user.orgname} ` : `${cargo.user.name} ${cargo.user.surname}`}
                              {(cargo.user.role === "Юридическое лицо") ? `${cargo.user.name}` : ""}
                            </p> <p>{cargo.user.number} </p></div> : < div className={`${styles.payment_text} ${styles.payment_text_attention} `} >
                            <img src={attentionIcon} alt="attention" className={styles.img_attention} />
                            Контактная информация не доступна в вашем тарифном плане, оформите подписку
                          </div>}
                      </>
                    }
                    {(props.typeOfAction === "registrationCargo") &&
                      <div className={styles.payment_text}>
                        <p>{(userData.role === "Юридическое лицо") ? `${userData.orgname}, ` : `${userData.name} ${userData.surname},`}
                          {(userData.role === "Юридическое лицо") ? `${userData.name}` : ""}</p>
                        <p>{userData.number} </p></div>
                    }
                  </div>
                )
              })}
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={resultsData.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </>
        }
      </section>
    </div>
  )
}
export default ResultsTable;