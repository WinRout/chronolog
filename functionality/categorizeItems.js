import { getISOWeek, getISOWeekYear, getISOWeeksInYear } from "date-fns";
import { dateToJson, formatTime, dateToTimeStr } from "./mainFunctions";
import getAddress from "./getAddress";

export const categorizeItems = (items) => {

    let total = 0;
    const categorizedItems = {};
    const weeks = {};

    items.forEach((item) => {
        const [fullDate, values] = item;

        total = total + values.elapsedTime;

        const dateInArr = dateToJson(fullDate);
        const dateInStr = `${dateInArr.weekday}, ${dateInArr.day_no} ${dateInArr.month}`;

        const dateOutArr = dateToJson(values.dateOut);
        const dateOutStr = `${dateOutArr.weekday}, ${dateOutArr.day_no} ${dateOutArr.month}`;

        const timeInStr = '⏰' + dateToTimeStr(fullDate);
        const timeOutStr = '🏁' + dateToTimeStr(values.dateOut)

        const timeStr = formatTime(values.elapsedTime);

        const address = '📍' + values.location.address;

        const fullDateObj = new Date(fullDate);
        const weekNumber = getISOWeek(fullDateObj);
        const year = getISOWeekYear(fullDateObj);

        if (!categorizedItems[year]) {
            categorizedItems[year] = {};
            weeks[year] = [];
        }
        if (!categorizedItems[year][weekNumber]) {
            weeks[year].push(weekNumber);
            categorizedItems[year][weekNumber] = [];
        }
        categorizedItems[year][weekNumber].push([fullDate, {
            date: dateInStr,
            timeIn: timeInStr,
            timeOut: timeOutStr,
            time: timeStr,
            timeValue: values.elapsedTime,
            address: address,
        }]);
    });

    return [total, weeks, categorizedItems];

}