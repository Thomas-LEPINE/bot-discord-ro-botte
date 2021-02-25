const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    const replies = [
        "Bonne question !",
        "Ne poses plus jamais la question ...",
        "Oui :white_check_mark:",
        "Non :x:",
        "J'ai pas la réponse ...",
        "Sans doute !",
        ":no_entry: Impossible !",
        "No way !",
        "Il vaut mieux ne pas vous le dire maintenant",
        "Hummm, demandez à nouveau plus tard",
        "C'est certain",
        "C'est très probable",
        "Mes sources disent que non",
        "Absolument !",
        "Attend, je regarde les cartes ... Hummmmm, C'est un peu flou, mais au vu des symboles, je pense que la réponse est 'oui'.",
        "Mes sources disent que oui",
        "Réponse vague ... Mais en résumé je dirai oui",
        "Réponse vague ... Mais en résumé je dirai non",
        "Les signes indiquent que oui",
        "Sans aucun doute",
        "Oui ! Sans aucun doute !",
        "D'après les étoiles, ça parait certain !",
        "L'allignement des planètes ne semble pas bon, donc non.",
        "Si on regarde de plus prêt les lois de l'univers et les étoiles, le tout combiné avec les règles mathématiques et les différents théorèmes, je dirai que la réponse est trop compliquée pour vous le dire ...",
        "Je pourrai faire une réponse longue, mais j'ai la flemme, du coup c'est non",
        "Désolé, j'ai pas le temps de répondre, j'ai piscine",
        "Attend, je regarde les cartes ... Hummmmm, C'est un peu flou, mais au vu des symboles, je pense que la réponse est 'non'.",
        "Non ... vraiment non ...",
        "Oui ... Quoique ... Non enfaite ...",
        "Oui, sûr et certain !",
        "Absolument !",        
        "Comme dirait Julien Lepers : 'ET JE DIS OUI OUI OUI !'",
        "... Heuu ... Oui ?",
    ];
    const question = args.join(" "); // Récupère la question qui a été posé
    const response = replies[Math.floor(Math.random() * replies.length)]; // Nombre random
    // var img = new Image();
    // img.src('../../assets/images/eight-ball.png');
    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor("#000")
        .setThumbnail('https://files.u-angers.fr/data/f-95e9748cc34aa5a5.png') // From a distant server
        .addField(question, response)
    ;
    return message.channel.send(embed);
};

module.exports.help = { // Toutes les informations de la commande
    name: '8ball', // nom de la commande
    aliases: ['8ball', 'eightball', '8', 'ia', 'boule'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Eight ball est une intelligence artificielle ultra-entraînée qui permet de répondre aux questions existencielles que vous vous posez (Précision actuelle de l\'IA : 91.494%)', // Description breve de la commande
    args: true, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '+ la question existencielle que vous vous posez', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'fun', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};