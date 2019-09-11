const { RichEmbed } = require("discord.js");
module.exports = {
    name: "giveaway",
    aliases: ["ga", "prizeevent"],
    category: "fun",
    description: "Start a giveaway.",
    usage: "<seconds> <prize>",
    run: async (client, message, args) => {
        gaITEM = args.slice(1).join(" ")
        let embed = new RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`${gaITEM}`)
            .setFooter(`${message.author.username} started a giveaway!`)
            .setDescription(`React with 🎉 to enter!`)
            .setTimestamp()
        var embedSent = await message.channel.send(embed);
        embedSent.react("🎉");
        message.delete();
        setTimeout(function() {
            var peopleReacted = embedSent.reactions.get("🎉").users.array();
            message.channel.send(`Congratulations, ${peopleReacted[1]}, you won the "${gaITEM}"`)
        }, args[0] * 1000)
    }
};