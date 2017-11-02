export default (uploadRes) => {
  // upload response from Firebase's storage upload
  const { metadata: { name, fullPath, downloadURLs } } = uploadRes;
  // default factory includes name, fullPath, downloadURL
  return {
    name,
    fullPath,
    downloadURL: downloadURLs[0],
  };
};
