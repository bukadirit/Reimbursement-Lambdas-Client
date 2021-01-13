import { Reimbursement } from './../models/reimbursement';

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
  if (reimb.amount && reimb.description && reimb.type) {
    if (
      reimb.amount.toString().length > 0 &&
      reimb.description.length > 0 &&
      reimb.type.length > 0
    ) {
      return true;
    }
  }
  return false;
};
