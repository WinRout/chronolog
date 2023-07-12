export const dateToSec = (date: Date) => {
    // Get the hours, minutes, and seconds from the Date object
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    // Convert hours, minutes, and seconds to milliseconds
    var totalSeconds = ((hours * 60 + minutes) * 60 + seconds);
    return totalSeconds
}

export const dateToJson = (date: Date) => {
    const currentDate = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const [weekday, month_day_no] = formattedDate.split(', ');
    const [month, day_no] = month_day_no.split(' ');
    return ({weekday: weekday, month: month, day_no: day_no});
}

export const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};