module.exports.run = (client, message, args) => {
  // La fonction associée à la commande :
  const numArgs = args.map((x) => parseFloat(x));
  const sum = numArgs.reduce((counter, x) => (counter = counter*x));
  message.reply(`La multiplication de tous les arguments est : ${sum} !`);
};

module.exports.help = { // Toutes les informations de la commande
  name: "mul",
  descritpion: "Effectue le produit des arguments donnés",
  aliases: ['mul', 'multiplication', 'multi'], // Tous les mots clés permettant d'executer la commande
  args: true, // True si la commande nécessite forcément des arguments (false sinon)
  usage: 'nombre1 nombre2 ...', // Message d'usage de la commande (indication quand des arguments sont attendus)
};