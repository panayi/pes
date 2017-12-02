export const ADS_ENDPOINT = `${
  process.env.LEGACY_PESPOSA_BASE_URL
}/posts/json/${process.env.LEGACY_PESPOSA_TOKEN}`;
export const AD_IDS_ENDPOINT = `${ADS_ENDPOINT}?ids`;

export const getAdUrl = (id, category) =>
  `${process.env.LEGACY_PESPOSA_BASE_URL}/post/json/${
    process.env.LEGACY_PESPOSA_TOKEN
  }/${category}/${id}`;
