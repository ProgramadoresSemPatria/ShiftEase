import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'

import { UsersRepository } from 'src/shared/database/repositories/users.repositories'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto

    const user = await this.usersRepo.findUnique({
      where: { email },
    })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const accessToken = await this.generateAccessToken(user.id)

    return { accessToken }
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password, department_id } = signupDto

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    })
    if (emailTaken) {
      throw new ConflictException('This e-mail is already in use!')
    }

    const hashedPassword = await hash(password, 12)

    const user = await this.usersRepo.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        department_id, //! buscar pelo código do departamento
      },
    })

    const accessToken = await this.generateAccessToken(user.id)

    return { accessToken }
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId })
  }
}
