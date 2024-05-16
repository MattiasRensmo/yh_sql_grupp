const { initDatabase } = require("../database/db");

const db = initDatabase();

const postMessage = async (text, userId) => {
    return new Promise((resolve, reject) => {
        /*sql */
        db.run(`
        INSERT INTO messages (text, userId) VALUES
        (?, ?)`, [text, userId], (error) => {
                    if(error){
                        console.log(error);
                        reject(error);
                    }
                    console.log("message posted successfully")
                    resolve();
                })
                //här ska det in i messeges kanalen också
                //channel id
    })
}


const getAllMessages = async () => {
    return new Promise((resolve, reject) => {
        /*sql*/
        db.all(`SELECT * FROM messages`, [], (error) => {
            if(error){
                console.log(error);
                reject(error);
            }else{
                resolve();
            }
        })
    })
}


module.exports = {postMessage, getAllMessages};