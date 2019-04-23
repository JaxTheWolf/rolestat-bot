const { RichEmbed } = require(`discord.js`)
const EventEmitter = require(`events`)

class Parser extends EventEmitter {
  constructor (client, prefix) {
    super()
    this.prefix = prefix
    this.client = client
    this.cmds = {}
    this.helplist = {}
    this.type = {
      OWNER: `OWNER`,
      INFO: `INFO`,
      MISC: `MISC`
    }

    this.register = (cmdFunc, invoke, aliases, desc, help, type) => {
      if (type) {
        type = type.toUpperCase()
      }
      this.cmds[invoke] = {
        cmdFunc: cmdFunc,
        invoke: invoke,
        root: invoke,
        desc: desc === `` ? `no description` : desc,
        help: help === `` ? `no help` : help,
        type: type === `` ? `Misc` : type
      }
      if (aliases.length > 0) {
        if (aliases) {
          aliases.forEach(a => {
            this.cmds[a] = {
              cmdFunc: cmdFunc,
              invoke: invoke,
              root: invoke,
              desc: desc === `` ? `no description` : desc,
              help: help === `` ? `no help` : help,
              type: type === `` ? `Misc` : type
            }
          })
        }
      }
      this.helplist[invoke] = {
        cmdFunc: cmdFunc,
        invoke: invoke,
        aliases: aliases,
        root: invoke,
        desc: desc === `` ? `no description` : desc,
        help: help === `` ? `no help` : help,
        type: type === `` ? `Misc` : type
      }
      return this
    }
    this.addType = tname => {
      if (Array.isArray(tname)) {
        tname.forEach(t => {
          if (typeof t !== `string` || !t) { console.log(`[CMDPARSER] Could not set new type: Invalid argument!`) } else {
            t = t.toUpperCase()
            this.type[t] = t
          }
        })
      } else
      if (typeof typename !== `string` || !tname) { console.log(`[CMDPARSER] Could not set new type: Invalid argument!`) } else {
        tname = tname.toUpperCase()
        this.type[tname] = tname
      }
      return this
    }
    this.sendHelpMsg = function (chan, invoke) {
      var msg
      var emb = new RichEmbed().setColor(0x00FF00)
      if (invoke) {
        var cmd = this.cmds[invoke]
        try {
          emb
            .addField(`Description`, cmd.desc)
            .addField(`Aliases`, (() => {
              if (this.helplist[invoke]) { return this.helplist[invoke].aliases.length > 0 ? this.helplist[invoke].aliases.join(`, `) : `*No aliases*` }
              return `*You provided help for a command via an alias, so here will no aliases be shown. Request help for root command to get list of aliases:*\n` +
                           `**Root Invoke:** \`${cmd.root}\``
            })())
            .addField(`Usage`, cmd.help)
            .addField(`Type`, cmd.type, true)
        } catch (e) {
          emb
            .setColor(0xFF0000)
            .setDescription(`ERROR! Command not found`)
        }
      } else {
        /*eslint-disable */
        var catlist = {}
        for (var cat in this.type) {
          catlist[cat] = {}
          for (var inv in this.helplist) {
            var cmd = this.helplist[inv]
            if (cmd.type === cat) {
              catlist[cat][inv] = cmd
            }
          }
        }
        for (var cat in catlist) {
          var localcmdlist = ``
          for (var inv in catlist[cat]) {
            var cmd = catlist[cat][inv]
            localcmdlist += `**${cmd.invoke}**  -  ${cmd.desc}\n`
          }
          if (localcmdlist !== ``) {
            emb.addField(cat, localcmdlist + `-----\n`)
          }
        }
      }
      /*esling-enable */
      chan.send(``, emb).then(m => { msg = m; return msg })
      return msg
    }
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
          const promise = this.cmds[invoke].cmdFunc(msg, args, author, chan, guild)
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
