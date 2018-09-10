module.exports = {
  message: (host, token, userName) => (
    `<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0;">
       <meta name="format-detection" content="telephone=no"/>
    
      <!-- Responsive Mobile-First Email Template by Konstantin Savchenko, 2015.
      https://github.com/konsav/email-templates/  -->
    
      <style>
    /* Reset styles */ 
    body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
    body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    #outlook a { padding: 0; }
    .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
    
    @media all and (min-width: 560px) {
      .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
    }
    
    a, a:hover {
      color: #127DB3;
    }
    .footer a, .footer a:hover {
      color: #999999;
    }
    
       </style>
    
      <title>You've got the invitation to the DocSpace</title>
    
    </head>
    
    <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
      background-color: #F0F0F0;
      color: #000000;"
      bgcolor="#F0F0F0"
      text="#000000">

    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
      bgcolor="#F0F0F0">
    
    <table border="0" cellpadding="0" cellspacing="0" align="center"
      width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;" class="wrapper">
    
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 20px;
          padding-bottom: 20px;">
    
        <div style="display: flex; flex-direction: row; line-height: 40px;">
          <a target="_blank" style="text-decoration: none;"
            href="http://${host}"><img border="0" vspace="0" hspace="0"
            src="https://image.ibb.co/fdngue/logo_Animal_Black.png"
            width="40" height="40"
            alt="Logo" title="Logo" style="
            color: #000000;
            font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a><span style="text-transform: uppercase; font-family: arial; letter-spacing: 1px; font-size: 18px; font-weight: 600;">DocSpace</span>
          </div>
        </td>
      </tr>
    
    </table>
    
    
    <table border="0" cellpadding="0" cellspacing="0" align="center"
      bgcolor="#FFFFFF"
      width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;" class="container">
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
          padding-top: 25px;
          padding-bottom: 25px;
          color: #000000;
          font-family: sans-serif;" class="paragraph">
          <p style="letter-spacing: 0.8px; line-height: 25px; color: black;"><span style='text-decoration: underline;'>${userName}</span>, You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          </br>
          <p style="letter-spacing: 0.8px; line-height: 25px; color: black;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 25px;
          padding-bottom: 5px;" class="button">
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px; display: flex; width: 100%; text-align: center;"
              bgcolor="#0044a9"><a target="_blank" style="color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; margin: auto; line-height: 120%;text-decoration: none; letter-spacing: 1px;"
              href="http://${host}/reset/${token}">
                Reset my password
              </a>
          </td></tr></table></a>
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%;" class="list-item"><table align="center" border="0" cellspacing="0" cellpadding="0" style="width: inherit; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;">
    
        </table></td>
      </tr>
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 25px;" class="line"><hr
          color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
        </td>
      </tr>
    
    </table>
    <table border="0" cellpadding="0" cellspacing="0" align="center"
      width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
      max-width: 560px;" class="wrapper">
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
          padding-top: 25px;" class="social-icons">
    
    </td></tr></table>
    
    </body>
    </html>`)
}