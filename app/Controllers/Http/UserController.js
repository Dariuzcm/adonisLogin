'use strict'

const Database = use('Database')
const User= use('App/Models/User')
const Hash = use('Hash')

class UserController {

    async logout({response}){
        await auth.logout()
        response.redirect('/')
    }    
    async login ({ request, auth, session, response }) {
       //get form data
       const {email, password, remember} = request.all()
       //retrieve user base on the form data
       const user = await User.query()
       .where('email', email)
       .where('is_active', true)
       .first()
       
       if(user){
           const passwordVerified = await Hash.verify(password, user.password)
           if(passwordVerified){
               await auth.remember(!!remember).login(user)
               return response.route('home')
           }
       }

       //display error message
       session.flash({
           notification:{
               type: 'danger',
               message: "We couldn't verify your credentials. Please make sure you've confirmed your email address."
           }
       })

       return response.redirect('/home')
    }
   
}

module.exports = UserController
