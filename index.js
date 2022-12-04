const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
require("dotenv").config();
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus } = require('@discordjs/voice');

const player = createAudioPlayer();

const client = new Discord.Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
]});

client.on('ready', () => {
    console.log('The bot is online!');
});

client.on('messageCreate', msg => {
    if (msg.content) {
        var mention = msg.mentions.users.first();
        var sender = msg.author;
        var msgContent = msg.content.toLowerCase();
        var message = msgContent.split(" ");
        if (message[0] == 'kontol') {
            msg.delete(1000);
            msg.reply('You said a badword!');
        }
        if (message[0] == '!') return msg.reply('Add any command here!');
        if (message[0] == '!say') {
            if (message[1] != 'hello') return msg.reply('please do !say hello');
            msg.reply(`Hello! ${sender}`); 
        } 
        if (message[0] == '!version') return msg.reply('Current version v1.0.0');
        if (message[0] == '!call') {
            if (!mention) return msg.reply('Please mention a user!');
            msg.reply(`${mention} has been called by ${sender}`);
        }
        if (message[0] == '!join') {
            const joinChannel = joinVoiceChannel({
                channelId: msg.member.voice.channel.id,
                guildId: msg.guild.id,
                adapterCreator: msg.guild.voiceAdapterCreator
            })
            msg.reply('Joining voice channel...');
            joinChannel;
        }

        // if (message[0] == '!play') {
        //     const joinChannel = joinVoiceChannel({
        //         channelId: msg.member.voice.channel.id,
        //         guildId: msg.guild.id,
        //         adapterCreator: msg.guild.voiceAdapterCreator
        //     })
        //     const resource = createAudioResource('https://open.spotify.com/track/2T43UrvAg60ubJVo5KQ3t7?si=253a097c4a994fb0', {
        //         inputType: StreamType.Arbitrary
        //     });
        //     player.play(resource);
        //     joinChannel.subscribe(player);
        //     msg.reply('Playing audio...');
        // }

        
    }
});

client.login(process.env.TOKEN);