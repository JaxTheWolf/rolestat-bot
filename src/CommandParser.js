const { RichEmbed } = require(`discord.js`)
const EventEmitter = require(`events`)

/** Class that handles commands */
class Parser extends EventEmitter {
  /**
   * @param {Client} client - The client the parser is for
   * @param  {string} prefix - The command prefix
   * */
  constructor (client, prefix) {
    super()
    this.prefix = prefix
    this.client = client
    this.cmds = {}
    this.helplist = {}
    this.type = {
      OWNER: `OWNER`,
      INFO: `INFO`,
      UTIL: `UTIL`,
      MISC: `MISC`
    }
    /**
     * Registers commands. The command file must export and object
     * @param {object} cmd - The command object
     * @param {string} cmd.invoke - The invoke of a command
     * @param {string[]} cmd.aliases - The aliases of a command
     * @param {string} cmd.desc - The description that will be shown with the help command
     * @param {string} cmd.help - The help message. E.g.: "<message>"
     * @param {string} cmd.type - The type of the command
     * @param {Function|AsyncFunction} cmd.cmdFunc - The function that'll be executed if an invoke is found in a message. The function should return a Promise!
     * @return {Parser}
     * */
    this.register = (cmd) => {
      if (typeof cmd !== `object`) {
        return client.emit(`warn`, `Command isn't an object. Skipping!`)
      }
      if (cmd.type) {
        cmd.type = cmd.type.toUpperCase()
      }
      this.cmds[cmd.invoke] = {
        cmdFunc: cmd.cmdFunc,
        invoke: cmd.invoke,
        root: cmd.invoke,
        desc: cmd.desc === `` ? `no description` : cmd.desc,
        help: cmd.help === `` ? `no help` : `${this.prefix}${cmd.invoke} ${cmd.help}`,
        type: cmd.type === `` ? `Misc` : cmd.type
      }
      if (cmd.aliases.length > 0) {
        if (cmd.aliases) {
          cmd.aliases.forEach(a => {
            this.cmds[a] = {
              cmdFunc: cmd.cmdFunc,
              invoke: cmd.invoke,
              root: cmd.invoke,
              desc: cmd.desc === `` ? `no description` : cmd.desc,
              help: cmd.help === `` ? `no help` : this.prefix + cmd.help,
              type: cmd.type === `` ? `Misc` : cmd.type
            }
          })
        }
      }
      this.helplist[cmd.invoke] = {
        cmdFunc: cmd.cmdFunc,
        invoke: cmd.invoke,
        aliases: cmd.aliases,
        root: cmd.invoke,
        desc: cmd.desc === `` ? `no description` : cmd.desc,
        help: cmd.help === `` ? `no help` : this.prefix + cmd.help,
        type: cmd.type === `` ? `Misc` : cmd.type
      }
      return this
    }

    /**
     * Registers all commands from an array
     * @param {array} cmds - An array of command objects
     * @return {Parser}
     */
    this.registerAll = (cmds) => {
      cmds.forEach(cmd => {
        return this.register(cmd)
      })
    }

    /**
     * Registers all commands from a directory
     * @param {string|RequireAllOptions} options - The path to the directory or a require-all options object
     * @return {Parser}
     * @example
     * const path = require(`path`)
     * cmds.registerAllIn(path.join(__dirname, `commands`))
     */
    this.registerAllIn = (options) => {
      const obj = require(`require-all`)(options)
      const commands = []
      for (const cmd of Object.values(obj)) {
        commands.push(cmd[Object.keys(cmd)[0]])
      }
      return this.registerAll(commands)
    }

    /**
     * Registers new command type(s)
     * @param {string|string[]} type - An array containing types or a string
     * @return {Parser}
     */
    this.addType = typename => {
      if (Array.isArray(typename)) {
        typename.forEach(t => {
          if (typeof t !== 'string' || !t) {
            console.log('[CMDPARSER] Could not set new type: Invalid argument!')
          } else {
            t = t.toUpperCase()
            this.type[t] = t
          }
        })
      } else
      if (typeof typename !== 'string' || !typename) {
        console.log('[CMDPARSER] Could not set new type: Invalid argument!')
      } else {
        typename = typename.toUpperCase()
        this.type[typename] = typename
      }
      return this
    }

    /**
     * Sends a help message containing all commands and their descriptions in a RichEmbed
     * @param {Channel} channel - The channel the message will be sent to
     * @param {string} [invoke] - The command invoke
     * @return {Promise}
     */
    this.sendHelpMsg = (chan, invoke) => {
      let msg
      const emb = new RichEmbed().setColor(0x00FF00)
      if (invoke) {
        const cmd = this.cmds[invoke]
        try {
          emb
            .addField(`Description`, cmd.desc)
            .addField(`Aliases`, (() => {
              if (this.helplist[invoke]) {
                return this.helplist[invoke].aliases.length > 0 ? this.helplist[invoke].aliases.join(`, `) : `*No aliases*`
              }
              return `*You provided help for a command via an alias, so here will no aliases be shown. Request help for root command to get list of aliases:*\n` +
                           `**Root Invoke:** \`${cmd.root}\``
            })())
            .addField(`Usage`, cmd.help)
            .addField(`Type`, cmd.type, true)
        } catch (e) {
          console.log(e)
          emb
            .setColor(0xFF0000)
            .setDescription(`ERROR! Command not found`)
        }
      } else {
        /* eslint-disable */
        let catlist = {}
        for (let cat in this.type) {
          catlist[cat] = {}
          for (let inv in this.helplist) {
            let cmd = this.helplist[inv]
            if (cmd.type === cat) {
              catlist[cat][inv] = cmd
            }
          }
        }
        for (let cat in catlist) {
          let localcmdlist = ``
          for (let inv in catlist[cat]) {
            let cmd = catlist[cat][inv]
            localcmdlist += `**${cmd.invoke}**  -  ${cmd.desc}\n`
          }
          if (localcmdlist !== ``) {
            emb.addField(cat, localcmdlist + `-----\n`)
          }
        }
      }
      /* esling-enable */
      chan.send(``, emb).then(m => { msg = m; return msg })
      return msg
    }

    /**
     * Returns the current date in a "d.m.y - h:m:s" format
     * @return {string}
     */
    this.getTime = () => {
      function btf (inp) {
        if (inp < 10) { return `0` + inp }
        return inp
      }
      const date = new Date()
      const y = date.getFullYear()
      const m = btf(date.getMonth() + 1)
      const d = btf(date.getDate())
      const h = btf(date.getHours())
      const min = btf(date.getMinutes())
      const s = btf(date.getSeconds())
      return `[${d}.${m}.${y} - ${h}:${min}:${s}]`
    }

    /**
     * Parses a message and if it includes a valid command invoke; a corresponding command will be executed
     * @param {Message} msg - The message that will be parsed
     * @return {Parser}
     */
    this.parse = msg => {
      const cont = msg.content
      const author = msg.member
      const guild = msg.guild
      const chan = msg.channel

      if (author === null) return
      this.checkPrefix = () => {
        if (cont.startsWith(this.prefix)) {
          return true
        }
      }
      if (author.tag !== this.client.user.tag && this.checkPrefix()) {
        const invoke = cont
          .split(/ +/g)[0]
          .substr(this.prefix.length)
        const args = cont.split(/ +/g)
          .slice(1)
          .map(a => a.indexOf(` `) > 0 ? a.replace(`"`, ``).replace(`"`, ``) : a)
        if (invoke === `help`) {
          this.sendHelpMsg(chan, args[0])
        } else if (invoke in this.cmds) {
          console.log(`[COMMAND] ${this.getTime()} (${author.user.username} @ ${guild.name}) '${cont}'`)
          const promise = this.cmds[invoke].cmdFunc(msg, args, this.client)
          if (!promise) {
            console.log(`CMDs not returning Promises is deprecated!`)
          } else {
            promise
              .then(() => {
                this.emit(`commandExecuted`, msg)
              })
              .catch(err => {
                this.emit(`commandFailed`, msg, err)
              })
          }
        }
      }
      return this
    }
    client.on(`message`, msg => {
      if (msg.channel.type === `text`) {
        this.parse(msg)
      }
    })
    client.on(`messageUpdate`, (msgOld, msgNew) => {
      if (msgNew.channel.type === `text`) {
        this.parse(msgNew)
      }
    })
  }
}

exports.CommandParser = Parser
