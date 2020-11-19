const Discord = require("discord.js");
const config = require("./config.json");

/*  Créer un nouveau Discord.Client et l'attribue au client constant. Ce client permet en partie d'interagir avec l'API Discord */
const client = new Discord.Client();

/* CODE */
const prefix = "!";
client.on("message", function(message) {
	/* Prépare le message : */
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;  
	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	
	/* Traitement du message */
	if (command === "ping") {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! (Lol !) Le temps de latence est : ${timeTaken}ms.`);
	}	
	else if (command === "sum") {
		const numArgs = args.map(x => parseFloat(x));
		const sum = numArgs.reduce((counter, x) => counter += x);
		message.reply(`La somme de tous les arguments est : ${sum} !`);
	}
});

/* ##################### */

/* a méthode login sur le client pour se connecter au bot Discord que vous avez créé, en utilisant le jeton du fichier config.json comme mot de passe. Le jeton permet à l'API Discord de savoir à quel bot le programme est destiné et que vous avez été authentifié pour utiliser le bot. */
client.login(config.BOT_TOKEN);