import * as R from 'ramda';

const mapLegacyToNewCategory = (categoryParent, categoryChild) => {
  if (categoryParent === 'real_estate') {
    return 'real-estate';
  }

  if (categoryParent === 'personals') {
    return 'personals';
  }

  if (categoryParent === 'vehicles' && !categoryChild) {
    return 'cars';
  }

  if (categoryChild === 'cars') {
    return 'cars';
  }

  if (categoryParent === 'vehicles') {
    return 'other-vehicles-and-parts';
  }

  if (categoryChild === 'home_and_garden') {
    return 'home-and-garden';
  }

  if (
    R.contains(categoryChild, [
      'home_appliances',
      'electronics',
      'computing',
      'cell_phones',
      'cameras_and_accessories',
    ])
  ) {
    return 'electronics';
  }

  if (
    R.contains(categoryChild, [
      'hunting_stuff',
      'fishing_diving_stuff',
      'musical_instruments',
      'toys_and_hobbies',
      'video_games',
      'sporting_goods',
      'antiques_collectibles',
      'books',
    ])
  ) {
    return 'sports-and-leisure';
  }

  if (R.contains(categoryChild, ['jewelry_watches', 'clothing'])) {
    return 'fashion';
  }

  return 'other';
};

export default mapLegacyToNewCategory;
