import questionsRouter from '../../../controllers/questions.controller.js'
import usersRouter  from '../../../controllers/users.controller.js'
import loginRouter from '../../../controllers/login.controller.js'
import signupRouter from '../../../controllers/signup.controller.js'

const routes = [
  { path: '/questions', router: questionsRouter },
  { path: '/users', router: usersRouter },
  { path: '/login', router: loginRouter },
  { path: '/signup', router: signupRouter }
]


export const registerRoutes = (app, prefix = '/api') => {
  routes.forEach(({ path, router }) => {
    app.use(`${prefix}${path}`, router)
  })
}

export default routes