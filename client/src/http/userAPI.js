import $host from './index.js';
import $authHost from './auth-http.js';

export const registration = async (dataform) => {
  const responce = await $host.post('api/user/registration', dataform)
  return responce
}

export const uploadAvatar = async (formData) => {
  const responce = await $host.post('api/user/avatar', formData)
  return responce
}

export const updateUserData = async (data) => {
  const responce = await $host.post('api/user/update', data)
  return responce
}

export const activationUser = async (data) => {
  const responce = await $authHost.post('api/user/activation', data)
  return responce
}

export const deleteUser = async (data) => {
  const responce = await $authHost.post('api/user/delete', data)
  return responce
}

export const addUserAccount = async (data) => {
  const responce = await $authHost.post('api/user/account', data)
  return responce
}

export const sendPasswordLink = async (data) => {
  const responce = await $host.post('api/user/passwordforgot', data)
  return responce
}

export const saveNewPassword = async (data) => {
  const responce = await $host.post('api/user/password/save', data)
  return responce
}

export const uploadInvoice = async (data) => {
  const responce = await $host.post('api/user/invoice', data)
  return responce
}

export const getInvoice = async (data) => {
  const responce = await $host.post('api/user/getinvoice', data)
  return responce
}
export const closeSubscription = async (data) => {
  const responce = await $host.post('api/user/close-subscription', data)
  return responce
}

export const getAllUsersAdmin = async () => {
  const responce = await $authHost.get('api/user/users')
  return responce
}