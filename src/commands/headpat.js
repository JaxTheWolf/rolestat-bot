const { sendAction } = require(`../libs/common`)

const headpatCommand = {
  invoke: `headpat`,
  aliases: [`head_pat`, `hpat`],
  desc: `Headpat someone!`,
  help: `<user>/<users>`,
  type: `action`,
  cmdFunc: (msg, args, client) => {
    const responses = [`**%author** just pat %other's head(s) very gently!`, `**%author** decided to pat %other's head(s) out of nowhere... Get pat!`]
    return sendAction(client, msg, responses, args)
  }
}
exports.headpatCommand = headpatCommand
