'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenSchema extends Schema {
  up () {
    this.create('token', (collection) => {
      collection.index(
        'token',{
          user_id: "",
          token: '',
          type : '',
          is_revoked: ''
        }
      )
    }).insertOne()
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokenSchema
