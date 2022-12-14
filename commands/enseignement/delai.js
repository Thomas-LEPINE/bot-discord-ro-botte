module.exports.run = async (client, message, args) => {
  var time = 0;
  var nb_args = 0;
  var channel_id = 0;
  try {
    // id du channel précédé d'un @ et temps d'un #
    if (args[0][0] == "@") {
      nb_args++;
      channel_id = args[0].slice(1);
      if (args[1][0] == "#") {
        time = args[1].slice(1); //prend à partir du 2ème carctère
        msg = args.slice(2).join(" "); //conversion en list en string (avec un espace entre chaque cellule/mots
        nb_args++;
      } else {
        msg = args.slice(1).join(" ");
      }
    }

    if (args[0][0] == "#") {
      nb_args++;
      time = args[0].slice(1);
      if (args[1][0] == "@") {
        channel_id = args[0].slice(1);
        msg = args.slice(2).join(" ");
        nb_args++;
      } else {
        msg = args.slice(1).join(" ");
      }
    }
    if (args[nb_args] == "") {
      message.channel.send("⚠️ Votre message est vide ⚠️"); //message vide ou uniquement avec les args temps &/ou channel
      return;
    }
    msg = "@**" + message.author.username + "** dit: " + msg; //formatage du msg

    time = parseInt(time);

    if (time < 0 || isNaN(time)) {
      message.channel.send(
        "⚠️ Temps non valide (non entier ou inferieur à 0) ⚠️"
      );
      return;
    }

    if (channel_id != 0) {
      channel = client.channels.cache.get(channel_id);
    }
    
    // si pas d'id choisi le message sera envoyer sur le même channel
    setTimeout(() => {
      if (channel_id == 0) {
        message.channel.send(msg);
      } else {
        channel.send(msg);
      }
    }, time * 1000);
    if (channel_id != 0) {
      message.channel.send(
        `Le message sera envoyé sur le channel __***@${channel.name}***__ dans **__${time}s__**` //confirmation du lancement de la commande via le chat
      );
    }
  } catch (err) {
    console.log(err);
    message.channel.send("⚠️ Le channel spécifié n'a pas été trouvé ⚠️");
  }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'delai', // nom de la commande
    aliases: ['delay','delai'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un message (tel une réponse à une question) après un délai (à spécifier) sur le channel spécifié', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ @<ID DU CHANNEL> + #<TEMPS> + <Le message>', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'enseignement', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};