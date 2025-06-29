




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0pDbklTWHpCWDdJbnB2RXdrTVM3ODg2cm5YaS9xSHdlOW96ZkhqbFdsZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFM3V2Y1WlVXYjZUR0JTOG9obHhYa2R4aXBma3pFck1SWDFsMEtLZHpHZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwTENGdStmYVFhZmZDQ2xaMW52a043K0JYUm51RzVzZXY2RjJXdlQ2TDAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIweWtXL3p6K3NqV1dweWxDSXBqUTBDVWQyZlBoVVM0OXdmZ1h0ellNN0JJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVLczExRHpLQTk3aFFIVnRGZWV0YWpEaHhiUXhnb3I2cmFIU3pYN2pnM1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxWUWY0M0hIVklFdGxwVlM1WHdQaXpJaWpjWjlreUhBV21jQ0l1SjV3UUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia04ySHNyREl2TnFsdG1RYkVraGFjS203UWhzNTByaWUrS1ZKOEZ0eXFYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzdNcGxlaWNER1o5czJOWnBKVXdVTXRuNDEvOXhibWhhUm1tV2d4WDQzZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9DT05YNlIrenJuakM5YkNucjZBcUZpQTVmVStQZUhHVEtxODZyM0RDbnFOL0loV0JyclBJTyt3Q1k1aS9nbEZqR1NlQmdFd3ErT2FWWFpjRThjcmpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJRamlQcnIrRGpGb1ZqSURMZzBCQjhxNDlBRldOOXBaVHJCY0lFQjRQS1k4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzQwMDI2NTk5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNBRDgwNkIzOTI0NUVERjM4RkEzQUQ0RDA5QTc5MUI2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTExMzIxNjR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ilg5NUE1VjVSIiwibWUiOnsiaWQiOiI5NDc0MDAyNjU5OTo2OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLRlc650YLQvc+FLi4uLiIsImxpZCI6IjI3Mzc3NDUzNjYxODAyMTo2OUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ095T3NxZ0NFTjdQZ01NR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im9FcXIzeVVkS2VBVmNMOFdPMTJndHJHWS9HNjEyc1QrUll3U0k4Tm5qMlE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBXb0ZkNHc1dFJmK0pmRDlCWWoxbjJlS0h0MTN2NmtBNkYrQm5NUlZ2RlZ2S250K2dIdHJMMWgzUFV5T0hpcDFkRWJweGRVb3gwcFFRU2s0K1o2MkRBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhZmczYlZiNXRNMVI0T0pSQVVZdE1vV2Z6ZnUzSTNWcTAvOXQvWEdKWVRWeFUvVmFBYnpOLzYrMDhTcmFOcW9qTVNhUWNXdnpIY0JNbjl0WjFuenJoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzQwMDI2NTk5OjY5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFCS3E5OGxIU25nRlhDL0ZqdGRvTGF4bVB4dXRkckUva1dNRWlQRFo0OWsifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTEzMjE0MSwibGFzdFByb3BIYXNoIjoiMUs0aEg0IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEbU4ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254799056874",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Pkdriller01",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
