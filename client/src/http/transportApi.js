import $host from './index.js';

export const transportRegistration = async (dataform) => {
  const responce = await $host.post('api/transport/registration', dataform)
  return responce
}

export const transportFind = async (dataform) => {
  const responce = await $host.get('api/transport/filter', {
    params: {
      ...dataform
    }
  })
  return responce
}

export const updateTransportLocation = async (data) => {
  const responce = await $host.post('api/transport/update', data)
  return responce
}

export const deleteTransport = async (data) => {
  const responce = await $host.post('api/transport/delete', data)
  return responce
}
