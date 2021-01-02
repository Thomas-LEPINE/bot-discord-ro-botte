const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  // La fonction associée à la commande :
  const embed = new MessageEmbed()
    .setColor("#ef2312")
    .setTitle("Titre de l'embed")
    .setDescription("Description de ouf")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Le champ", "valeur", false)
    .addFields(
      { name: "1", value: "value 1", inline: true },
      { name: "2", value: "value 2", inline: true }
    )
    .setImage(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter("Footer");

  message.channel.send(embed);
};

module.exports.help = {
  // Toutes les informations de la commande
  name: "embed",
  descritpion: "Renvoie un embed", // Description breve de la commande
  aliases: ["embed"], // Tous les mots clés permettant d'executer la commande
  args: false, // True si la commande nécessite forcément des arguments (false sinon)
  usage: "", // Message d'usage de la commande (indication quand des arguments sont attendus)
};
