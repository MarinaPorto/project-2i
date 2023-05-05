import styles from './main-clients.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/css';
import company from "./images/company-logo.jpg"
import CardMainClients from '../card-main-clients/card-main-clients';

export function MainClients() {
  return (
    <div className={styles.clients_wrapper}>
      <div className="inner">
        <h2 className={`${styles.title} section__title`} >Среди наших клиентов</h2>
        <div className={styles.clients__slider}>
          <div className={`${styles.prev} prev-clients `}> &#60; </div>
          <div className={`${styles.next} next-clients`}> &#62; </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            modules={[Navigation]}
            navigation={{
              nextEl: ".next-clients",
              prevEl: ".prev-clients",
              disabledClass: "swiper-button-disabled"
            }}
            breakpoints={{
              700: {
                slidesPerView: 3,
              },
              1236: {
                slidesPerView: 4,
                spaceBetween: 32
              },
              1790: {
                slidesPerView: 6,
              }
            }}
          >
            <SwiperSlide>
              <CardMainClients img={company} text="Название компании"/>
            </SwiperSlide>
            <SwiperSlide>
              <CardMainClients img={company} text="Название компании"/>
            </SwiperSlide>
            <SwiperSlide>
              <CardMainClients img={company} text="Название компании"/>
            </SwiperSlide>
            <SwiperSlide>
              <CardMainClients img={company} text="Название компании"/>
            </SwiperSlide>
            <SwiperSlide>
              <CardMainClients img={company} text="Название компании"/>
            </SwiperSlide>
            <SwiperSlide>
              <CardMainClients img={company} text="Название компании"/>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div >
  )
}
export default MainClients;