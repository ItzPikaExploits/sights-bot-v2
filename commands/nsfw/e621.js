const xml2js = require('xml2js');
const https = require("https");
const request = require("request");
module.exports = {
    name: "e621",
    aliases: ["e6"],
    category: "nsfw",
    description: "Returns an image from E621",
    usage: "<tags>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        params = args.slice(0).join(" ")
        var tagesto = "";
        var tagestosplit = params.split(",");
        for (var i = 0; i < tagestosplit.length; i++) {
            tagestosplit[i] = tagestosplit[i].trim();
            tagestosplit[i] = tagestosplit[i].replace(/\s/g, "_");
        }

        tagesto = tagestosplit.join("+");

        if (message.channel.type === "dm" || message.channel.name.indexOf("the_art_gallery") != -1 || message.channel.name.indexOf("furry") != -1 || message.channel.name.indexOf("2am") != -1 || message.channel.name.indexOf("nsfw") != -1) {
            console.log("Safe to post NSFW content.");
        }
        else {
            tagesto += "+rating:safe";
            if ((tagesto.indexOf("rating:explicit") != -1) || (tagesto.indexOf("penis") != -1) || (tagesto.indexOf("pussy") != -1) || (tagesto.indexOf("anus") != -1) || (tagesto.indexOf("dick") != -1) || tagesto.indexOf("rating:questionable") != -1 || tagesto.indexOf("genitalia") != -1 || tagesto.indexOf("genitals") != -1 || tagesto.indexOf("genital") != -1 || tagesto.indexOf("vagina") != -1 || tagesto.indexOf("cunt") != -1 || tagesto.indexOf("vaginal") != -1 || tagesto.indexOf("vaginal_penetration") != -1 || tagesto.indexOf("sex") != -1 || tagesto.indexOf("fuck") != -1 || tagesto.indexOf("intercourse") != -1 || tagesto.indexOf("cock") != -1) {
                message.channel.send("That content isn't appropiate for this channel. Go be naughty elsewhere.", {files:[{attachment: __dirname + bruh.jpg}]});
                return;
            }
        }
        var estoHeader = {
            url: 'https://e621.net/post/index.json?tags=order:random+' + tagesto,
            headers: {
                'User-Agent': 'Yoshi-Bot/${process.version} (by NeoNinetales on e621)'
            }
        }

        request(estoHeader,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var estoThing = JSON.parse(body);
                if (typeof (estoThing[0]) != "undefined") {
                    let embed = new RichEmbed()
                        .setColor("LUMINOUS_VIVID_PINK")
                        .setTitle("E621: " + editedmessage)
                        .setFooter(estoThing[0].file_url.toString())
                        .setImage("https://e621.net/post/show/" + estoThing[0].id.toString())
                        .setDescription("Enjoy~!")
                        .setTimestamp()
                    message.channel.send(embed)
                }
                else {
                    message.channel.send("No images found. Try different tags.")
                }
            }
            else {
                console.log(error);
            }
        });
    }
};