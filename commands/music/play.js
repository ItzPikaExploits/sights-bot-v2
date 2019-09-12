const fs = require("fs");
const servers = require("../../storage/servers.json");
const { Play } = require("../../functions.js");
module.exports = {
    name: "play",
    aliases: ["p"],
    category: "music",
    description: "Start some music!",
    usage: "<input>",
    run: async (client, message, args) => {
        if (!args[0])
            return message.reply("provide a link for this command to function.");
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
        server.queue.push(args[0]);
        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            Play(connection, message)
        });
    }
};