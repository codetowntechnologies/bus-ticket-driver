import API from '../../../api/api';

export function login(data) {
  return {
    type: 'LOGIN',
    payload: API.user.loginAPI(data)
  };
}

export function resumeUser(data) {
  return {
    type: 'RESUME_USER',
    payload: data
  };
}

export function getOtp(data) {
  return {
    type: 'GET_OTP',
    payload: API.user.getOtp(data)
  };
}

export function checkOtp(data) {
  return {
    type: 'CHECK_OTP',
    payload: API.user.checkOtp(data)
  };
}

export function updatePassword(data) {
  return {
    type: 'UPDATE_PASSWORD',
    payload: API.user.updatePassword(data)
  };
}

export function profileDetail(data) {
  return {
    type: 'PROFILE_DETAIL',
    payload: API.user.profileDetail(data)
  };
}

export function updateProfile(data) {
  return {
    type: 'UPDATE_PROFILE',
    payload: API.user.updateProfile(data)
  };
}

export function contactUs(data) {
  return {
    type: 'CONTACT_US',
    payload: API.user.contactUs(data)
  };
}