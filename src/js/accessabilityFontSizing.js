document.getElementById('js-make-font-size-smaller').addEventListener('click', function(ev) {
  updateBodyFontSize(getCurrentFontSize() - 1)
})

document.getElementById('js-make-font-size-normal').addEventListener('click', function(ev) {
  resetBodyFontSize()
})

document.getElementById('js-make-font-size-bigger').addEventListener('click', function(ev) {
  updateBodyFontSize(getCurrentFontSize() + 1)
})

/**
 * Updates cookie font size and sets new value it as current.
 *
 * @param value
 * @returns {number}
 */
function updateBodyFontSize(value) {
  setCookie('fontSize', value, 7)

  document.body.style.setProperty('font-size', value + 'px')

  return getCurrentFontSize()
}

/**
 * Resets body font size to 16px.
 */
function resetBodyFontSize() {
  deletCookie('fontSize')
  document.body.style.removeProperty('font-size')
}

/**
 * Gets current font size.
 *
 * @returns {number|*}
 */
function getCurrentFontSize() {
  if (!isCookieSet('fontSize')) {
    return 16
  }

  return parseInt(getCookie('fontSize'))
}

/**
 * Used to set accessibility values when page content is loaded.
 */
window.addEventListener('DOMContentLoaded', function(ev) {
  if (isCookieSet('fontSize')) {
    updateBodyFontSize(getCookie('fontSize'))
  }
})
