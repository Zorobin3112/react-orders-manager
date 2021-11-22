export default function createID(type) {
    const dateObj = new Date()
  
    // current hours
    const hour = ("0" + dateObj.getHours()).slice(-2)
  
    // current minutes
    const min = ("0" + dateObj.getMinutes()).slice(-2)
  
    // current seconds
    const sec = ("0" + dateObj.getSeconds()).slice(-2)

    //random salt

    const salt = Math.floor(1000 * Math.random()).toString()
    
    return `${type}${hour}${min}${sec}${salt}`
}