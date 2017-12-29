export const AD_INITIAL_STATE = {
  title: '',
  price: null,
  body: '',
  category: '',
};
export const AD_FORM_MODEL_KEY = 'ad';
export const AD_FORM_MODEL_PATH = `forms.${AD_FORM_MODEL_KEY}`;
export const MAXIMUM_IMAGES_PER_AD = 5;

export const AD_CREATE_IDLE_STATE = null;
export const AD_CREATE_PENDING_STATE = 'pending';
export const AD_CREATE_COMPLETED_STATE = 'completed';
