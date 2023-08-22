import db from './config';

const { format } = require('date-fns');

// Function to clear all the history Data from local database
const clearHistory = async () => {
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                `DELETE FROM History`
            )
        })

    } catch (error) {
        console.log('Could not clear history: ', error)
    }
}

//Function to insert an hour entry to the local database
const insertHourEntry = async (
    dateIn: Date,
    dateOut: Date,
    locationIn: String,
    locationOut: String,
    elapsedTime: Number,
    breakTime: Number
) => {
    const dateInString = format(dateIn, "yyyy-MM-dd HH:mm:ss")
    const dateOutString = format(dateOut, "yyyy-MM-dd HH:mm:ss")
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                `INSERT INTO History (
                    dateIn, 
                    dateOut, 
                    locationIn, 
                    locationOut, 
                    elapsedTime,
                    breakTime
                    )
                    VALUES (?, ?, ?, ?, ?, ?)`,
                [dateInString, dateOutString, locationIn, locationOut, elapsedTime, breakTime],
                () => { },
                error => { console.log('[SQL] Could not insert entry:', error) }
            )
        })
    } catch (error) {
        console.log('Could not insert into history: ', error)
    }
}


export { clearHistory, insertHourEntry }