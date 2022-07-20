const fs = require('fs');


module.exports = (client) => {
    client.handleEvents = async () => {
        //crete an array of all sub-folders within our events sub-folder
        const eventFolders = fs.readdirSync(`./src/events`);
        //loop over these sub folders and return an array of the files contained within them
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith('.js'));
            //loop over the files within the client sub-folder
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        //require all the things!!!
                        const event = require(`../../events/${folder}/${file}`);
                        //if the once value of an event is true, execute it once
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        //otherwise execute as normal
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;

                default:
                    break;

            }
        }
    }
}