module.exports = {
    name: "verify",
    //aliases: ["bc", "broadcast"],
    category: "verification",
    description: "Verifies the message sender.",
    //usage: "<input>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        let vRole = message.guild.roles.get("612350237079633931");
        message.member.addRole(vRole).catch(err => {
            console.log(err);
            return message.channel.send(`${message.author.username}, an error has appeared while trying to verify you: **${err.Message}**.`)
        });
    }
};