'use strict'

const Database = use('Database')
const db = await Database.connection('mongodb')

class UserController {
    async login ({ request, auth }) {
       
        const result = await mongoClient.collection('user').find(request).toArray()
        auth(result.user,result.pass)
    }
    show ({ auth, params }) {
        if (auth.user.username !== Number(params.username)) {
          return 'You cannot see someone else\'s profile'
        }
        return auth.user
      }
}

module.exports = UserController
