export default (newName, fileName) => {
  const extension = fileName.split('.').pop();

  return extension === fileName ? newName : `${newName}.${extension}`;
};
