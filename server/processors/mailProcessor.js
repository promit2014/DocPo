var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP", {
    host: "mail.smtp2go.com",
    port: 2525, //  8025, 587 and 25 can also be used. 
    auth: {
        user: "noreply@promit.com",
        pass: "Monabhi*123"
    }
});

var sendNotification = function(subject , msg , to , from) {
    smtpTransport.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: msg
    }, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });
};

module.exports = {
  sendNotification:sendNotification
}
