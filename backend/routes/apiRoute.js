import questionsRouter from '../controllers/questionsController.js'
import usersRouter  from '../controllers/usersController.js'
import loginRouter from '../controllers/loginController.js'
import signupRouter from '../controllers/signupController.js'
import validateRouter from '../controllers/validateController.js'

const apiRoutesRoutes = [
  { path: '/questions', router: questionsRouter },
  { path: '/users', router: usersRouter },
  { path: '/auth/login', router: loginRouter },
  { path: '/auth/signup', router: signupRouter },
  { path: '/auth/validate', router: validateRouter }
]


export const registerRoutes = (app, prefix = '/api') => {
  apiRoutesRoutes.forEach(({ path, router }) => {
    app.use(`${prefix}${path}`, router)
  })
}

export default apiRoutesRoutes