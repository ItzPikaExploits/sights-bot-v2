module.exports = {
    name: "verify",
    //aliases: ["bc", "broadcast"],
    category: "verification",
    description: "Verifies the message sender.",
    //usage: "<input>",
    run: async (client, message, args) => {
        await message.delete().catch(err=>{});
        let vRole = message.guild.roles.get("612350237079633931");
        message.member.addRole(vRole).catch(err => {
            console.log(err);
            return message.channel.send(`${message.author.username}, an error has appeared while trying to verify you: **${err.Message}**.`)
        });
        message.reply("you have been verified! Enjoy the rest of your time here! ✔").then(msg => msg.delete(5000))
    }
};