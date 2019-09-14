const { formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
    name: "kick",
    aliases: ["k"],
    category: "moderation",
    description: "Kicks a user!",
    usage: "<username> <reason>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        if (message.channel.type == "dm") return;
        if (!message.member.hasPermission("KICK_MEMBERS")) 
            return message.reply("you do not have the KICK_MEMBERS permission!").then(m => m.delete(5000));
        let kMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!kMember)
            return message.reply("I could not find that user!").then(m => m.delete(5000));
        if (kMember.hasPermission("ADMINISTRATOR"))
            return message.reply("I could not kick this user, they are a (moder/administr)ator!").then(m => m.delete(5000));
        let kReason = args.join(" ").slice(22);
        const created = formatDate(kMember.user.createdAt);
        const kickEmbed = new RichEmbed()
            .setFooter(kMember.displayName, kMember.user.displayAvatarURL)
            .setThumbnail(kMember.user.displayAvatarURL)
            .setColor("#ff0000")
            .addField("Member information", stripIndents`**> Display name:** ${kMember.displayName} (${kMember.id})
            **> Kicked for:** ${kReason}
            **> Kicked by:** ${message.author.username} (${message.member.id})`)
            .addField("User information", stripIndents`**> ID:** ${kMember.user.id}
            **> Username:** ${kMember.user.username}
            **> Discord Tag:** ${kMember.user.tag}
            **> Created at:** ${created}`, true)
            .setTimestamp()
        let punishChannel = message.guild.channels.find("id", "622524859095973938");
        if (!punishChannel) return message.reply("I could not find the punishment-logs channel.").then(m => m.delete(5000));
        message.guild.member(kMember).kick(kReason);
        punishChannel.send(kickEmbed)
    }
};