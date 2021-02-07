const gifSearch = require('gif-search'); // Doc Github : https://github.com/selcher/gif-search

module.exports.run = async (client, message, args) => {
    
    if (Object.keys(args).length >= 2) { return message.channel.send('⚠️ Un seul argument est attendus : le numéro de la slide souhaitée'); }
    if(isNaN(args)) { return message.channel.send('⚠️ Un nombre valide est attendu'); } // Si on a bien récupéré un nombre
    const num = args[0];
    switch(num) {
        case '1':
            await message.channel.send({files: ['./assets/images/presentation/slide (1).jpg']});
            break;
        case '2':
            await message.channel.send({files: ['./assets/images/presentation/slide (2).jpg']});
            break;
        case '3':
            await message.channel.send({files: ['./assets/images/presentation/slide (3).jpg']});
            break;
        case '4':
            await message.channel.send({files: ['./assets/images/presentation/slide (4).jpg']});
            break;
        case '5':
            await message.channel.send({files: ['./assets/images/presentation/slide (5).jpg']});
            break;
        case '6':
            await message.channel.send({files: ['./assets/images/presentation/slide (6).jpg']});
            break;
        case '7':
            await message.channel.send('Désolé, il n\'y a pas plus de slide ... La présentation était finie ... C\'était bien n\'est-ce pas ?! 😃');
            break;

        default:
            try {
                gifSearch.query('error 404').then((gifurl2) => { // Recherche un gif correspondant aux arguments
                    if (gifurl2 != undefined) {
                        message.channel.send(gifurl2);
                    } else {
                        message.channel.send("Not found ...");
                    }
                }).catch(err => console.log('cmd gif (try1)' + err));
            } catch(error){}
            break;
    }
    return;
};

module.exports.help = {
    name: 'presentation', // nom de la commande
    aliases: ['presentation', 'pres', 'slide'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie une slide', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ le numéro de la slide', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'divers', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};