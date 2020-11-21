const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs"); // Lecture de fichiers (ici les fichiers dans command)

/*  Créer un nouveau Discord.Client et l'attribue au client constant. Ce client permet en partie d'interagir avec l'API Discord */
const client = new Discord.Client();

/* mettre les commands dans des fichiers externes */
client.commands = new Discord.Collection(); // prépare la récupération des fichiers commands
const commandList = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Récupère tous les fichiers .js dans commands
for (const file of commandList) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
} // Collection regroupant les commandes que nous avons à disposition

/* Préfixe : */
const prefix = config.BOT_PREFIXE;

/* AU DÉMARAGE */
client.on('ready', () => {
	console.log(`${client.user.tag} started !`);
});

/* CODE */
client.on('message', message => {
	
	/* Prépare le message : */
	if (!message.content.startsWith(prefix)) return; // On arrête le code si la commande ne commence pas par le préfixe définit
	if(message.author.bot) return; // sécurité pour éviter les spams (bot qui se répond à lui même en boucle)
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase(); // récupère la commande
	/* ###### */

	/* Execution de la commande si elle existe */
	if (!client.commands.has(command)) { // Si la commande n'existe pas
		message.channel.send('La commande n\'existe pas (encore)');
		// return
	} else {
		client.commands.get(command).execute(client, message, args);
	}
});

/* ##################### */

/* Méthode login sur le client pour se connecter au bot Discord que nous avons créé, en utilisant le jeton du fichier config.json comme mot de passe. Le jeton permet à l'API Discord de savoir à quel bot le programme est destiné. */
client.login(config.BOT_TOKEN);