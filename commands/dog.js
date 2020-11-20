const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot, message, args) => {
    // API : //https://random.dog/woof.json
    let {body} = await superagent.get(`https://random.dog/woof.json`);
    let dogEmbed = new Discord.RichEmbed()
        .setColor("#E8927C")
        .setTitle("Dog")
        .setImage(body.url);
        message.reply(dogEmbed);
};

module.exports.help = {
    name: 'dog'
};