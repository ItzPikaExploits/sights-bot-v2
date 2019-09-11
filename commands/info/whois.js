const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports = {
    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    description: "Returns information about a user.",
    usage: "<username | id | mention>",
    run: async (client, message, args) => {
        const xp = require("../../storage/xp.json");
        const member = getMember(message, args.join(" "));
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";
        const created = formatDate(member.user.createdAt);
        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .addField("Member information", stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}
            **> Level:** ${xp[member.id].level}
            **> EXP:** ${xp[member.id].xp}/${xp[member.id].level * 600}`, true)
            .addField("User information", stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Created at:** ${created}`, true)
            .setTimestamp()
        if (member.user.presence.game)
            embed.addField("Currently playing", `**> Name:** ${member.user.presence.game.name}`);
        message.channel.send(embed);
    }
};