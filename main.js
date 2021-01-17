const Discord = require("discord.js");
const config = require("./config.json");
const { readdirSync } = require("fs"); // Lecture de fichiers (ici les fichiers dans command)

/*  Créer un nouveau Discord.Client et l'attribue au client constant. Ce client permet en partie d'interagir avec l'API Discord */
const client = new Discord.Client();

/* Préfixe : */
const PREFIX = config.BOT_PREFIX;

/* Récupérer les commands dans le dossier commands */
client.commands = new Discord.Collection(); // prépare la récupération des fichiers commands
const loadCommands = (dir = "./commands/") => { // On se place au niveau du dossier "commands"
	readdirSync(dir).forEach(rep => { // On récupère chaque sous repertoire de ce dossier (puis on les parcours)
		const commandList = readdirSync(`${dir}/${rep}/`).filter(file => file.endsWith('.js'));
		for (const file of commandList) {
			const command = require(`${dir}/${rep}/${file}`); // On récuprère le fichier
			client.commands.set(command.help.name, command);
		} // Collection regroupant les commandes que nous avons à disposition
	});
};

/* AU DÉMARAGE */
client.on('ready', () => {
	loadCommands(); // On charge les commandes au démarrage
	console.log(`${client.user.tag} started !`);
	// console.log(client.commands); // Affiche les commandes utilisables
});

/* CODE EXECUTÉ LORS DE LA DETECTION D'UN NOUVEAU MESSAGE */
client.on('message', message => {	
	/* Prépare le message : */
	if (!message.content.startsWith(PREFIX)) return; // On arrête le code si la commande ne commence pas par le préfixe définit
	if (message.author.bot) return; // Sécurité pour éviter les spams (bot qui se répond à lui même en boucle)
	const args = message.content.slice(PREFIX.length).split(' '); // Split la commande (sépare les mots par rapport aux espaces)
	const commandName = args.shift().toLowerCase(); // Récupère la commande
	/* ###### */
	
	const command = client.commands.get(commandName) || client.commands.find(commandAlias => commandAlias.help.aliases && commandAlias.help.aliases.includes(commandName)); // Pour inclure les alias à la commande (l'executer avec tous les mots clés qu'on lui aurra associés)
	if (!command) { // Si la commande n'existe pas
		return message.channel.send(':no_entry: La commande n\'existe pas (encore) ...');
	} else {
		if(command.help.permission && !message.member.hasPermission(command.help.permissionRequiered)) { // Doc : https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
			return message.channel.send(`Vous devez disposer de certains droits pour effectuer cette commande : ${command.help.permissionRequiered}`);
		} else {	
			if (command.help.args && !args.length) { /* La commande existe, mais nécessite des arguments => true && !=0 */
				let errorArgs = `:warning: Il faut des arguments pour cette commande, ${message.author} !`;
		
				if (command.help.usage) errorArgs += `\nVoici un exemple de comment utiliser la commande : \`${PREFIX}${command.help.name} ${command.help.usage}\``
		
				return message.channel.send(errorArgs);
			} else {
				// On execute la commande :
				command.run(client, message, args);
			}
		}
	}
});
/* ##################### */

/* Méthode login sur le client pour se connecter au bot Discord que nous avons créé, en utilisant le jeton du fichier config.json comme mot de passe. Le jeton permet à l'API Discord de savoir à quel bot le programme est destiné. */
client.login(config.BOT_TOKEN);