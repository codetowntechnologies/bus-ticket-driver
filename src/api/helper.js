import axios from 'axios';

export async function getCall(url) {
  return axios
    .get(url, {headers: options})
    .then((response) => response)
    .catch((error) => error);
}

export function postCall(url, data) {
  var options = {'Content-Type': 'application/x-www-form-urlencoded'};
  let params = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    params.append(key, value);
  });

  return axios
    .post(url, params, {headers: options})
    .then((response) => response)
    .catch((error) => error);
}

export function deleteCall(url, data) {
  return axios
    .delete(url, data)
    .then((response) => {
      if (response.data.status == 'success') {
        return response.data.data;
      }
    })
    .catch((error) => {
      return error;
    });
}
