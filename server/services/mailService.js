const mailSender = require('../mailSender')
const UserRepository = require('../repositories/UserRepository')
const Invite = require('../mainTemplates/invite')
const GroupRepository = require('../repositories/GroupRepository')

module.exports = {
  sendIviteToGroup: async (req, res) => {
    const { isInviteNewUser, invitedUsers, senderInvite } = req.body
    if (isInviteNewUser) {
      const mainMessage = `<span style="text-decoration: underline;">DocSpace</span> is content collaboration software that changes how modern teams work. Create, share, and collaborate on projects all in one place to keep your projects moving forward, faster.`
      const btnMessage = `Create account`
      const link = 'http://' + req.headers.host + '/signup'
      await invitedUsers.forEach((user) => {
        const message = {
          senderName: 'DocSpaceTeam',
          subject: 'Invitation to application',
          text: 'You was invited to application',
          email: user.email,
          htmlText: Invite.inviteTemplateMessage(
            `<span style="text-decoration: underline;">${senderInvite}</span> invites you`,
            req.headers.host,
            `You've got the invitation to the DocSpace`,
            mainMessage, btnMessage, link)
        }
        mailSender.sendData(message)
      })
    } else {
      const mainMessage = `Work together on a whole new level. Create, share, and collaborate on projects all in one place to keep your projects moving forward, faster.`
      const btnMessage = `See the group`
      const { groupTitle, senderInvite } = req.body
      GroupRepository.getByTitleFind(groupTitle)
        .then(group => {
          const link = 'http://' + req.headers.host + '/group/' + group[0]._id
          invitedUsers.forEach((user) => {
            const message = {
              senderName: 'DocSpaceTeam',
              subject: 'Invitation to group',
              text: 'You was invited to group',
              email: user.email,
              htmlText: Invite.inviteTemplateMessage(
                `<span style="text-decoration: underline;">${senderInvite}</span> invites you`,
                req.headers.host,
                `You've got the invitation to the group`,
                mainMessage, btnMessage, link)
            }
            mailSender.sendData(message)
          })
        })
        .then(err => console.log(err))
    }
    return res.send({success: true})
  },
  mentionInComment: async (req, res) => {
    const mainMessage = `Teams change and teams grow. DocSpace is a flexible platform that supports the way your team works and can be customized to fit any and every type of need.`
    const btnMessage = `See the page`
    const link = 'http://' + req.headers.host + '/spaces/' + req.body.spaceId + '/' + req.body.BlogOrPage + '/' + req.body.pageId
    const { senderCommentLogin } = req.body
    await UserRepository.getByLogins(req.body.mentionedUsersLogin)
      .then(users => {
        if (users.length) {
          users.forEach(user => {
            const message = {
              senderName: 'DocSpaceTeam',
              subject: 'You was mentioned in a comment',
              text: 'You was mentioned in a comment',
              email: user.email,
              htmlText: Invite.inviteTemplateMessage(
                `<span style="text-decoration: underline;">${senderCommentLogin}</span> mentioned you`,
                req.headers.host,
                `You was mentioned in a comment`,
                mainMessage, btnMessage, link)
            }
            mailSender.sendData(message)
          })
        }
      })
  }
}
