const fs = require("fs");
const servers = require("../../storage/servers.json");
module.exports = {
    name: "disconnect",
    aliases: ["stop"],
    category: "music",
    description: "Disconnect from the voice channel!",
    usage: "<input>",
    run: async (client, message, args) => {
        if (!message.member.voiceChannel) 
            return message.reply("make sure that you are in a voice channel.");
        if (!servers[message.guild.id]) {
            servers[message.guild.id] = {
                queue: []
            }
            fs.writeFile("../../storage/servers.json", JSON.stringify(servers), (err) => {
                if (err) console.log("An error has been caught while trying to write in ./xp.json");
            });
        }
        var server = servers[message.guild.id];
        if (server.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }
};