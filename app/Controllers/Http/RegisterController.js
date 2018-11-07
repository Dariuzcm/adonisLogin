'use strict'

const {validateAll} = use('Validator')
const Database = use('Database')

await Database.collection('user').find()
await Database.collection('user').paginate()

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
        db.collection.insert(
           "user",
            {
              username: user.username,
              email: user.email,
              pass: user.pass
            }
         )
        //display success message
        session.flash({
            notification: {
                type: 'success',
                message: 'Your account has been creater.'
            }
        })

        return response.redirect('back')
    }
}

module.exports = RegisterController
