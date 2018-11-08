'use strict'

const User = use('App/Models/User')

class RegisterController {
    showRegisterForm({view}){
        return view.render('auth.register')
    }

    async register({request, session, response}){
       
        //create user
        const user = await User.create({
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('password'),
        })
        try {
            
        user.save()   
         //display success message
         session.flash({
            notification: {
                type: 'success',
                message: 'Registration successful!.'
            }
        })
        } catch (error) {
            session.flash({
                notification: {
                    type: 'danger',
                    message: 'Registration Incompleted. Something wrong happends'
                }
            })
        }
       

        return response.redirect('/login')
    }
}

module.exports = RegisterController
