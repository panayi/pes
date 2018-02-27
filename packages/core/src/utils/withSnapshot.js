import isReference from './isReference';

// withSnapshot :: Function -> Pointer -> Any
// Pointer = Reference | Snapshot
const withSnapshot = callback => async pointer => {
  if (isReference(pointer)) {
    const snapshot = await pointer.once('value');
    return callback(snapshot);
  }

  // Else it's a snapshot
  return callback(pointer);
};

export default withSnapshot;
