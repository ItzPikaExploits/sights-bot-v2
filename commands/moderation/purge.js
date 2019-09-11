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
        if (!args[0]) message.reply("how much do you want us to delete?").then(m => m.delete(5000));
        let msgAmount = Number(args[0]);
        if (msgAmount === NaN) message.reply("that is not a valid number!").then(m => m.delete(5000));
        msgAmount = Math.round(msgAmount);
        msgAmount.channel.bulkDelete(msgAmount)
            .catch(err => console.log(err));
    }
};