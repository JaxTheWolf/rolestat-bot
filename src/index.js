const { Client } = require(`discord.js`)
const { CommandParser } = require(`./libs/CommandParser`)
const { join } = require(`path`)
const conf = require(`./conf.json`)
const bot = new Client({ disabledEvents: [`GUILD_SYNC`, `GUILD_UPDATE`, `CHANNEL_CREATE`, `CHANNEL_DELETE`, `CHANNEL_UPDATE`, `TYPING_START`, `RELATIONSHIP_ADD`, `RELATIONSHIP_REMOVE`] })
const cmds = new CommandParser(bot, conf.prefix)

cmds.registerAllIn(join(__dirname, `commands`))
cmds.addType(`action`)

bot.on(`ready`, () => {
  bot.user.setActivity(`Try ${conf.prefix}help!`)
  console.log(`ready`)
})

bot.login(conf.token)
