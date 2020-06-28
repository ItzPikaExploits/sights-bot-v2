const { RichEmbed } = require("discord.js");
module.exports = {
    name: "typing",
    aliases: ["ty", "typeforever"],
    category: "fun",
    description: "Bot types forever.",
    usage: "",
    run: async (client, message, args) => {
      message.channel.startTyping();
    }
};
