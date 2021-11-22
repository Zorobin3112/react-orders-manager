export default function getDateOfNow() {
    const dateObj = new Date()
  
    // current date
    const day = ("0" + dateObj.getDate()).slice(-2)
  
    // current month
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
  
    // current year
    const year = dateObj.getFullYear().toString()

    return `${year}/${month}/${day}`
}