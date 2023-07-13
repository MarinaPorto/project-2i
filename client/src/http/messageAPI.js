import $host from './index.js';

export const createMessage = async (dataform) => {
  const responce = await $host.post('api/message/create', dataform)
  return responce
}
export const changeMessageStatus = async (dataform) => {
  const responce = await $host.post('api/message/status', dataform)
  return responce
}
