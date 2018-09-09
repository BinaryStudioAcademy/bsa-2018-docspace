const router = require('express').Router()
const mailService = require('../../services/mailService')

router.post('/sendInvite', mailService.sendIviteToGroup)
router.post('/sendMention', mailService.mentionInComment)
router.post('/replyComment', mailService.replyComment)

module.exports = router
