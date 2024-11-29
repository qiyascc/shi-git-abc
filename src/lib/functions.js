export const convertCamelCaseToReadable = (str) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })
    .toLowerCase();
};

export const setFieldError = (setErrors, name, message) => {
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: message,
  }));
};

export const clearFieldError = (setErrors, name) => {
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "",
  }));
};

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export const ALWAYS_SCROLL_TO_TOP = () => {
  return window.scroll(0, 0);
};
