const { MessageEmbed, CategoryChannel } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const num = args[0];
    if(!isNaN(num)) { // Si on a bien récupéré un nombre entre 1 et 100
        if(num >= 1 && num <= 100) {
            const messages = await message.channel.messages.fetch({ // Récupère les messages
                limit: Math.min(num, 100),
                before: message.id,
            });

            try {
                await message.channel.bulkDelete(messages); // Suppression des messages récupérés
                await message.delete(); // Supprime le dernier message en plus
                
                const embed = new MessageEmbed()
                    .setTitle(`⚠️ Il y a eu ici une suppresion de ${num} messages`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setColor("#000")
                    .setTimestamp()
                ;

                return await message.channel.send(embed);
            } catch(error) {
                // console.error(error);
                return message.channel.send('Problem sur la suppression, il faut noter que les messages datant de plus de 14 jours ne peuvent être supprimés à l\'aide de cette commande ... ');
            }
            
        } else {
            return message.reply(`Un nombre entre 1 et 100 est attendu ...`);
        }
    } else {
        return message.reply(`Un nombre est attendu ...`);
    }
};

module.exports.help = { // Toutes les informations de la commande
    name: 'purge', // nom de la commande
    aliases: ['purge', 'purger', 'americannightmare'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Purge un certains nombres de messages', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ le nombre de messages que vou souhaitez supprimer', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'administration', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: true, // Si la commande nécessite des droits particulier
    permissionRequiered: 'ADMINISTRATOR', //Permission minimimum demandé si besoin
};