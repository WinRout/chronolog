import db from './config';

const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS History(
                dateIn DATETIME(20),
                dateOut DATETIME(20),
                locationIn TEXT(20),
                locationOut TEXT(20),
                elapsedTime INT(20),
                breakTime INT(20),
                PRIMARY KEY(dateIn)
            )`,
        )
    })
}

export default createTables