import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'

import { UserRepository } from '../repositories/UserRepository'

class UserController {
  async store(req: Request, resp: Response) {
    const { name = '', email = '' } = req.body

    const userRepository = getCustomRepository(UserRepository)

    if (!name || !email) {
      return resp.status(400).json({ error: 'Blank field not allowed!' })
    }

    const isValidEmail = email.includes('@') && email.includes('.com')

    if (!isValidEmail) {
      throw new AppError('Invalid email!')
    }
    
    const user = userRepository.create({
      name,
      email
    })
    
    const userWithEmail = await userRepository.findOne({ email })
    
    if (userWithEmail) {
      throw new AppError('Email already in use!')
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
      throw new AppError('User not found!', 404)
    }

    return resp.json(user)
  }


  async update(req: Request, resp: Response) {
    const { id } = req.params
    const { name, email } = req.body
    
    const userRepository = getCustomRepository(UserRepository)
    
    const user = await userRepository.findOne(id)

    if (!user) {
      throw new AppError('User not found!', 404)
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
      throw new AppError('User not found!', 404)
    }
    
    await userRepository.delete(id)
    return resp.json({ success: 'User has been deleted!' })
  }
}

export { UserController }
