
module.exports.run = async (client, message, args) => {

    return await message.channel.send('https://thispersondoesnotexist.com/image').catch(console.error);
};

module.exports.help = {
    name: 'thispersondoesnotexist', // nom de la commande
    aliases: ['thispersondoesnotexist', 'notexist', 'newface', 'faceia'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie une personne qui n\'existe pas (crée par une IA)', //\nEnvoyez un code d\'erreur HTTP pour obtenir une petite surprise // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'api', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};