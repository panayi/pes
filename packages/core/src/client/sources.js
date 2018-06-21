import * as modelPaths from '../config/modelPaths';

/*
|--------------------------------------------------------------------------
| Write
|--------------------------------------------------------------------------
*/
export const create = async (firebase, data) => {
  const ref = await firebase.push(modelPaths.SOURCES.string, data);
  return ref.getKey();
};

export const update = (firebase, id, data) =>
  firebase.update(`/${modelPaths.SOURCES.string}/${id}`, data);

export const remove = (firebase, id) =>
  firebase.remove(`/${modelPaths.SOURCES.string}/${id}`);
