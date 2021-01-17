const request = require('request');
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    request('https://data.angers.fr/api/records/1.0/search/?dataset=parking-angers&q=&rows=18&facet=nom', function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        const obj = JSON.parse(body);

        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(":blue_car:   Parking Actu Angers !   :blue_car:")
            .setDescription("=> La listes des places disponible dans tout Angers !")
            .setThumbnail('https://static.data.gouv.fr/avatars/58/da9908bc7c42f48a9ddd61e873fe91.png')
            .setURL('https://data.angers.fr/explore/dataset/parking-angers/api/?rows=18')
            .setFooter('Check open data Angers !', 'https://static.data.gouv.fr/avatars/58/da9908bc7c42f48a9ddd61e873fe91.png')
            .addField('\u200B',  '\u200B')
        ;

        for (let i = 0; i < obj.parameters.rows; i++) {
            const nbplaces = obj.records[i].fields.disponible
            const nom = obj.records[i].fields.nom
            embed.addField(`${nom}`, `${nbplaces} places restantes`, true );
        }     
        embed.addField('\u200B',  '\u200B')
        message.channel.send(embed);
    });
};

module.exports.help = { // Toutes les informations de la commande
    name: 'parking', // nom de la commande
    aliases: ['parking'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Les places de parkings restantes dans Angers !', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};