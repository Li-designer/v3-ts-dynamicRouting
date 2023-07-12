

export default async function useRequest(apiRequest: Function, data?: Object) {
  try {
    return await apiRequest({ ...data });
  } catch (e) {
    throw e;
  } finally {
  }
}
