module.exports = {
  name: "sum",
  descritpion: "Effectue la somme des arguments donnés",
  execute(client, message, args) {
    const numArgs = args.map((x) => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => (counter += x));
    message.reply(`La somme de tous les arguments est : ${sum} !`);
  },
};
