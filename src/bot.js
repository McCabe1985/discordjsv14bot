//Our token is stored in an environment variable for better security
require('dotenv').config();
const {
    token
} = process.env;
//
const {
    Client,
    Collection,
    GatewayIntentBits

} = require('discord.js');
const fs = require('fs');
const {
    ClientRequest
} = require('http');


const client = new Client({
    intents: GatewayIntentBits.Guilds
});
client.commands = new Collection();
client.commandArray = [];


//require all the things!!!!!!!!!!
//functionFolders returns an array of the sub-folders contained within the functions sub-folder
const functionFolders = fs.readdirSync(`./src/functions`);
//loop through the sub-folders contained within functionFolders and create an array of all of the .js files contained within them
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith('.js'));
    //require all of these files
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents();
client.handleCommands();
client.login(token);