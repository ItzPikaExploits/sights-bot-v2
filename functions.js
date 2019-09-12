const fs = require("fs");
const servers = require("./storage/servers.json");
const ytdl = require("ytdl-core");
module.exports = {
    getMember: function(message, toFind = ``) {
        toFind = toFind.toLowerCase();
        let target = message.guild.members.get(toFind);
        if (!target && message.mentions.members)
            target = message.mentions.members.first();
        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
            });
        };
        if (!target)
            target = message.member;
        return target;
    },
    formatDate: function(date) {
        return new Intl.DateTimeFormat("en-US").format(date);
    },
    play: function(connection, message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
        fs.writeFile("./storage/servers.json", JSON.stringify(servers), (err) => {
            if (err) console.log("An error has been caught while trying to write in ./xp.json");
        });
        server.queue.shift();
        fs.writeFile("./storage/servers.json", JSON.stringify(servers), (err) => {
            if (err) console.log("An error has been caught while trying to write in ./xp.json");
        });
        server.dispatcher.on("end", function() {
            if (server.queue[0]) play(connection, message);
            else connection.disconnect();
            fs.writeFile("./storage/servers.json", JSON.stringify(servers), (err) => {
                if (err) console.log("An error has been caught while trying to write in ./xp.json");
            });
        });
    }
};