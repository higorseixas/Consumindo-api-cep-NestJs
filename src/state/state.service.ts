import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StateService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getAllState() {
    return this.prisma.state
      .findMany({ select: { id: true, uf: true, estado: true } })
      .then((result) => result)
      .catch((e) => {
        console.log(e);
      });
  }

  async getState(estado: string) {
    return this.prisma.state
      .findUnique({
        where: { estado: estado },
        select: { id: true, uf: true, estado: true },
      })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
  }

  async createState(uf: string, estado: string, localidade: string) {
    return this.prisma.state
      .findUnique({
        where: { uf: uf },
      })
      .then((existState) => {
        if (existState) {
          throw new Error('state already exists.');
        }
        return this.prisma.state.create({
          data: {
            uf,
            estado,
            localidade,
          },
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  async updateState(uf: string, estado: string, localidade: string) {
    return this.prisma.state
      .findUnique({
        where: { uf: uf },
      })
      .then((existingUser) => {
        if (!existingUser) {
          throw new Error('User does not exist.');
        }
        return this.prisma.state.update({
          where: { uf: uf },
          data: {
            uf,
            estado,
            localidade,
          },
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  async deleteState(id: number, estado: string) {
    return this.prisma.state
      .findUnique({
        where: { estado: estado },
      })
      .then((existingCep) => {
        if (existingCep) {
          return this.prisma.cep.delete({
            where: { id: id },
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
