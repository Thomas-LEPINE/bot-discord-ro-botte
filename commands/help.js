const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
/* Préfixe : */
const PREFIX = config.BOT_PREFIX;
const { readdirSync } = require("fs"); // Lecture de fichiers (ici les fichiers dans command)


module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    if (!args.lenght) { // Si la commande n'a pas d'argument (on ne s'interesse à TOUTES LES COMMANDES)
        const embed = 
            new MessageEmbed()
            .setColor('#36393F')
            .addField('Liste des commandes', 
                `Une liste de toutes les sous-catégories disponibles et leurs commandes\nPour plus d'informations sur une commande, tapez : \n\`${PREFIX}help <nom_de_la_commande>\`\n`)
        ;

        for (const command of client.commands) {
            embed.addField(
                `${command[1].help.name}`,
                // `Nécessite des arguments : ${command[1].help.args}`,
                `Voici un exemple de comment utiliser la commande : \`${PREFIX}${command[1].help.name} ${command[1].help.usage}\``,
                false
            );
        }
        message.channel.send(embed);
    }

};

module.exports.help = { // Toutes les informations de la commande
    name: 'help', // nom de la commande
    aliases: ['help'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Aide, renvoie une liste de commandes ou les informations sur une seule !', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
};