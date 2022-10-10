import {
  v4 as uuidv4
} from 'uuid';

export const genUuid = () => {
  let uuid_token = window.localStorage.getItem("UUIDTOKEN");
  if (!uuid_token) {
    uuid_token = uuidv4()
    window.localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token
}