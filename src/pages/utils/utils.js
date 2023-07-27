export const debounce = (fn, delay = 500) => {
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (timer) {
        fn.apply(this, args);
      }
    }, delay);
  };
};

export const throttle = (fn, delay) => {
  let timer = null;

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };
};

export function createRef(current = null) {
  return { current };
}

export default {
  debounce,
  throttle,
  createRef,
};
