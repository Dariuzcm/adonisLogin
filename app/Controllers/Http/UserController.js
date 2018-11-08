'use strict'

const Database = use('Database')
const User= use('App/Models/User')
const Hash = use('Hash')
const logger= use('Logger')
class UserController {

    async logout({response,auth}){
        await auth.logout()
        response.redirect('/')
    }    
    async login ({ request, auth, session, response }) {
       //get form data
       
       const email= request.input('email')
       const password= request.input('password')
       const {remember} = request.all()
       //retrieve user base on the form data
       const user = await User.query()
       .where('email', email)
       .first()
       
       logger.error('msg',email)
       if(user){
           const passwordVerified = await Hash.verify(password, user.password)
           if(passwordVerified){
            await auth.remember(!!remember).login(user)
            await auth
                .remember(true)
                .attempt(email, password)
            return response.route('home')
           }
       }

       session.flash({
           notification:{
               type: 'danger',
               message: password,
           }
       })
       
       return response.route('login')

    }
    async gohome({ view }){
          return view.render('home')
    }
}

module.exports = UserController
