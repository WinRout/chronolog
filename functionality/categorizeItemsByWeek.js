import { getISOWeek } from "date-fns";
import { dateToJson, formatTime, dateToTimeStr } from "./mainFunctions";

export const categorizeItemsByWeek = (items) => {

    let total = 0;
    const categorizedItems = {};
    const weeks = [];

    items.forEach((item) => {
        const [fullDate, values] = item;

        total = total + values.elapsedTime;

        const dateInArr = dateToJson(fullDate);
        const dateInStr = `${dateInArr.weekday}, ${dateInArr.day_no} ${dateInArr.month}`;
        const timeInStr = '📍' + dateToTimeStr(fullDate);
        const dateOutArr = dateToJson(values.dateOut);
        // const dateOutStr = `${dateOutArr.weekday}, ${dateOutArr.day_no} ${dateOutArr.month}`;
        const timeOutStr = '🏁' + dateToTimeStr(values.dateOut)
        const timeStr = formatTime(values.elapsedTime);

        const fullDateObj = new Date(fullDate);
        const weekNumber = getISOWeek(fullDateObj);

        
        if (!categorizedItems[weekNumber]) {
            weeks.push(weekNumber);
            categorizedItems[weekNumber] = [];
        }
        categorizedItems[weekNumber].push([fullDate, {
            date: dateInStr, 
            timeIn: timeInStr,
            timeOut: timeOutStr,
            time: timeStr,
            timeValue: values.elapsedTime,
        }]);
    });

    weeks.sort((a, b) => b - a);
 
    return [total, weeks, categorizedItems];
        
    }