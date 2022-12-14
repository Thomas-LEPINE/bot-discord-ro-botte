const fetch = require("node-fetch"); // API
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
    // La fonction associée à la commande :
    if (!Object.keys(args).length) {
      // Si la commande n'a pas d'arguments
      const embed = new MessageEmbed().setColor("#666666");
      const cat = await fetch("http://aws.random.cat/meow")
        .then((res) => res.json()) // On récupère un Json
        .then((json) => json.file);
      
        embed.setImage(cat).setFooter("API : http://aws.random.cat/meow");
        return message.channel.send(embed);
    } else {
        if (!isNaN(args[0])) {
          // Si on a bien récupéré un nombre
          return message.channel
            .send("https://http.cat/" + args[0])
            .catch(console.error);
        } else {
            // On retourne un chat random
          const embed = new MessageEmbed().setColor("#666666");
          const cat = await fetch("http://aws.random.cat/meow")
            .then((res) => res.json()) // On récupère un Json
            .then((json) => json.file);

          embed.setImage(cat).setFooter("API : http://aws.random.cat/meow");
          return message.channel.send(embed);
        }
    }
};

module.exports.help = {
    name: 'cat', // nom de la commande
    aliases: ['cat', 'cats', 'chat', 'chats'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie une image de chat (miaou)', //\nEnvoyez un code d\'erreur HTTP pour obtenir une petite surprise // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ HTTP error (facultatif)', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'api', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};