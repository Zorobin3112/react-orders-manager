export default function getDateNow() {
    const dateObj = new Date()
  
    // current date
    const day = ("0" + dateObj.getDate()).slice(-2)
  
    // current month
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
  
    // current year
    const year = dateObj.getFullYear().toString();
  
    // current hours
    const hour = ("0" + dateObj.getHours()).slice(-2)
  
    // current minutes
    const min = ("0" + dateObj.getMinutes()).slice(-2)
  
    // current seconds
    const sec = ("0" + dateObj.getSeconds()).slice(-2)
    
    const dateToString = `${year}/${month}/${day} ${hour}:${min}:${sec}`

    return { dateToString, year, month, day, hour, min, sec }
}