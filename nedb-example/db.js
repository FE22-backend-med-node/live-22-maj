const nedb = require('nedb-promise');
const database = new nedb({ filename: 'insults.db', autoload: true });

/** Operationer
 * insert() - Lägg till i databasen
 * find() - Söka i databasen, baserat på ett sökkriterie
 * update() - Uppdatera ett befintligt objekt i databasen
 * remove() - Ta bort i databasen
 */

/*
* Vad har vi för data?
Insult och play som ett objekt

* Vad vill vi spara för data?
Insult och play

* Hur vill vi spara detta alltså i vilket format?
Insult och play som ett objekt
*/

async function addInsult(insult, play) {
    const obj = {
        insult: insult,
        play: play
    }

    // Lägger till vårt objekt i vår databas
    const result = await database.insert(obj); // Returnerar om det databasen lyckades lägga till objektet

    return result;
}

async function getInsults() {
    const result = await database.find({}) // Hämta allt från databasen, returneras som en array

    return result;
}

async function searchPlays(query) {
    const result = await database.find({ play: query });

    return result;
}

module.exports = { addInsult, getInsults, searchPlays }
