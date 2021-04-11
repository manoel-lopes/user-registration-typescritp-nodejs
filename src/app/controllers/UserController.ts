import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { UserRepository } from '../repositories/UserRepository'

class UserController {
  async index(_: Request, resp: Response) {
    const userRepository = getCustomRepository(UserRepository)
    
    const users = await userRepository.find()

    return users.length
      ? resp.json(users)
      : resp.status(400).json({ error: "The user list it's empty!" })
  }
  
  async show(req: Request, resp: Response) {
    const { id } = req.params

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne(id)
    
    return user
      ? resp.json(user)
      : resp.status(404).json({ error: 'User not found!' })
  }

  async store(req: Request, resp: Response) {
    const { name = '', email = '' } = req.body

    const userRepository = getCustomRepository(UserRepository)

    if (!name || !email) {
      return resp.status(400).json({ error: 'Blank field not allowed!' })
    }

    const isValidEmail = email.includes('@') && email.includes('.com')

    if (!isValidEmail) {
      return resp.status(400).json({ error: 'Invalid email!' })
    }

    const user = userRepository.create({
      name,
      email
    })

    const emailAlreadyRegistered = await userRepository.findOne({ email })

    if (emailAlreadyRegistered) {
      return resp.status(400).json({ error: 'Email already in use!' })
    }

    await userRepository.save(user)    
    return resp.status(201).json(user)
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params
    const { name, email } = req.body
    
    const userRepository = getCustomRepository(UserRepository)
    
    const user = await userRepository.findOne(id)

    if (!user) {
      return resp.status(404).json({ error: 'User not found!' })
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
      return resp.status(404).json({ error: 'User not found!' })
    }

    await userRepository.delete(id)
    return resp.json({ success: 'User has been deleted!' })
  }
}

export { UserController }
