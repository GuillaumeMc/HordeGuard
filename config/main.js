const { GatewayIntentBits, Partials } = require('discord.js');
const presenceData = require('../config/presence.json');

module.exports = {
    client: {
        constructor: {
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.MessageContent
            ],
            partials: [
                Partials.Channel,
                Partials.Message,
                Partials.User,
                Partials.GuildMember,
                Partials.Reaction
            ],
            presence: {
                activities: [
                    {
                        name: presenceData.activity,
                        type: presenceData.activity_type
                    }
                ],
                status: presenceData.status
            }
        },
        token: "MTE0MjIxMTM5NTQ2Nzg3MDMzMQ.GQIVn8.fqrvbLBp8dk4EyiC-E2-iaYJCtQ8HPmYRPADEU",
        id: "1142211395467870331"
    },

    database: {
        mongodb_uri: 'mongodb+srv://Guillaume:6M8WXfFZF83UDqwM@hordeguardian.4azxuaf.mongodb.net/?retryWrites=true&w=majority'
    },

    apis: {
        
    },

    users: {
        developers: ["1095029386941583450"],
        owner: "832914762873569291"
    }
};