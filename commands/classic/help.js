const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
/* Préfixe : */
const PREFIX = config.BOT_PREFIX;
const { readdirSync } = require("fs"); // Lecture de fichiers (ici les fichiers dans command)
const categoryOfCommandsList = readdirSync('./commands'); // Renvoie un array du nom de nos dossiers

module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    if (!Object.keys(args).length) { // Si la commande n'a pas d'arguments (on ne s'interesse à TOUTES LES COMMANDES)
        const embed = 
            new MessageEmbed()
            .setColor('#efef12')
            .addField('Liste des commandes', 
                `Une liste de toutes les sous-catégories disponibles et leurs commandes\nPour plus d'informations sur une commande, tapez : \n\`${PREFIX}help <nom_de_la_commande>\`\n`)
        ;

        for (const category of categoryOfCommandsList) {
            /* VERSION LIGHT : */
            // embed.addField(
            //     `:small_orange_diamond: ${category.toUpperCase()} :`,
            //     `${client.commands.filter(cate => cate.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(`\n`)}`,
            //     false
            // );

            /* VERSION COMPLETE */
            embed.addField(
                `:small_orange_diamond: ${category.toUpperCase()} :`,
                '-',
                true
            );
            for (const command of client.commands) {
                if (command[1].help.category === category) {
                    embed.addField(
                        `${PREFIX}${command[1].help.name}`,
                        // :small_orange_diamond: 
                        // `Nécessite des arguments : ${command[1].help.args}`,
                        `${command[1].help.descritpion}`,
                        false
                    );
                }
            }
        }
        return message.channel.send(embed);
    } else { // Aide pour UNE commande précise
        const command = client.commands.get(args[0]) || client.commands.find(commandAlias => commandAlias.help.aliases && commandAlias.help.aliases.includes(args[0])); // Pour inclure les alias à la commande (l'executer avec tous les mots clés qu'on lui aurra associés)
        if (!command) return message.channel.send(':no_entry: La commande n\'existe pas (encore) ...');
        const embed = 
            new MessageEmbed()
            .setColor('#efef12')
            .setTitle(`\`${PREFIX}${command.help.name}\``)
            .addField(
                'Description', 
                `${command.help.descritpion}`
            )
        ;

        if (Object.keys(command.help.aliases).length > 1) {
            // Renvoie la liste des aliases permettant d'accèder à la commande
            embed.addField(
                "Exemple d'utilisation",
                command.help.args
                ? `\`${PREFIX}${command.help.name} ${command.help.usage}\``
                : `\`${PREFIX}${command.help.name}\``,
                true
            );
            embed.addField(
                "Alias : ",
                `${command.help.aliases.join(", ")}`,
                true
            );
        }
        return message.channel.send(embed);
    }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'help', // nom de la commande
    aliases: ['help'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Aide, renvoie une liste de commandes ou les informations sur une seule !', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'classic', // Categorie de la commande (le nom du repertoire dans notre cas)
};