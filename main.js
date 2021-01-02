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
	client.commands.set(command.help.name, command);
} // Collection regroupant les commandes que nous avons à disposition

/* Préfixe : */
const PREFIXE = config.BOT_PREFIXE;

/* AU DÉMARAGE */
client.on('ready', () => {
	console.log(`${client.user.tag} started !`);
	// console.log(client.commands); // Affiche les commandes utilisables
});

/* CODE */
client.on('message', message => {	
	/* Prépare le message : */
	if (!message.content.startsWith(PREFIXE)) return; // On arrête le code si la commande ne commence pas par le préfixe définit
	if (message.author.bot) return; // Sécurité pour éviter les spams (bot qui se répond à lui même en boucle)
	const args = message.content.slice(PREFIXE.length).split(' ');
	const commandName = args.shift().toLowerCase(); // récupère la commande
	/* ###### */
	
	const command = client.commands.get(commandName) || client.commands.find(commandAlias => commandAlias.help.aliases && commandAlias.help.aliases.includes(commandName)) // Pour inclure les alias à la commande (l'executer avec tous les mots clés qu'on lui aurra associés)
	if (!command) { // Si la commande n'existe pas
		message.channel.send('La commande n\'existe pas (encore)');
		return;
	} else {
		if (command.help.args && !args.length) { /* La commande existe, mais nécessite des arguments => tue && !=0 */
			let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;
	
			if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande : \`${PREFIXE}${command.help.name} ${command.help.usage}\``
	
			return message.channel.send(noArgsReply);
		} else {
			// On execute la commande :
			command.run(client, message, args);
		}
	}
});
/* ##################### */

/* Méthode login sur le client pour se connecter au bot Discord que nous avons créé, en utilisant le jeton du fichier config.json comme mot de passe. Le jeton permet à l'API Discord de savoir à quel bot le programme est destiné. */
client.login(config.BOT_TOKEN);