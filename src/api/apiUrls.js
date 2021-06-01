import {BASE_URL} from './constants';

const urlBuilder = (url) => {
  return `${BASE_URL}${url}`;
};
export default API_URL = {
  login: urlBuilder('login'),
  inbox: urlBuilder(`inbox_message`),
  breakdown: urlBuilder('save_breakdown'),
  getOtp: urlBuilder('forgot_password'),
  checkOtp: urlBuilder('check_otp'),
  updatePassword: urlBuilder('update_password'),
  profileDetail: urlBuilder('profile_detail'),
  currentTripData: urlBuilder('check_current_trip'),
  updateProfile: urlBuilder('update_profile'),
  saveDriverLocation: urlBuilder('save_driver_location'),
  changeDriveringStatus: urlBuilder('change_status'),
  contactUs: urlBuilder('contact_us'),
};
