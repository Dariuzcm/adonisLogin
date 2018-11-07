'use strict'

const {validateAll} = use('Validator')
const User = use('App/Models/User')
const randomString = require('random-string')
const Mail = use('Mail')

class RegisterController {
    showRegisterForm({view}){
        return view.render('auth.register')
    }

    async register({request, session, response}){
        //validate form inputs
        const validation = await validateAll(request.all(), {
            username: 'required|unique:users, username',
            email: 'required|email|unique:users, email',
            password: 'required'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashExcept(['password'])

            return response.redirect('back')
        }
        //create user
        const user = await User.create({
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('pass'),
            confirmation_token: randomString({length:40})
        })
        await user.save()
        //display success message
        session.flash({
            notification: {
                type: 'success',
                message: 'Your email address has been confirmed.'
            }
        })

        return response.redirect('back')
    }
}

module.exports = RegisterController
