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



export { getTotalEntries, getDayEntries, getDayTotal }