import styles from './update-location.module.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { closeEditLocationForm } from '../../../redux/reducers/edit-location-reducer';
import { updateTransportLocation } from '../../../http/transportApi';
import { saveTransportsUserData } from '../../../redux/reducers/transports-user-reducer';
import axios from "axios";

export function LocationUpdate({ transportId, text }) {

  const userData = useSelector(state => state.userData.userData);
  const initialValues = {
    location: text,
    transportId: transportId
  }

  const dispatch = useDispatch();

  async function getMyTransport() {
    try {
      const response = await axios.get(`http://178.172.173.84:5000/api/transport/list/${userData.id}`)
      dispatch(saveTransportsUserData(response.data));
    }
    catch (e) {
      console.log(e, "error")
      console.log(e.response?.data?.message)
    }
  }

  const onSubmit = async (values) => {
    await updateTransportLocation(values)
    getMyTransport()
    dispatch(closeEditLocationForm());
  }

  const formik = useFormik({
    initialValues,
    onSubmit,

  })

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.input_wrapper}>
          <div className={styles.input_box}>
            <input className={styles.input} type="text" id="location" name="location" onChange={formik.handleChange} value={formik.values.location} placeholder="Введите" />
          </div>
          <button type="submit" className={styles.button_long} >&#10003;</button>
        </div>
      </form>
    </div>

  )
}
export default LocationUpdate;