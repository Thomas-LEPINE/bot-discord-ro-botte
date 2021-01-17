module.exports.run = (client, message, args) => { // La fonction associée à la commande
    const numEdition = args[0];
    const lienEdition = 'https://alligator-news-polytech-angers.github.io/pop-news/edition' + numEdition + '.html'
    message.reply(`Voici l'édition numéro ${args} : \n ${lienEdition}`);
};

module.exports.help = { // Toutes les informations de la commande
    name: "alligatorgnews",
    descritpion: "Retourne une édtion d'alligator news si elle existe",
    aliases: ['alligatornews', 'algnews', 'journal'],
    usage: '+ le numéro de l\'édition souhaitée',
    args: true, // Nécessite des arguments
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};