const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU05Q3JBdVRCd3JIWVYxbnJEbWF6YjQ4aFNjY2JZZDVneXovWFR3UGFHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSG03eFZqZm5tbGszQ1RRUWJTV0V1bnBCWmRCWWdiS1JWMWkzWjRWR01rOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQlFHaEZYN2NuQWFSUWthUXlKYk1TOVRkeGFJRDdNcmU4eDdDWWZ6SG4wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0dW5pMnJZU3VNd25qQXg4Y1ZwcEdaL013VlRmaTJFOXUzRzRrV2FQZlFNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBLNXVSam1hTk4zd3o0NGpjOUFyNlRKdm56RWpKVS8rUy9lTk1hMzZGVjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InR2WmZtWUFhdmJHQmhhSFM2T2N3VkNtRVVmZDFRMnBiZ1R6UEo2K1k5WFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUpPanNKRFNaM21XTlkvc0RZeVhmRU01ZGtEZUhGU1RCaHl3dUU1M1FYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkdNVC9xWXVKa3lFWW9CZTQxeEJLV05wVHZmMWVFRjhsOHcxQjhuVExSVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRvbWp0UHc2ZmFBN2laZ2FKZTUrcU9nQmcvRTB6d2ExT1kzZEJDdlhBY3hpUFBzYkRoTWhnck96bjAzOGl3TWV2RU0xZHZHRGhkNmRmc0hlUTNoWmlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYzLCJhZHZTZWNyZXRLZXkiOiIwdzNZQ3FyS0kyTEZpY2RtZzVCL1JZV3lRWGxnUEZGYkduZzQ3WlhYQ2tzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNKZkNpZXNDRUthZ21Mc0dHQ3NnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJFRGtIMW9zSWl2YnM3WWNUa29UbjZGQjRYY0tGYWV2VnFUQnYzQkJ0alVJPSIsImFjY291bnRTaWduYXR1cmUiOiJQMGpkaW05R3p6UzhOWXdXQ3FwTnZ6YXRTYlNsTUdZRlU0MjdUeUU2MW9sbjZ5ZzZvMzQrVFpSUG1JYnZPV05Ja29yeXZqU2dDbkJoOE5RZkdadjJBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiazRnbmxXZldzSTdYS0phcFZrK01iTGtpNkVjWDJQK1EyNHcrd1RWUFFvM0gvcmhQWjlCQnhOcWxkN0FlR2REbFJyb0hEZi80YmxtK0loZzVKTVRkZ0E9PSJ9LCJtZSI6eyJpZCI6IjIzNzY5NjkwMDYxMjo3NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZm38J2aivCdmpfwnZqcIPCdmoPwnZqO8J2ajPCdmpEg4oCgIiwibGlkIjoiMTIxNjU1Mzg0ODY2ODY4Ojc1QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2OTY5MDA2MTI6NzVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUkE1QjlhTENJcjI3TzJIRTVLRTUraFFlRjNDaFducjFha3diOXdRYlkxQyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0NzQyMDY4LCJsYXN0UHJvcEhhc2giOiJJWG9EcCJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'oui',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
