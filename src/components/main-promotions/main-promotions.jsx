import styles from './main-promotions.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from "swiper";
import 'swiper/css';
import { ModalPromo } from '../modal-promotions';
import CardMainPromo from '../card-main-promo/card-main-promo';
import { openModalPromo } from '../../redux/reducers/modal-promo';

export function MainPromo() {
  const dispatch = useDispatch();
  const modalPromo =  useSelector(state => state.modalPromo.modalPromo);
  function openModalPromoWindow() {
    dispatch(openModalPromo());
  }

  return (
    <div className={styles.promo_wrapper}>
      <div className="inner">
        <h2 className={`${styles.title} section__title`} >Акции и спецпредложения</h2>
        <div className={styles.promo__slider}>
          <div className={`${styles.prev} prev `}> &#60; </div>
          <div className={`${styles.next} next `}> &#62; </div>
          <Swiper
            spaceBetween={32}
            slidesPerView={1}
            modules={[Navigation]}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
              disabledClass: "swiper-button-disabled"
            }}
            breakpoints={{
              540: {
                slidesPerView: 2,
              },
              1100: {
                slidesPerView: 3,
              },
              1780: {
                slidesPerView: 4,
              },
            }}
          >
            <SwiperSlide>
              <CardMainPromo  click={openModalPromoWindow}
              period="3 месяца"
                title="Бесплатные тарифы"
                subtitle="В честь открытия сайта «iristrans.com» все тарифы бесплатны в течение 3 месяцев." />
            </SwiperSlide>
            <SwiperSlide>
              <CardMainPromo click={openModalPromoWindow} period="до 31 мая 2023 года"
                title="Название акции и спецпредложения"
                subtitle="Текст акции в две строки /полный текст открывается в модальном окне" />
            </SwiperSlide>
            <SwiperSlide>
              <CardMainPromo click={openModalPromoWindow} period="до 31 мая 2023 года"
                title="Название акции и спецпредложения"
                subtitle="Текст акции в две строки /полный текст открывается в модальном окне" />
            </SwiperSlide>
            <SwiperSlide>
              <CardMainPromo click={openModalPromoWindow} period="до 31 мая 2023 года"
                title="Название акции и спецпредложения"
                subtitle="Текст акции в две строки /полный текст открывается в модальном окне" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
{modalPromo &&  <ModalPromo />}
    </div >
  )
}
export default MainPromo;