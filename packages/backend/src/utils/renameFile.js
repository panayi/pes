const renameFile = (newName, fileName) => {
  const extension = fileName.split('.').pop();

  return extension === fileName ? newName : `${newName}.${extension}`;
};

export default renameFile;
