/* eslint-disable react-hooks/exhaustive-deps */
import styles from './results-table-transport.module.css';
import { saveCurrentID } from '../../../redux/reducers/current-id-reducer';
import { useSelector, useDispatch } from 'react-redux';
import attentionIcon from './images/icon-attention.png';
import { useMemo, useState } from 'react';
import { Pagination } from '../../pagination';
import { LocationUpdate } from '../update-location';
import { deleteTransport } from '../../../http/transportApi';
import { openEditLocationForm } from '../../../redux/reducers/edit-location-reducer';
import pencil from "./images/pencil.svg";


export function ResultsTableTransport(props) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userData);
  const myTransportList = useSelector(state => state.transportsUser.transportsUser);
  const foundTransport = useSelector(state => state.transportFound.transportFound);
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState(null);
  const editForm = useSelector(state => state.editLocationForm.editLocationForm);
  let [resultsDataRegistration, setResultsDataRegistration] = useState((props.typeOfAction === "registrationTransport") ? myTransportList : "");
  let resultsDataSearch = (props.typeOfAction === "searchTransport") ? foundTransport : ""
  let resultsData = (props.typeOfAction === "searchTransport") ? resultsDataSearch : resultsDataRegistration
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return resultsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const deleteCurrenTransport = async (transportId, e) => {
    const response = await deleteTransport({ transportId })
    if (response.statusText === "OK") {
      setResultsDataRegistration(resultsDataRegistration.filter(transport => transport.id !== transportId))
    } else {
    }
  }

  return (
    <div className={styles.payment}>
      <section className={`${styles.block} ${styles.block__data} `}>
        <div className={` ${styles.block__content_payment} ${styles.block__header}`}>
          <div className={styles.payment_title}>Направления</div>
          <div className={styles.payment_title}>Месторасположение</div>
          <div className={styles.payment_title}>Транспорт</div>
          <div className={styles.payment_title}>Груз</div>
          <div className={styles.payment_title}>Оплата</div>
          <div className={styles.payment_title}>Контакты</div>
        </div>
        {resultsData.length < 10 &&
          resultsData.map((transport, index) => {
            return (
              <div className={`${styles.block__content} ${styles.block__content_payment} `} key={index + transport.id} onClick={() => dispatch(saveCurrentID(transport.id))}>
                <div className={styles.payment_text}>{transport.countryfrom}</div>
                <div className={`${styles.payment_text} ${styles.location}`}>
                  {((props.typeOfAction === "registrationTransport" && editForm && location === index)) ? <LocationUpdate transportId={transport.id} text={transport.location} /> :
                    <>
                      {transport.location}
                      {props.typeOfAction === "registrationTransport" &&
                        <div className={`${styles.data__edit}`} >
                          <img src={pencil} alt="edit" id={index} onClick={(e) => {
                            setLocation(+e.target.id);
                            dispatch(openEditLocationForm());
                          }} />
                        </div>
                      }
                    </>
                  }
                </div>
                <div className={styles.payment_text}>
                  {(transport.transportTypeTransport && transport.transportTypeTransport.length > 0) ?
                    transport.transportTypeTransport.map((transportTypeTransport, index) => {
                      if (index === transport.transportTypeTransport.length - 1) {
                        return (
                          <span key={index + transportTypeTransport.id}>{transportTypeTransport.name || transportTypeTransport.value} </span>
                        )
                      }
                      return (
                        <span key={index + transportTypeTransport.id}>{transportTypeTransport.name || transportTypeTransport.value}, </span>
                      )
                    })
                    : <div>-</div>
                  }
                </div>
                <div className={styles.payment_text}>
                  {(transport.danger) && <span>{transport.danger} </span>}
                  {(transport.weighMax > 0) && <span>{transport.weighMax} т, </span>}
                  {((transport.long > 0) || (transport.weighMax > 0) || (transport.heightMax > 0)) &&
                    <p> габариты:
                      {(transport.long > 0) && <span> д. {`${transport.long}`} м. </span>}
                      {(transport.weighMax > 0) && <span> ш. {`${transport.weighMax}`} м.  </span>}
                      {(transport.heightMax > 0) && <span> в. {`${transport.heightMax}`}  м.</span>}
                    </p>
                  }
                  {(transport.loadingTypeTransport
                    && transport.loadingTypeTransport
                      .length > 0) &&
                    <p>загрузка:
                      {transport.loadingTypeTransport
                        .map((loading, index) => {
                          if (index === transport.loadingTypeTransport.length - 1) {
                            return (
                              <span key={index + loading.id}> {loading.name || loading.value}, </span>
                            )
                          }
                          return (
                            <span key={index + loading.id}> {loading.name || loading.value} </span>
                          )
                        })}
                    </p>
                  }
                  {(transport.docTypeTransport && transport.docTypeTransport.length > 0) &&
                    <p>документы:
                      {transport.docTypeTransport.map((doc, index) => {
                        if (index === transport.docTypeTransport.length - 1) {
                          return (
                            <span key={index + doc.id}> {doc.name || doc.value}  </span>
                          )
                        }
                        return (
                          <span key={index + doc.id}> {doc.name || doc.value},  </span>
                        )
                      })}
                    </p>
                  }</div>
                <div className={styles.payment_text}>
                  {(transport.paymentTypeTransport
                    && transport.paymentTypeTransport.length > 0) ?
                    transport.paymentTypeTransport
                      .map((payment, index) => {
                        if (index === transport.paymentTypeTransport
                          .length - 1) {
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
                {props.typeOfAction === "searchTransport" &&
                  <>
                    {((props.typeOfAction === "searchTransport" && userData.isPaid) || (props.typeOfAction === "searchTransport" && userData.role === "Admin")) ?
                      <div className={styles.payment_text}>
                        <p>{(transport.user.role === "Юридическое лицо") ? `${transport.user.orgname} ` : `${transport.user.name} ${transport.user.surname}`}
                          {(transport.user.role === "Юридическое лицо") ? `${transport.user.name}` : ""}
                        </p> <p>{transport.user.number} </p></div> : < div className={`${styles.payment_text} ${styles.payment_text_attention} `} >
                        <img src={attentionIcon} alt="attention" className={styles.img_attention} />
                        Контактная информация не доступна в вашем тарифном плане, оформите подписку
                      </div>}
                  </>
                }
                {(props.typeOfAction === "registrationTransport") &&
                  <div className={styles.payment_text}>
                    <p>{(userData.role === "Юридическое лицо") ? `${userData.orgname}, ` : `${userData.name} ${userData.surname},`}
                      {(userData.role === "Юридическое лицо") ? `${userData.name}` : ""}</p>
                    <p>{userData.number} </p>
                    <div className={styles.delete} onClick={() => deleteCurrenTransport(transport.id)}>Удалить запись</div>
                  </div>
                }
              </div>
            )
          })}
        {((resultsData.length > 10) && currentTableData) &&
          <>
            {currentTableData &&
              currentTableData.map((transport, index) => {
                return (
                  <div className={`${styles.block__content} ${styles.block__content_payment} `} key={index + transport.id} onClick={() => dispatch(saveCurrentID(transport.id))}>
                    <div className={styles.payment_text}>{transport.countryfrom}</div>
                    <div className={styles.payment_text}>{transport.location}</div>
                    <div className={styles.payment_text}>
                      {(transport.transportTypeTransport && transport.transportTypeTransport.length > 0) ?
                        transport.transportTypeTransport.map((transportTypeTransport, index) => {
                          if (index === transport.transportTypeTransport.length - 1) {
                            return (
                              <span key={index + transportTypeTransport.id}>{transportTypeTransport.name || transportTypeTransport.value} </span>
                            )
                          }
                          return (
                            <span key={index + transportTypeTransport.id}>{transportTypeTransport.name || transportTypeTransport.value}, </span>
                          )

                        })
                        : <div>-</div>
                      }
                    </div>
                    <div className={styles.payment_text}>
                      {(transport.danger) && <span>{transport.danger} </span>}
                      {(transport.weighMax > 0) && <span>{transport.weighMax} т, </span>}
                      {((transport.long > 0) || (transport.weighMax > 0) || (transport.heightMax > 0)) &&
                        <p> габариты:
                          {(transport.long > 0) && <span> д. {`${transport.long}`} м. </span>}
                          {(transport.weighMax > 0) && <span> ш. {`${transport.weighMax}`} м.  </span>}
                          {(transport.heightMax > 0) && <span> в. {`${transport.heightMax}`}  м.</span>}
                        </p>
                      }
                      {(transport.loadingTypeTransport
                        && transport.loadingTypeTransport
                          .length > 0) &&
                        <p>загрузка:
                          {transport.loadingTypeTransport
                            .map((loading, index) => {
                              if (index === transport.loadingTypeTransport.length - 1) {
                                return (
                                  <span key={index + loading.id}> {loading.name || loading.value}, </span>
                                )
                              }
                              return (
                                <span key={index + loading.id}> {loading.name || loading.value} </span>
                              )
                            })}
                        </p>
                      }
                      {(transport.docTypeTransport && transport.docTypeTransport.length > 0) &&
                        <p>документы:
                          {transport.docTypeTransport.map((doc, index) => {
                            if (index === transport.docTypeTransport.length - 1) {
                              return (
                                <span key={index + doc.id}> {doc.name || doc.value}  </span>
                              )
                            }
                            return (
                              <span key={index + doc.id}> {doc.name || doc.value},  </span>
                            )
                          })}
                        </p>
                      }</div>
                    <div className={styles.payment_text}>
                      {(transport.paymentTypeTransport
                        && transport.paymentTypeTransport.length > 0) ?
                        transport.paymentTypeTransport
                          .map((payment, index) => {
                            if (index === transport.paymentTypeTransport
                              .length - 1) {
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
                    {props.typeOfAction === "searchTransport" &&
                      <>
                        {((props.typeOfAction === "searchTransport" && userData.isPaid) || (props.typeOfAction === "searchTransport" && userData.role === "Admin")) ?
                          <div className={styles.payment_text}>
                            <p>{(transport.user.role === "Юридическое лицо") ? `${transport.user.orgname} ` : `${transport.user.name} ${transport.user.surname}`}
                              {(transport.user.role === "Юридическое лицо") ? `${transport.user.name}` : ""}
                            </p> <p>{transport.user.number} </p></div> : < div className={`${styles.payment_text} ${styles.payment_text_attention} `} >
                            <img src={attentionIcon} alt="attention" className={styles.img_attention} />
                            Контактная информация не доступна в вашем тарифном плане, оформите подписку
                          </div>}
                      </>
                    }
                    {(props.typeOfAction === "registrationTransport") &&
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
      </section >
    </div >
  )
}
export default ResultsTableTransport;