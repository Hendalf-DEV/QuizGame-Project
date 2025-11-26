import questionsRouter from '../../../controllers/questions.controller.js'
import usersRouter  from '../../../controllers/users.controller.js'
import loginRouter from '../../../controllers/login.controller.js'
import signupRouter from '../../../controllers/signup.controller.js'
import validateRouter from '../../../controllers/validate.controller.js'

const routes = [
  { path: '/questions', router: questionsRouter },
  { path: '/users', router: usersRouter },
  { path: '/auth/login', router: loginRouter },
  { path: '/auth/signup', router: signupRouter },
  { path: '/auth/validate', router: validateRouter }
]


export const registerRoutes = (app, prefix = '/api') => {
  routes.forEach(({ path, router }) => {
    app.use(`${prefix}${path}`, router)
  })
}

export default routes