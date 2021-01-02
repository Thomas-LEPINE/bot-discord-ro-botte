module.exports.run = (client, message, args) => { // La fonction associée à la commande
    message.channel.send('Pong !');
};

module.exports.help = { // Toutes les informations de la commande
    name: 'ping', // nom de la commande
    aliases: ['ping'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie \"Pong !\"',
    args: false,
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
};