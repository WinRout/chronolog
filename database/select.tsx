import db from './config';

const getData = () => {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM History`,
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log(len)
                    if (len > 0) {
                        console.log(results.rows.item(0))
                    }
                }
            )
        })
    } catch (error) {
        console.log(error)
    }
}

export { getData }