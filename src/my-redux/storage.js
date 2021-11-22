const APP_STORAGE_KEY = 'orders-manager'

export const storeData = (value) => {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(value))
  } catch (e) {
    // saving error
  }
}

export const getData = () => {
  try {
    return JSON.parse(localStorage.getItem(APP_STORAGE_KEY))
  } catch(e) {
    // error reading value
  }
}