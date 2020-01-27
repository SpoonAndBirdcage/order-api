import * as bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { UserModel } from '../schemas/user'
import { OrderAPILogger } from '../utils/logger'
import { formatOutput } from '../utils/orderApiUtility'

export const login = (req: Request, res: Response, next: NextFunction) => {
  const username = req.query.username
  const password = req.query.password

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      OrderAPILogger.logger.info(
        `[GET] [/users/login] no user found with the username ${username}`
      )
      return res.status(404).send()
    }

    const validate = bcrypt.compareSync(password, user.password.valueOf())

    if (validate) {
      const body = { _id: user._id, email: user.email }
      const token = jwt.sign({ user: body }, 'top_secret')

      return res.json({ token: token })
    } else {
      OrderAPILogger.logger.info(
        `[GET] [/users/login] user not authorized ${username}`
      )
      return res.status(401).send()
    }
  })
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username

  OrderAPILogger.logger.info(`[GET] [/users] ${username}`)

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      OrderAPILogger.logger.info(
        `[GET] [/users/:{username}] User wiht username ${username} not found`
      )
      return res.status(404).send()
    }

    user = user.toJSON()
    return formatOutput(res, user, 200, 'user')
  })
}

export const addUser = (req: Request, res: Response, next: NextFunction) => {
  const newUser = new UserModel(req.body)

  OrderAPILogger.logger.info(`[POST] [/users] ${newUser}`)

  newUser.password = bcrypt.hashSync(newUser.password, 10)

  newUser.save((err, user) => {
    if (err) {
      OrderAPILogger.logger.info(
        `[POST] [/users] something went wrong when saving a new user ${newUser.username} | ${err.message}`
      )
      return res.status(500).send(err)
    }
    return formatOutput(res, user, 201, 'user')
  })
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username

  OrderAPILogger.logger.info(`[PATCH] [/users] ${username}`)

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      OrderAPILogger.logger.info(
        `[PATCH] [/users/:{username}] user with username ${username} not found`
      )
      return res.status(404).send()
    }

    user.username = req.body.username || user.username
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    user.phone = req.body.phone || user.phone
    user.userStatus = req.body.userStatus || user.userStatus

    user.save(error => {
      res.status(204).send()
    })
  })
}

export const removeUser = (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username

  OrderAPILogger.logger.warn(`[DELETE] [/users] ${username}`)

  UserModel.findOne({ username: username }, (err, user) => {
    if (!user) {
      OrderAPILogger.logger.info(
        `[DELETE] [/users/:{username}] user with username ${username} not found`
      )
      return res.status(404).send()
    }

    user.remove(error => {
      res.status(204).send()
    })
  })
}
