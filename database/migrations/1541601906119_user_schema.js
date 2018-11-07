'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.collection('user', (collection) => {
      collection.index('email_index', {email: 1}, {unique: true})
    })
  }

  down () {
    this.drop('user')
  }
}

module.exports = UserSchema
