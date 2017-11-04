export const POSTS_ENDPOINT = `${process.env.LEGACY_PESPOSA_BASE_URL}/posts/json/${process.env.LEGACY_PESPOSA_TOKEN}`;
export const POST_IDS_ENDPOINT = `${POSTS_ENDPOINT}?ids`;

export const getPostUrl = (id, category) => (
  `${process.env.LEGACY_PESPOSA_BASE_URL}/post/json/${process.env.LEGACY_PESPOSA_TOKEN}/${category}/${id}`
);
