module.exports = {
    name: "reroll",
    aliases: ["rr"],
    category: "fun",
    description: "Reroll a giveaway.",
    usage: "<prize>",
    run: async (client, message, args) => {
        gaITEM = args.slice(0).join(" ")
        var embedSent = await message.channel.send(embed);
        embedSent.react("🎉");
        message.delete();
        message.channel.send(`Congratulations, ${peopleReacted[1]}, you won the "${gaITEM}" this time!`)
    }
};