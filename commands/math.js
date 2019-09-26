module.exports = {
    execute(message, client, args) {
        if (!args) {
            message.channel.send("aight, lemme check your homework...\n\nActually, no, you do it yourself.");
            return;
        }

        if (args.length != 3) {
            message.channel.send("I'm sorry bro, but the format is `b!math add|sub|mul|div <number> <number>`");
            return;
        }

        if (args[0].toLowerCase() === "add") {
            var number = new Number(args[1]) + new Number(args[2]);
            message.channel.send(number);
        }
        else if (args[0].toLowerCase() === "sub") {
            var number = new Number(args[1]) - new Number(args[2]);
            message.channel.send(number);
        }
        else if (args[0].toLowerCase() === "mul") {
            var number = new Number(args[1]) * new Number(args[2]);
            message.channel.send(number);
        }
        else if (args[0].toLowerCase() === "div") {
            if (args[2] == 0) {
                message.channel.send("beeYOND THE OMNIVERSE!!!!!\n\n:moyai:");
                return;
            }
            var number = new Number(args[1]) / new Number(args[2]);
            message.channel.send(number);
        }
        else {
            message.channel.send(number);
        }
	},
};