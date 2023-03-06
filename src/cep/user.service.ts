import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService
  ) {}

  async getAllUsers() {
    return this.prisma.user
      .findMany({ select: { id: true, nome: true, email: true } })
      .then((result) => result)
      .catch((e) => {
        console.log(e);
      });
  }

  async getContactsByUserId(userId: number) {
    return this.prisma.contact
      .findMany({
        where: { userId: userId },
        select: { id: true, number: true, userId: true }
      })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async createUser(nome: string, email: string) {
    return this.prisma.user
      .findUnique({
        where: { email: email }
      })
      .then((existingUser) => {
        if (existingUser) {
          console.log(existingUser);
          throw new Error('E-mail already registered.');
        }
        return this.prisma.user.create({
          data: {
            nome,
            email
          }
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  async updateUser(id: number, email: string) {
    return this.prisma.user
      .findUnique({
        where: { id: id }
      })
      .then((existingUser) => {
        if (!existingUser) {
          throw new Error('User does not exist.');
        }
        return this.prisma.user.update({
          where: { id: id },
          data: { email: email }
        });
      })
      .catch((error) => {
        throw error;
      });
  }
}
