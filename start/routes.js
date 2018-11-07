'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('login', ({ view }) => {
    return view.render("auth/login")
})
Route.post('login','UserController.login')
Route.get('register',({view})=>{
    return view.render('auth/register')
})
Route.post('register','RegisterController.register')
Route.get('home',({view})=>{
    return view.render('home')
})
Route.post('logout','UserController.logout')
