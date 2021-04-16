const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const chatController = require('../app/http/controllers/chatController')
const eventController = require('../app/http/controllers/eventController')
const blogController = require('../app/http/controllers/blogController')
const profileController = require('../app/http/controllers/profileController')
const messageController = require('../app/http/controllers/messageController')
const courseController = require('../app/http/controllers/courseController')
const paymentController = require('../app/http/controllers/paymentController')


const guest = require('../app/http/middlewares/guest')


function initRoutes(app) {
app.get('/', homeController().index)
app.get('/sdashboard', homeController().sdashboard)
app.get('/mdashboard', homeController().mdashboard)
app.get('/login', authController().login)
app.post('/login', authController().postLogin)
app.get('/register', authController().register)
app.post('/register', authController().postRegister)
app.get('/chatdb', chatController().index)
app.get('/chat.html', chatController().chat)
app.get('/event', eventController().index)
app.get('/createevent', eventController().createevent)
app.post('/eventpost', eventController().postevent)
app.get('/blogs', blogController().index)
app.get('/createblog', blogController().createblog)
app.post('/createblog', blogController().postblog)
app.get('/requestblog', blogController().requestblog)
app.post('/requestblog', blogController().postrequestblog)
app.get('/requestedblog', blogController().requestedblog)
app.get('/editprofile', profileController().editprofile)
app.post('/editprofile', profileController().postprofile)
app.get('/listofmentors', profileController().listofmentors)
app.get('/mentordetails', profileController().mentordetails)
app.get('/temp', profileController().temp)
app.get('/leaveamessage', messageController().index)
app.post('/leaveamessage', messageController().postmessage)
app.get('/inbox', messageController().inbox)
app.get('/chatwithmentor', messageController().chatwithmentor)
app.get('/courses', courseController().index)
app.get('/sentmessages', messageController().sentmessages)
app.get('/payment', paymentController().index)
app.post('/callback', paymentController().callback)
app.get('/403', homeController().forbidden)
app.get('/*', homeController().error)


}

module.exports = initRoutes
