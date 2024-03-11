/**
 * password validation check for one uppercase , numeric and a special character
 * */
export const validatePassword = (password) => {
    //
    const pattern = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
    return pattern.test(password);
  };