module.exports = {
  name: "mul",
  descritpion: "Effectue la somme des arguments donnés",
  execute(client, message, args) {
    const numArgs = args.map((x) => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => (counter = counter*x));
    message.reply(`La multiplication de tous les arguments est : ${sum} !`);
  },
};