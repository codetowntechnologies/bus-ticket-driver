import {getCall, postCall, deleteCall} from './helper';
import apiUrls from './apiUrls';
import Store from '../store/createStore';

let userId;
Store.subscribe(() => {
  if (Store.getState().loginReducer.user.id) {
    userId = Store.getState().loginReducer.user.id;
  }
});
export default API = {
  user: {
    loginAPI: (data) => postCall(apiUrls.login, data),
    getOtp: (data) => postCall(apiUrls.getOtp, data),
    checkOtp: (data) => postCall(apiUrls.checkOtp, data),
    updatePassword: (data) => postCall(apiUrls.updatePassword, data),
    profileDetail: (data) => postCall(apiUrls.profileDetail, data),
    updateProfile: (data) => postCall(apiUrls.updateProfile, data),
    contactUs: (data) => postCall(apiUrls.contactUs, data),
  },
  busRoute: {
    currentTripData: () => postCall(apiUrls.currentTripData, {user_id: 14}),
    saveDriverLocation: (data) => postCall(apiUrls.saveDriverLocation, data),
    changeDriveringStatus: (data) =>
      postCall(apiUrls.changeDriveringStatus, data),
  },
  breakdown: {
    breakdown: (data) => postCall(apiUrls.breakdown, data),
  },
  more: {
    inbox: () => postCall(apiUrls.inbox, {user_id: userId}),
  },
};
