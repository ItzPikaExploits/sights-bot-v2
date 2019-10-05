const { Client, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
    disableEveryone: true
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.xp = require("./storage/xp.json");
const prefix = process.env.PREFIX;
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});
client.on("guildMemberAdd", member => {
    let verifyChannel = member.guild.channels.find("id", "612359319588962335");
    if (!verifyChannel) return console.log("Where did the verify channel go?");
    verifyChannel.send(`Welcome to ABOVE - RBLX / MC, <@${member.id}>! Make sure to read <#612359319589224458> + <#598716546902261761>`);
});
client.on("ready", () => {
    console.log("SIGHTS is online!")
    client.user.setPresence({
        status: "online",
        game: {
            name: "over " + process.env.HEROKU_RELEASE_VERSION + "!",
            type: "WATCHING"
        }
    });
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    let xpAdd = Math.floor(Math.random() * 7) + 8;
    if (!client.xp[message.author.id]) {
        client.xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }
    let curXP = client.xp[message.author.id].xp;
    let curLVL = client.xp[message.author.id].level;
    let nxtLvl = client.xp[message.author.id].level * 600;
    client.xp[message.author.id].xp = curXP + xpAdd;
    if (nxtLvl <= client.xp[message.author.id].xp) {
        client.xp[message.author.id].level = curLVL + 1;
        client.xp[message.author.id].xp = 0;
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Level up: ${message.author.username}`)
            .setFooter(`${message.author.username} has leveled up!`)
            .setDescription(`${message.author.username}, you have leveled up to ${client.xp[message.author.id].level}!`)
        message.channel.send(embed);
        fs.writeFile("./xp.json", JSON.stringify(client.xp), (err) => {
            if (err) console.log("An error has been caught while trying to write in ./xp.json");
        });
        if (client.xp[message.author.id].level == 5) {
            let rMember = message.member;
            if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
            let role = "👌 E-Tier 👌";
            if (!role) return message.reply(`${role} does not exist!`);
            let gRole = message.guild.roles.find(`name`, role);
            if (!gRole) return message.reply(`Could not find the role, ${role}`)
            if (rMember.roles.has(gRole.id));
            rMember.addRole(gRole.id);
            let embed = new discord.RichEmbed()
                .setColor("LUMINOUS_VIVID_PINK")
                .setTitle(`Rank up: ${message.author.username}`)
                .setFooter(`${message.author.username} has ranked up!`)
                .setDescription(`${message.author.username}, you have ranked up to ${role}!`)
            message.channel.send(embed);
        }
        if (client.xp[message.author.id].level == 10) {
            let rMember = message.member;
            if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
            let role = "😂 D-Tier 😂";
            if (!role) return message.reply(`${role} does not exist!`);
            let gRole = message.guild.roles.find(`name`, role);
            if (!gRole) return message.reply(`Could not find the role, ${role}`)
            if (rMember.roles.has(gRole.id));
            rMember.addRole(gRole.id);
            let embed = new discord.RichEmbed()
                .setColor("LUMINOUS_VIVID_PINK")
                .setTitle(`Rank up: ${message.author.username}`)
                .setFooter(`${message.author.username} has ranked up!`)
                .setDescription(`${message.author.username}, you have ranked up to ${role}!`)
            message.channel.send(embed);
        }
        if (client.xp[message.author.id].level == 15) {
            let rMember = message.member;
            if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
            let role = "👍 C-Tier 👍";
            if (!role) return message.reply(`${role} does not exist!`);
            let gRole = message.guild.roles.find(`name`, role);
            if (!gRole) return message.reply(`Could not find the role, ${role}`)
            if (rMember.roles.has(gRole.id));
            rMember.addRole(gRole.id);
            let embed = new discord.RichEmbed()
                .setColor("LUMINOUS_VIVID_PINK")
                .setTitle(`Rank up: ${message.author.username}`)
                .setFooter(`${message.author.username} has ranked up!`)
                .setDescription(`${message.author.username}, you have ranked up to ${role}!`)
            message.channel.send(embed);
        }
        if (client.xp[message.author.id].level == 20) {
            let rMember = message.member;
            if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
            let role = "❤️ B-Tier ❤️";
            if (!role) return message.reply(`${role} does not exist!`);
            let gRole = message.guild.roles.find(`name`, role);
            if (!gRole) return message.reply(`Could not find the role, ${role}`)
            if (rMember.roles.has(gRole.id));
            rMember.addRole(gRole.id);
            let embed = new discord.RichEmbed()
                .setColor("LUMINOUS_VIVID_PINK")
                .setTitle(`Rank up: ${message.author.username}`)
                .setFooter(`${message.author.username} has ranked up!`)
                .setDescription(`${message.author.username}, you have ranked up to ${role}!`)
            message.channel.send(embed);
        }
        if (client.xp[message.author.id].level == 25) {
            let rMember = message.member;
            if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
            let role = "🔥 A-Tier 🔥";
            if (!role) return message.reply(`${role} does not exist!`);
            let gRole = message.guild.roles.find(`name`, role);
            if (!gRole) return message.reply(`Could not find the role, ${role}`)
            if (rMember.roles.has(gRole.id));
            rMember.addRole(gRole.id);
            let embed = new discord.RichEmbed()
                .setColor("LUMINOUS_VIVID_PINK")
                .setTitle(`Rank up: ${message.author.username}`)
                .setFooter(`${message.author.username} has ranked up!`)
                .setDescription(`${message.author.username}, you have ranked up to ${role}!`)
            message.channel.send(embed);
        }
        if (client.xp[message.author.id].level == 30) {
            let rMember = message.member;
            if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
            let role = "👑 S-Tier 👑";
            if (!role) return message.reply(`${role} does not exist!`);
            let gRole = message.guild.roles.find(`name`, role);
            if (!gRole) return message.reply(`Could not find the role, ${role}`)
            if (rMember.roles.has(gRole.id));
            rMember.addRole(gRole.id);
            let embed = new discord.RichEmbed()
                .setColor("LUMINOUS_VIVID_PINK")
                .setTitle(`Rank up: ${message.author.username}`)
                .setFooter(`${message.author.username} has ranked up!`)
                .setDescription(`${message.author.username}, you have ranked up to ${role}!`)
            message.channel.send(embed);
        }
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command)
        command.run(client, message, args)
});

client.login(process.env.TOKEN);
