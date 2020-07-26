/**
 * Used to store size font size as cookie.
 *
 * @type {string}
 */
const cookieProp = 'fontSize'

document.getElementById('js-make-font-size-smaller').addEventListener('click', ev => {
  updateBodyFontSize(getCurrentFontSize() - 1)
})

document.getElementById('js-make-font-size-normal').addEventListener('click', ev => {
  resetBodyFontSize()
})

document.getElementById('js-make-font-size-bigger').addEventListener('click', ev => {
  updateBodyFontSize(getCurrentFontSize() + 1)
})

/**
 * Updates cookie font size and sets new value it as current.
 *
 * @param value
 * @returns {number}
 */
function updateBodyFontSize(value) {
  setCookie(cookieProp, value, 7)

  document.body.attributeStyleMap.set('font-size', CSS.px(value))

  return getCurrentFontSize()
}

/**
 * Resets body font size to 16px.
 */
function resetBodyFontSize() {
  deletCookie(cookieProp)
  document.body.attributeStyleMap.set('font-size', CSS.px(16))
}

/**
 * Gets current font size.
 *
 * @returns {number|*}
 */
function getCurrentFontSize() {
  if (!isCookieSet(cookieProp)) {
    return document.body.computedStyleMap().get('font-size').value
  }

  return parseInt(getCookie(cookieProp))
}

/**
 * Used to store high contrast boolean value as cookie.
 *
 * @type {string}
 */
const highContrast = 'highContrast'

document.getElementById('js-high-contrast-toggler').addEventListener('click', ev => {
  isCookieSet(highContrast) ? deletCookie(highContrast) : setCookie(highContrast, true, 7)

  document.body.classList.toggle('high-contrast')
})

/**
 * Used to set accessibility values when page content is loaded.
 */
window.addEventListener('DOMContentLoaded', ev => {
  if (isCookieSet(cookieProp)) {
    updateBodyFontSize(getCookie(cookieProp))
  }

  if (isCookieSet(highContrast)) {
    document.body.classList.add('high-contrast')
  }
})
