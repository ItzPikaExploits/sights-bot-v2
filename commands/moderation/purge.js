module.exports = {
    name: "purge",
    aliases: ["prune"],
    category: "moderation",
    description: "Cleans the amount of messages given by the user.",
    usage: "<amount/int>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        if (message.channel.type == "dm") return;
        if (!message.member.hasPermission("MANAGE_MESSAGES")) 
            return message.reply("you do not have the MANAGE_MESSAGES permission!").then(m => m.delete(5000));
        if (!args[0]) 
            return message.reply("how much do you want us to delete?").then(m => m.delete(5000));
        if (isNaN(args[0]))
            return message.reply("supply a valid amount of messages to purge.").then(m => m.delete(5000));
        if (args[0] > 100)
            return message.reply("supply a valid amount of messages below 100 to purge.").then(m => m.delete(5000));
        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send("Successfully purged the given amount! ✅").then(m => m.delete(5000)))
            .catch(error => {
                console.log(error);
                message.channel.send("An error has been caught while trying to complete this action! ❌");
            });
    }
};