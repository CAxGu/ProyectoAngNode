var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

exports.sendEmail = function(req, res) {
  var emailTo = '';
  var emailFrom = '';
  var body = '';

  //req.body.from = 'nipontourpruebas@gmail.com' ;
  //req.body.to = 'oscll@gmail.com';
  req.body.type = 'user' ;
  //req.body.subject = 'this is subject';
  //req.body.text = 'this is text';

  switch (req.body.type) {
    case 'user':
      emailTo = req.body.from;
      emailFrom = req.body.to;
      body = '<body>' +
        '<div id="contact-email">' +
        '<div> <h1> Proyecto Angular - NodeJS </h1> <h4>Subject: ' + req.body.subject +
        '</h4></div>' +
        '<section>' +
        'Name:<p>' + req.body.name + '</p>' +
        'Email: <p>' + req.body.from + '</p>' +
        'Message:<p>' + req.body.text + '</p></section>' +
        '</div>' +
        ' </body>';
      break;
    case 'admin':
      emailTo = req.body.to;
      emailFrom = req.body.from;
      body = '<body>' +
        '<div id="contact-email">' +
        '<div> <h1> Proyecto Angular - NodeJS </h1> <h4>Subject: ' + req.body.subject +
        '</h4></div>' +
        '<section>' +
        'Name:<p>' + req.body.name + '</p>' +
        'Email: <p>' + req.body.from + '</p>' +
        'Message:<p>' + req.body.text + '</p></section>' +
        '</div>' +
        ' </body>';
      break;
    case 'modify':
      break;
    case 'signup':
      break;
  }

  var template =
    '<html>' +
    '<head>' +
    '<meta charset="utf-8" />' +
    '<style>' +
    '* {' +
    'box-sizing: border-box;' +
    '-webkit-box-sizing: border-box;' +
    '-moz-box-sizing: border-box;' +
    '-webkit-font-smoothing: antialiased;' +
    '-moz-font-smoothing: antialiased;' +
    '-o-font-smoothing: antialiased;' +
    'font-smoothing: antialiased;' +
    'text-rendering: optimizeLegibility;}' +
    ' body { color: #000; font-family: Arial, san-serif; width: 100%;}' +
    ' h1 { margin: 10px 0 0 0;}' +
    ' h4 { margin: 0 0 20px 0;}' +
    ' #contact-email {' +
    'background-color: rgba(72, 72, 72, 0.7);' +
    'padding: 10px 20px 30px 20px;' +
    ' max-width: 100%;' +
    'position: absolute;' +
    'margin-top: 30px;' +
    ' margin-left: -260px;' +
    ' border-radius: 7px;' +
    '-webkit-border-radius: 7px;' +
    '-moz-border-radius: 7px;}' +
    ' #contact-email p { font-size: 15px; margin-bottom: 10px;' +
    'font-family: Arial, san-serif; }' +
    ' #contact-email p {' +
    'width: 100%;' +
    'background: #fff;' +
    'border: 0;' +
    '-moz-border-radius: 4px;' +
    '-webkit-border-radius: 4px;' +
    ' border-radius: 4px;' +
    ' margin-bottom: 25px;' +
    ' padding: 10px; }' +
    '@media only screen and (max-width: 580px) {' +
    '#contact-form {' +
    ' left: 3%;' +
    ' margin-right: 3%;' +
    ' width: 88%;' +
    ' margin-left: 0;' +
    ' padding-left: 3%;' +
    ' padding-right: 3%; } }' +
    '</style>' +
    '</head>' + body + '</html>';

  var email = {
    from: req.body.from, 
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
    html: template
  };
 console.log(process.env)
  //Input APIKEY Sendgrid
  var options = {
    auth: {
      api_key: process.env.SENDGRID_KEY
    }
  };
  
  var mailer = nodemailer.createTransport(sgTransport(options));
  console.log(email);
  mailer.sendMail(email, function(error, info) {
    if (error) {
      res.status('401').json({
        err: info
      });
    } else {
      res.status('200').json({
        success: true
      });
    }
  });

};
