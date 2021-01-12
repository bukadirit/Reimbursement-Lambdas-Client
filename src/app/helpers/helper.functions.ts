import { Reimbursement } from './../models/reimbursement';
import { User } from '../models/user';

export const getUser = () => {
  let user: User = new User(
    localStorage.getItem('email'),
    localStorage.getItem('firstName'),
    parseInt(localStorage.getItem('id')),
    localStorage.getItem('lastName'),
    null,
    localStorage.getItem('role'),
    localStorage.getItem('username')
  );
  return user;
};

export const setUser = (user: User) => {
  localStorage.setItem('username', user.username);
  localStorage.setItem('email', user.email);
  localStorage.setItem('id', user.id.toString());
  localStorage.setItem('role', user.role);
  localStorage.setItem('firstName', user.firstName);
  localStorage.setItem('lastName', user.lastName);
};

export const removeUser = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('role');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
};

export const validateLogin = (username: string, password: string) => {
  if (username != undefined && password != undefined) {
    if (username.length > 0 && password.length > 0) {
      return true;
    }
    return false;
  } else {
    return false;
  }
};

export const getErrors = (error: Response) => {
  if (error.status) {
    switch (error.status) {
      case 400:
        return 'The Request You Sent Is Invalid. Please Fill out All Required Fields';
      case 403:
        return 'The Username or Password is Incorrect';
      case 401:
        return 'You Are Not Authorized To Access This Resource';
      case 404:
        return 'The Resource or Page Was Not Found';
      case 500:
        return 'A Server Error Has Occurred. Please Try Again Later.';
      default:
        return 'An Unexpected Error Has Occurred.';
    }
  } else {
    return 'An Unexpected Error Has Occurred.';
  }
};

export const validateReimbForm = (reimb: Reimbursement) => {
  if (
    !reimb.amount ||
    !reimb.description ||
    reimb.type == undefined ||
    reimb.type == null
  )
    return false;

  return true;
};
