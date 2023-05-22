const express = require('express');
const app = express(); // Initierar en express-applikation
const insultsJSON = require('./insults.json');

const { addInsult, getInsults, searchPlays } = require('./db');

app.use(express.json()); // Tolkar allt som kommer i en body som JSON

app.get('/api/insults', async (request, response) => {
    const insults = await getInsults();
    response.json({ success: true, insults: insults }); // Response.json() är det sista man gör, fungerar som en return i en funktion
});

app.post('/api/insults/add', async (request, response) => {
    const body = request.body; // Plocka ut det som skickats med i body från frontend
    console.log(body);
    const result = await addInsult(body.insult, body.play);

    if (result) {
        response.json({ success: true, message: result });
    } else {
        response.json({ success: false, message: 'Could not save insult' });
    }
    
});

app.get('/api/insults/:play', async (request, response) => {
    const query = request.params.play;

    const result = await searchPlays(query);

    response.json({ success: true, insults: result });
});

app.listen(8000, () => { // Starta igång vår webbserver genom att lyssna på ett portnummer
    console.log('Server started on port 8000');
});

// I frontend
// async function getInsults() {
//     const response = await fetch('http://localhost:8000/api/insults', { method: 'GET' });
//     const data = response.json();

//     if (data.success) {
//         // Lista alla insults
//     }
// }