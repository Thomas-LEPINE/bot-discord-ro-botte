const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  // La fonction associée à la commande :

  var nb_group;
  if (Object.keys(args).length == 0) {
    // Si la commande a des arguments
    nb_group = 2;
  } else {
    if (Number(args[0]) < 0 || isNaN(Number(args[0]))) {
      return message.channel.send("⚠️ Nombre de incorrect (inferieur à 0) ⚠️");
    } else if (Number(args[0]) < 10) {
      nb_group = Number(args[0]);
    } else {
      nb_group = 10;
    }
  }

  var group_name;
  if (Object.keys(args).length < 1) {
    // Si la commande a des arguments
    group_name = "par défaut";
  } else {
    group_name = args[1];
  }

  message.channel
    .send(
      `📢 **S'inscrire à l'un des groupes à l'aide des réactions**\n⚠️ (Maximum de 10 groupes) : _${nb_group}_ groupes\n__Chef de groupe:__ @\`${message.author.tag}\` ID\`${message.author.id}\``
    )
    .then(async (msg) => {
      for (i = 0; i < nb_group; i++) {
        await msg.react(i + "️⃣");
      }
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'group', // nom de la commande
    aliases: ['group', 'grp', 'groupe', 'reunion'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Créé une réunion avec le nombre de groupe demandé', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ le nombre de groupe', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'enseignement', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};
