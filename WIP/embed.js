const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'embed',
    descritpion: 'Renvoie un embed',
    execute(client, message, args) {
        const embed = new MessageEmbed()
            .setColor("#ef2312")
            .setTitle("Titre de l'embed")
            .setDescription("Description de ouf")
            .setThumbnail(client.user.displayAvatarURL())
            .addField("Le champ", "valeur", false)
            .addFields(
                { name: '1', value: 'value 1', inline: true },
                { name: '2', value: 'value 2', inline: true },
            )
            .setImage(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter('Footer');

        message.channel.send(embed);
    }
}