const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or the info of one specific command.",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        getAll(client, message)
    }
};
function getAll(client, message) {
    const embed = new RichEmbed()
        .setColor("RANDOM")
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n")
    };
    const info = client.category
        .map(cat => stripIndents`**${cat[0].toUppercase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);
    return message.channel.send(embed.setDescription(info))
};