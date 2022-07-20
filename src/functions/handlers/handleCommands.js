//Error
//C:\Users\Patrick\documents\code\backend\discord_bots\discord_bot_tutorial\src\functions\handlers\handleCommands.js:33
                //commandArray.push(command.data.toJSON());
                             //^

//TypeError: Cannot read properties of undefined (reading 'push')
    //at Client.client.handleCommands (C:\Users\Patrick\documents\code\backend\discord_bots\discord_bot_tutorial\src\functions\handlers\handleCommands.js:33:30)
    //at Object.<anonymous> (C:\Users\Patrick\documents\code\backend\discord_bots\discord_bot_tutorial\src\bot.js:37:8)
    //at Module._compile (node:internal/modules/cjs/loader:1103:14)
    //at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)
    //at Module.load (node:internal/modules/cjs/loader:981:32)
    //at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    //at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    //at node:internal/main/run_main_module:17:47
//[nodemon] app crashed - waiting for file changes before starting...

//dependencies
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');

const fs = require('fs');


module.exports = (client) => {
    client.handleCommands = async () => {
        //return an array of all the sub-folders within the commands sub-folder
        const commandFolders = fs.readdirSync('./src/commands');
        //loop through the subfolders and return an array of all the .js files within them
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));

            //grab commands and commands array from client
            const {
                commands,
                commandArray
            } = client;
            //loop through the commandFiles array
            for (const file of commandFiles) {
                //require all the things!!
                const command = require(`../../commands/${folder}/${file}`);
                //store the info of the command
                commands.set(command.data.name, command);
                //if the array is present,push command data to the array

                commandArray.push(command.data.toJSON());

            }
        }
        //Make sure that only our test server can use the bot while in development
        const clientId = '999206724881883147';
        const guildId = '999206547861295214';
        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray,
            });

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    };
};