'use strict';
// recommended. double check in all pull requests

// It's open source, we don't want our bot to get controlled by someone else!
// That's bad magic, so we use good magic!
const TOKEN_ID = process.env.tokenid;
const URI = process.env.mongodburi;

const client = new MongoClient(URI, { useNewUrlParser: true });

const prefix = "b!";

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const Discord = require('discord.js');
const client = new Discord.Client();

MongoClient.connect(URI, function (err, code) {
    const db = code.db();
    db.createCollection("usercol");
});

const cmdlist = require('./cmdlist.json');

// implemented from example repository, changed a few things
const commands = new Array();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var stuff = 0;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    commands[stuff] = command;
    stuff++;
}
// end

client.on('ready', () => {
    client.user.setPresence({ game: { name: " bruh moments in " + client.guilds.array().length + " servers", type: "WATCHING"}})
    console.log('bruh');
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    const id = cmdlist.arraylmao.indexOf(command);

	MongoClient.connect(URI, function (err, code) {
        if (err != null) { console.log(err); return; }
        const db = code.db();
        db.collections().then((value) => {
            const usercol = value[0];
            if (!usercol.findOne({ id: message.author.id })) {
                var user = { id: message.author.id, exp: 1, nextexp: 250, level: 0 }
                usercol.insert(user);
            }
            else {
                usercol.findOne({ id: message.author.id }, function (err, res) {
                    var newuser = res;
                    newuser.exp++;
                    if (newuser.exp > (newuser.nextexp - 1)) {
                        newuser.level++;
                        newuser.nextexp = Math.floor(newuser.nextexp * 1.25);
                        newuser.exp = 0;
                        message.channel.send("<@" + message.author.id + "> **CONGRATULATIONS!** You leveled up to " + newuser.level + "!");
                    }
                    usercol.findOneAndReplace({ id: message.author.id }, newuser);
                });
            }
        });
    });

    if (id < 0) {
        return;
    }

    try {
        commands[id].execute(message, client, args);
    } catch (error) {
        console.error(error);
        message.channel.send('omg totally bruh moment. The command has an error.');
        setTimeout(() => {
            message.channel.send('please check https://www.github.com/KaanGaming/bruhbot/issues and make an issue. We\'ll check it and find out if any errors.');
        }, 100);
    }
});

client.login(TOKEN_ID);