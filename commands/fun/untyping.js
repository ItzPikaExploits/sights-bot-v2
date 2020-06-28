const { RichEmbed } = require("discord.js");
module.exports = {
    name: "untyping",
    aliases: ["unty", "untypeforever"],
    category: "fun",
    description: "Bot stops typing.",
    usage: "",
    run: async (client, message, args) => {
      message.channel.stopTyping(true);
    }
};
