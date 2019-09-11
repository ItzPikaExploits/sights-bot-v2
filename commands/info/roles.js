module.exports = {
    name: "roles",
    aliases: ["rolelist"],
    category: "info",
    description: "Gives you a list of roles of which you can pick to use.",
    //usage: "<input>",
    run: async (client, message, args) => {
        await message.delete().catch(err=>{});
        let A = message.guild.roles.get("620798195575816197");
        const filter = (reaction, user) => ["🎉"].includes(reaction.emoji.name) && user.id === message.author.id;
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Available Roles`)
            .setFooter(`
            🎉 - ${A.toString()}
            `)
            .setDescription(`Reaction roles for <@${message.author.id}>`)
        message.channel.send(embed).then(async msg => {
            await msg.react("🎉");
            msg.awaitReactions(filter, {
                max: 1,
                time: 30 * 1000,
                errors: ["time"]
            }).then(collected => {
                const REACTION = collected.first();
                switch (REACTION.emoji.name) {
                    case "🎉":
                        message.member.addRole(A).catch(err => {
                            console.log(err);
                            return message.channel.send(`${message.author.username}, an error has appeared while trying to give you a role: **${err.Message}**.`)
                        });
                        message.channel.send(`${message.author.username}, you have received the role, **${A.name}**.`).then(m => m.delete(3000))
                        msg.delete();
                        break;
                }
            }).catch(collected => {
                console.log(collected)
                message.channel.send(`I could **not** add you to this role!`).then(m => m.delete(3000));
                return 
            })
        });
    }
};