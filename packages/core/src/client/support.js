/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const remove = async (firebase, id) => firebase.remove(`/support/${id}`);