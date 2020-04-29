function getCurrentTime(minimum=false) {
    const t = new Date();
    const month = t.toLocaleString('default', { month: 'short' });
    const timeZoneOffset = parseInt(t.getTimezoneOffset()/(-60))
    if (minimum) return `${t.getDate()} ${month} ${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`
    return `${t.getDate()} ${month} ${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()} GMT${(timeZoneOffset>0? '+': '') + timeZoneOffset}`
}

function dateToString(d) {
    // transform a date string to a string of local time date
    const t = new Date(d);
    console.log(d);
    const month = t.toLocaleString('default', { month: 'short' });
    const timeZoneOffset = parseInt(t.getTimezoneOffset()/(-60))
    return `${t.getDate()} ${month} ${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()} GMT${(timeZoneOffset>0? '+': '') + timeZoneOffset}`
}

export {getCurrentTime, dateToString};