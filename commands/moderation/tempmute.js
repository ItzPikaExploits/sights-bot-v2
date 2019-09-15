const { formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ts = require("timestring");
module.exports = {
    name: "tempmute",
    aliases: ["mute"],
    category: "moderation",
    description: "Temporarily mute a user!",
    usage: "<username>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        if (message.channel.type == "dm") return;
        if (!message.member.hasPermission("ADMINISTRATOR")) 
            return message.reply("you do not have the ADMINISTRATOR permission!").then(m => m.delete(5000));
        let mMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mMember)
            return message.reply("I could not find that user!").then(m => m.delete(5000));
        if (mMember.hasPermission("ADMINISTRATOR"))
            return message.reply("I could not mute this user, they are a (moder/administr)ator!").then(m => m.delete(5000));
        let ROLE = message.guild.roles.find(x => x.name === "🔇 Muted 🔇");
        if (!ROLE) return message.reply("I could not find the 🔇 Muted 🔇 role!").then(m => m.delete(5000));
        let muteTime = args[1];
        if (!muteTime) return message.reply("a time was not specified!");
        const created = formatDate(mMember.user.createdAt);
        const muteEmbed = new RichEmbed()
            .setFooter(mMember.displayName, mMember.user.displayAvatarURL)
            .setThumbnail(mMember.user.displayAvatarURL)
            .setColor("#ff0000")
            .addField("Member information", stripIndents`**> Display name:** ${mMember.displayName} (${mMember.id})
            **> Muted by:** ${message.author.username} (${message.member.id})
            **> Muted for:** ${muteTime}`)
            .addField("User information", stripIndents`**> ID:** ${mMember.user.id}
            **> Username:** ${mMember.user.username}
            **> Discord Tag:** ${mMember.user.tag}
            **> Created at:** ${created}`, true)
            .setTimestamp()
        let punishChannel = message.guild.channels.find("id", "622524859095973938");
        if (!punishChannel) return message.reply("I could not find the punishment-logs channel.").then(m => m.delete(5000));
        await(mMember.addRole(ROLE.id));
        punishChannel.send(muteEmbed);
        setTimeout(function() {
            mMember.removeRole(ROLE.id);
            const unmuteEmbed = new RichEmbed()
                .setFooter(mMember.displayName, mMember.user.displayAvatarURL)
                .setThumbnail(mMember.user.displayAvatarURL)
                .setTitle(`<@${mMember.id}> has been unmuted!`)
                .setColor("#00ff00")
                .addField("Member information", stripIndents`**> Display name:** ${mMember.displayName} (${mMember.id})
                **> Muted by:** ${message.author.username} (${message.member.id})
                **> Muted for:** ${muteTime}`)
                .addField("User information", stripIndents`**> ID:** ${mMember.user.id}
                **> Username:** ${mMember.user.username}
                **> Discord Tag:** ${mMember.user.tag}
                **> Created at:** ${created}`, true)
                .setTimestamp()
            punishChannel.send(unmuteEmbed);
        }, ts(muteTime) * 1000);
    }
};