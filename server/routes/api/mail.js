const router = require('express').Router()
const mailService = require('../../services/mailService')

router.post('/sendInvite', mailService.sendIviteToGroup)
router.post('/sendMention', mailService.mentionInComment)

module.exports = router
