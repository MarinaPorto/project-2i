import $host from './index.js';

export const cargoRegistration = async (dataform) => {
  const responce = await $host.post('api/cargo/registration', dataform)
  return responce
}

export const cargoFind = async (dataform) => {
  const responce = await $host.get('api/cargo/filter', {
    params: {
      ...dataform
    }
  })
  return responce
}

export const cargoDelete = async (dataform) => {
  const responce = await $host.post('api/cargo/delete', dataform)
  return responce
}
