const { RichEmbed } = require("discord.js");
const xml2js = require('xml2js');
const https = require("https");

module.exports = {
    name: "rule34",
    aliases: ["r34"],
    category: "nsfw",
    description: "Returns an image from www.rule34.xxx",
    usage: "<tags>",
    run: async (client, message, args) => {
        editedmessage = args.slice(0).join(" ")
        var url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + editedmessage;
        https.get(url, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });
   
            res.on('end', function(){
                var parser = new xml2js.Parser();
                parser.parseString(body, function (err, result) {
                    var postCount = result.posts.$.count - 1;
                    if(postCount > 100) {
                        postCount = 100;
                    }
                    if(postCount > 0) {
                        var picNum = Math.floor(Math.random() * postCount) + 0;
                        var r34Pic = result.posts.post[picNum].$.file_url;
                        let embed = new RichEmbed()
                            .setColor("LUMINOUS_VIVID_PINK")
                            .setTitle("Rule34: " + editedmessage)
                            .setFooter(r34Pic)
                            .setImage(r34Pic)
                            .setDescription("Enjoy~!")
                            .setTimestamp()
                        message.channel.send(embed)
                   
                    } else {
                        console.log("Nothing found:", editedmessage);
                        message.channel.send(":regional_indicator_x: Nobody here but us chickens!");
                    }

                    });
                });
            }).on('error', function(e){
                console.log("Got an error: ", e);
        });
    }
};