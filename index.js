import express from 'express'
import ejs from 'ejs'
import axios from 'axios'

const app = express();
const PORT = 3000;

// variable for the API...the endpoints will be added in each route
const API_URL = 'https://potterapi-fedeperin.vercel.app/en'

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', {
        title: staticPotterInfo.title, description: staticPotterInfo.description
    });
});

// retrieve a random book with description and cover art
app.get('/book', async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}/books/random`);
        res.render('index.ejs', { title: result.data.title, description: result.data.description, cover: result.data.cover } );
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

// retrieve a random character with name, nickname, and their house
app.get('/character', async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}/characters/random`);
        res.render('index.ejs', { title: result.data.fullName, nickname: result.data.nickname, house: result.data.hogwartsHouse } );
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

// retrieve a random house with house name, founder name, colors and animal
app.get('/house', async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}/houses/random`);
        console.log(result);
        res.render('index.ejs', { title: result.data.house, founder: result.data.founder, colors: result.data.colors, animal: result.data.animal } );
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

// retrieve a random spell and its use
app.get('/spell', async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}/spells/random`);
        res.render('index.ejs', { title: result.data.spell, use: result.data.use} );
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(3000, () => {
    console.log(`Server is listening on port ${PORT}.`)
});

// This information displays when the user loads the page, before any buttons are clicked.
const staticPotterInfo = {
    title: "Random information from the Harry Potter series",
    description: "This app queries the PotterAPI to gather random information about various categories in the world of Harry Potter. You can choose from a random book, character, house, or spell by using the buttons below."
};