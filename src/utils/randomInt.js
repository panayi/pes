export default (min, max) => {
  const finalMin = Math.ceil(min);
  const finalMax = Math.floor(max);

  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (finalMax - finalMin + 1)) + finalMin;
};
