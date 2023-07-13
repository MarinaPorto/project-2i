import $host from './index.js';

export const createDialog = async (dataform) => {
  const responce = await $host.post('api/dialog/create', dataform)
  return responce
}
