const mailSender = require('../mailSender')
const UserRepository = require('../repositories/UserRepository')
const Invite = require('../mainTemplates/invite')
const GroupRepository = require('../repositories/GroupRepository')

module.exports = {
  sendIviteToGroup: async (req, res) => {
    console.log(req.body)
    if (req.body.isInviteNewUser) {
      const mainMessage = `<span style="text-decoration: underline;">DocSpace</span> is content collaboration software that changes how modern teams work. Create, share, and collaborate on projects all in one place to keep your projects moving forward, faster.`
      const btnMessage = `Create account`
      const link = 'http://' + req.headers.host + '/signup'
      await req.body.invitedUsers.forEach((user) => {
        const message = {
          senderName: 'DocSpaceTeam',
          subject: 'Invitation to application',
          text: 'You was invited to application',
          email: user.email,
          htmlText: Invite.inviteTemplateMessage(req.body.senderInvite, req.headers.host, `You've got the invitation to the DocSpace`, mainMessage, btnMessage, link)
        }
        mailSender.sendData(message)
      })
    } else {
      const mainMessage = `Work together on a whole new level. Create, share, and collaborate on projects all in one place to keep your projects moving forward, faster.`
      const btnMessage = `See the group`
      GroupRepository.getByTitleFind(req.body.groupTitle)
        .then(group => {
          console.log(group[0]._id, `---------GROUP---------------------------------------------------------`)
          const link = 'http://' + req.headers.host + '/group/' + group[0]._id
          console.log(`some link ------------------------ some link`, link)
          req.body.invitedUsers.forEach((user) => {
            const message = {
              senderName: 'DocSpaceTeam',
              subject: 'Invitation to group',
              text: 'You was invited to group',
              email: user.email,
              htmlText: Invite.inviteTemplateMessage(req.body.senderInvite, req.headers.host, `You've got the invitation to the group`, mainMessage, btnMessage, link)
            }
            mailSender.sendData(message)
          })
        })
        .then(err => console.log(err))
    }
    return res.send({success: true})
  },
  mentionInComment: async (req, res) => {
    console.log(req.body)
    const mainMessage = `Teams change and teams grow. DocSpace is a flexible platform that supports the way your team works and can be customized to fit any and every type of need.`
    const btnMessage = `See the page`
    const link = 'http://' + req.headers.host + '/spaces/' + req.body.spaceId + '/' + req.body.BlogOrPage + '/' + req.body.pageId
    console.log(link)
    await UserRepository.getByLogins(req.body.mentionedUsersLogin)
      .then(users => {
        if (users.length) {
          users.forEach(user => {
            const message = {
              senderName: 'DocSpaceTeam',
              subject: 'You was mentioned in a comment',
              text: 'You was mentioned in a comment',
              email: user.email,
              htmlText: Invite.inviteTemplateMessage(req.body.senderCommentLogin, req.headers.host, `You was mentioned in a comment by ${req.body.senderCommentLogin}`, mainMessage, btnMessage, link)
            }
            mailSender.sendData(message)
          })
        }
      })
  }
}
