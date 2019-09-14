const { getMember } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
    name: "ban",
    aliases: ["b"],
    category: "moderation",
    description: "Bans a user!",
    usage: "<username> <reason>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        if (message.channel.type == "dm") return;
        if (!message.member.hasPermission("BAN_MEMBERS")) 
            return message.reply("you do not have the BAN_MEMBERS permission!").then(m => m.delete(5000));
        let bMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!bMember)
            return message.reply("I could not find that user!").then(m => m.delete(5000));
        if (bMember.hasPermission("ADMINISTRATOR"))
            return message.reply("I could not ban this user, they are a (moder/administr)ator!").then(m => m.delete(5000));
        let bReason = args.join(" ").slice(22);
        const banEmbed = new RichEmbed()
            .setFooter(bMember.displayName, bMember.user.displayAvatarURL)
            .setThumbnail(bMember.user.displayAvatarURL)
            .setColor("#ff0000")
            .addField("Member information", stripIndents`**> Display name:** ${bMember.displayName} (${bMember.id})
            **> Banned for:** ${bReason}
            **> Banned by:** ${message.author.username} (${message.member.id})`)
            .addField("User information", stripIndents`**> ID:** ${bMember.user.id}
            **> Username:** ${bMember.user.username}
            **> Discord Tag:** ${bMember.user.tag}
            **> Created at:** ${created}`, true)
            .setTimestamp()
        let punishChannel = message.guild.channels.find("id", "622524859095973938");
        if (!punishChannel) return message.reply("I could not find the punishment-logs channel.").then(m => m.delete(5000));
        message.guild.member(bMember).ban(bReason);
        punishChannel.send(banEmbed)
    }
};