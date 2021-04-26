import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { UserRepository } from '../repositories/UserRepository'
import { AppError } from '../errors/AppError'

class UserController {
  async store(req: Request, resp: Response) {
    const { name = '', email = '' } = req.body

    const userRepository = getCustomRepository(UserRepository)

    if (!name || !email) {
      const field = !name ? 'name' : 'email'
      throw new AppError(`Field ${field} can't be blank!`)
    }

    const emailTest = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    const isValidEmail = emailTest.test(email)

    if (!isValidEmail) {
      throw new AppError('Email has invalid format!')
    }

    const user = userRepository.create({
      name,
      email
    })

    const userWithEmail = await userRepository.findOne({ email })

    if (userWithEmail) {
      throw new AppError('Email has already been taken!')
    }

    await userRepository.save(user)
    return resp.status(201).json(user)
  }

  async index(_: Request, resp: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const users = await userRepository.find()

    return resp.json(users)
  }

  async show(req: Request, resp: Response) {
    const { id } = req.params

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne(id)

    if (!user) {
      throw new AppError('User, not found!', 404)
    }

    return resp.json(user)
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params
    const { name, email } = req.body

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne(id)

    if (!user) {
      throw new AppError('User, not found!', 404)
    }

    const userWithEmail = await userRepository.findOne({ email })
    const isNotUserOwnEmail = email !== user.email

    if (userWithEmail && isNotUserOwnEmail) {
      throw new AppError('Email already in use!')
    }

    await userRepository.save({
      id,
      name,
      email
    })

    const newUser = await userRepository.findOne(id)
    return resp.json(newUser)
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne(id)

    if (!user) {
      throw new AppError('User, not found!', 404)
    }

    await userRepository.delete(id)
    return resp.json({ success: 'User has been deleted!' })
  }
}

export { UserController }
