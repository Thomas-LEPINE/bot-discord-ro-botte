module.exports.run = (client, message, args) => {
    // La fonction associée à la commande :
    const replies = [
        "t'inquiète pas, tu vas y arriver !",
        "accroche toi ! Je sais que tu peux le faire !",
        "tu sais, la vie mettra des pierres sur ta route. À toi de décider d’en faire des murs ou des ponts, je te connais, je sais que tu feras de supers ponts ! 🙂",
        "c’est une période difficile pour toi, je le sais, mais tu peux compter sur moi pour t’accompagner !",
        "quand la vie te donne une centaine de raisons de pleurer, montre-lui que tu en as mille de sourire !",
        "tkt",
        "tu vas y arriver !",
        "accroche-toi ! Go go go !",
        "ok ...",
        "allez vas-y, accroche toi !",
        "tout va bien se passer",
        "bon courage !",
        "tu peux le faire, je crois en toi !",
        "tout va bien",
        "ça va bien se passer !",
        "fais une pause",
        "prend un café et tout ira bien",
        "prend une grande respiration !",
        "fais un peu de sport pour t'aérer l'esprit et tout ira bien !",
    ];
    let response = replies[Math.floor(Math.random() * replies.length)]; // Nombre random
    message.reply(response);
};

module.exports.help = { // Toutes les informations de la commande
    name: 'reconfort', // nom de la commande
    aliases: ['reconfort', 'aled', 'alaid', 'ausecours', 'ausecours', 'pleur', 'triste', 'mayday', 'cry'], // Tous les mots clés permettant d'executer la commande
    descritpion: 'Renvoie un message de réconfort', // Description breve de la commande
    args: false, // True si la commande nécessite forcément des arguments (false sinon)
    usage: '', // Message d'usage de la commande (indication quand des arguments sont attendus)
    category: 'divers', // Categorie de la commande (le nom du repertoire dans notre cas)
    permission: false, // Si la commande nécessite des droits particulier
    permissionRequiered: '', //Permission minimimum demandé si besoin
};