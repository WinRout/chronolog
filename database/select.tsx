import db from './config';

const getTotalEntries = () => {
        return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM History`,
                    [],
                    (tx, results) => { resolve(results.rows) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get day entries: ' + error);
        }
    })
}

const getDayEntries = (day: String) => {
    // Replace 'specific_date' with the actual date you're interested in, formatted as 'YYYY-MM-DD'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM History WHERE DATE(dateIn) = ? ORDER BY dateIn DESC`,
                    [day],
                    (tx, results) => {resolve(results.rows)},
                    error => {reject('[SQL] ' + error)}
                )
            })
        } catch (error) {
            reject('Could not get day entries: ' + error);
        }
    })
}

const getDayTotal = (day: String) => {
    // Replace 'specific_date' with the actual date you're interested in, formatted as 'YYYY-MM-DD'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT SUM(elapsedTime) AS sum FROM History WHERE DATE(dateIn) = ?;`,
                    [day],
                    (tx, results) => { resolve(results.rows.item(0).sum) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get day total: ' + error);
        }
    })
}

const getWeekTotal = (week: String) => {
    // Replace 'week' with the actual date you're interested in, formatted as 'YYYY-ww'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT SUM(elapsedTime) AS sum FROM History WHERE strftime('%Y-%W', dateIn) = ?;`,
                    [week],
                    (tx, results) => { resolve(results.rows.item(0).sum) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get week total: ' + error);
        }
    })
}

const getWeekDays = (week: String) => {
    // Replace 'week' with the actual date you're interested in, formatted as 'YYYY-ww'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `
                    SELECT 
                    DATE(dateIn) AS day,
                    SUM(elapsedTime) AS total_time
                    FROM History
                    WHERE strftime('%Y-%W', dateIn) = ?
                    GROUP BY day
                    ORDER BY day DESC;
                    `,
                    [week],
                    (tx, results) => { resolve(results.rows) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get week days: ' + error);
        }
    })
}

const getMonthTotal = (month: String) => {
    // Replace 'week' with the actual date you're interested in, formatted as 'YYYY-mm'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT SUM(elapsedTime) AS sum FROM History WHERE strftime('%Y-%m', dateIn) = ?;`,
                    [month],
                    (tx, results) => { resolve(results.rows.item(0).sum) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get month total: ' + error);
        }
    })
}

const getMonthWeeks = (month: String) => {
    // Replace 'week' with the actual date you're interested in, formatted as 'YYYY-mm'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `
                    SELECT 
                        strftime('%Y-%W', dateIn) AS year_week,
                        SUM(elapsedTime) AS total_time
                    FROM History
                    WHERE strftime('%Y-%m', dateIn) = ?
                    GROUP BY year_week
                    ORDER BY year_week DESC;
                    `,
                    [month],
                    (tx, results) => { resolve(results.rows) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get month weeks: ' + error);
        }
    })
}


const getYearTotal = (year: String) => {
    // Replace 'week' with the actual date you're interested in, formatted as 'YYYY'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT SUM(elapsedTime) AS sum FROM History WHERE strftime('%Y', dateIn) = ?;`,
                    [year],
                    (tx, results) => { resolve(results.rows.item(0).sum) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get year total: ' + error);
        }
    })
}

const getYearMonths = (year: String) => {
    // Replace 'week' with the actual date you're interested in, formatted as 'YYYY-mm'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `
                    SELECT 
                        strftime('%Y-%m', dateIn) AS year_month,
                        SUM(elapsedTime) AS total_time
                    FROM History
                    WHERE strftime('%Y', dateIn) = ?
                    GROUP BY year_month
                    ORDER BY year_month DESC;
                    `,
                    [year],
                    (tx, results) => { resolve(results.rows) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get year months: ' + error);
        }
    })
}

const getAllTotal = () => {
    // Replace 'week' with the actual date you're interested in, formatted as 'YYYY'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT SUM(elapsedTime) AS sum FROM History;`,
                    [],
                    (tx, results) => { resolve(results.rows.item(0).sum) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get all total: ' + error);
        }
    })
}

const getAllYears = () => {
    // Replace 'week' with the actual date you're interested in, formatted as 'YYYY-mm'.
    return new Promise((resolve, reject) => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    `
                    SELECT 
                        strftime('%Y', dateIn) AS year,
                        SUM(elapsedTime) AS total_time
                    FROM History
                    GROUP BY year
                    ORDER BY year DESC;
                    `,
                    [],
                    (tx, results) => { resolve(results.rows) },
                    error => { reject('[SQL] ' + error) }
                )
            })
        } catch (error) {
            reject('Could not get all years: ' + error);
        }
    })
}






export { getTotalEntries, getDayEntries, getDayTotal, getWeekTotal, getWeekDays, getMonthTotal, getMonthWeeks,
getYearTotal, getYearMonths, getAllTotal, getAllYears }