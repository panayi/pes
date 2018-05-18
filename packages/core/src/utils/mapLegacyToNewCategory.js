import * as R from 'ramda';

export const parentCategories = [
  'real-estate',
  'vehicles',
  'jobs',
  'pets',
  'for-sale',
  'classes',
  'community',
  'personals',
];

const mapChildToParentCategory = {
  homes: 'real_estate',
  apartments: 'real_estate',
  'land-plots': 'real_estate',
  'offices-commercial-space': 'real_estate',
  'looking-for-roommates': 'real_estate',
  'education-teaching-jobs': 'jobs',
  'sales-jobs': 'jobs',
  'hotel-tourist-jobs': 'jobs',
  'customer-service-jobs': 'jobs',
  'marketing-administration-jobs': 'jobs',
  'advertising-public-relation-jobs': 'jobs',
  'accounting-finance-jobs': 'jobs',
  'restaurant-food-service-jobs': 'jobs',
  'construction-development-jobs': 'jobs',
  'internet-based-jobs': 'jobs',
  'engineering-architecture-jobs': 'jobs',
  'hairdresser-beauty-jobs': 'jobs',
  'manual-labor-jobs': 'jobs',
  'secretarial-jobs': 'jobs',
  'transportation-delivery-jobs': 'jobs',
  'other-jobs': 'jobs',
  dogs: 'pets',
  cats: 'pets',
  fish: 'pets',
  birds: 'pets',
  horses: 'pets',
  reptiles: 'pets',
  'other-pets': 'pets',
  cars: 'vehicles',
  'parts-and-accessories': 'vehicles',
  motorcycles: 'vehicles',
  boats: 'vehicles',
  'trucks-commercial': 'vehicles',
  caravans: 'vehicles',
  'other-vehicles': 'vehicles',
  'language-classes': 'classes',
  'computers-multimedia-classes': 'classes',
  'music-classes': 'classes',
  'dance-classes': 'classes',
  'other-classes': 'classes',
  'seminars-conferences': 'community',
  'community-activities': 'community',
  events: 'community',
  volunteers: 'community',
  'lost-and-found': 'community',
  'home-appliances': 'for_sale',
  electronics: 'for_sale',
  'home-and-garden': 'for_sale',
  'hunting-stuff': 'for_sale',
  'fishing-diving-stuff': 'for_sale',
  computing: 'for_sale',
  'cell-phones': 'for_sale',
  'cameras-and-accessories': 'for_sale',
  books: 'for_sale',
  'musical-instruments': 'for_sale',
  'jewelry-watches': 'for_sale',
  'health-and-beauty': 'for_sale',
  clothing: 'for_sale',
  food: 'for_sale',
  'toys-and-hobbies': 'for_sale',
  'video-games': 'for_sale',
  'sporting-goods': 'for_sale',
  'antiques-collectibles': 'for_sale',
  'everything-else': 'for_sale',
  'men-looking-for-women': 'personals',
  'women-looking-for-men': 'personals',
  'men-looking-for-men': 'personals',
  'women-looking-for-women': 'personals',
  'astrology-medium': 'personals',
  massage: 'personals',
};

export const childCategories = R.keys(mapChildToParentCategory);

const mapLegacyToNewCategory = (categoryParent, categoryChild) => {
  const finalCategoryParent =
    categoryParent || mapChildToParentCategory[categoryChild];

  if (finalCategoryParent === 'real_estate') {
    return 'real-estate';
  }

  if (finalCategoryParent === 'personals') {
    return 'personals';
  }

  if (finalCategoryParent === 'vehicles' && !categoryChild) {
    return 'cars';
  }

  if (categoryChild === 'cars') {
    return 'cars';
  }

  if (finalCategoryParent === 'vehicles') {
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
    return 'fashion-and-accessories';
  }

  return 'other';
};

export default mapLegacyToNewCategory;
