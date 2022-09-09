/* --------------------- Web Server --------------------------- */
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.listen(3000, () => {
    console.log('Web server is running!')
})

/* --------------------------------------------------------- */

const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({
	databasePath: "./src/db/database.json"
});
const config = require('./config.json');
var clc = require('cli-color');

const Discord = require("discord.js");
const { MessageEmbed, Client, Collection } = require("discord.js");
const Intents = Discord.Intents
const client = (global.Client = new Client({ intents:  [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] })) 
const {MessageActionRow, MessageButton } = require("discord.js");
client.commands = new Discord.Collection();
const fs = require("fs");
const { default: axios } = require('axios');
require("./src/utils/loader.js")(client)

client.db = db

client.login(config.token)

/* --------------------- Uptimer --------------------------- */

setInterval(() => {
    var links = Object.values(db.fetch('links'))
    links.forEach((x) => {
        axios.get(x.link)
        .then(function (response) {
            console.log('Pinged - ' + clc.green(x.link));
          })
          .catch(function (error) {
            console.log('Failed to ping - ' + clc.red(x.link));
          })
    })
}, config.interval);