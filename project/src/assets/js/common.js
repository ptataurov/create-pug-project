export const isTouchDevice = () =>
  'ontouchstart' in window || navigator.msMaxTouchPoints

isTouchDevice() && document.body.classList.add('_touch-device')
