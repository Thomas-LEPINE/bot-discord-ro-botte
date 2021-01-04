module.exports.run = async(client, message, args) => {
    
    message.channel.send('Bah non tu peux pas le stopper, t\'as qu\'\à être dev.');
};

module.exports.help = {
    name: 'exit', // nom de la commande
    aliases: ['exit', 'stop'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Aide les débiles, et les remet à leur place', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
};