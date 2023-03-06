import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { identity, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CepService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getAddress(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    return this.httpService.get(url).pipe(
      map((response) => response.data),
      map((data) => {
        if (data.erro) {
          throw new Error('CEP not found.');
        }
        const cepExist = this.prisma.cep.findUnique({
          where: { cep: cep },
        });

        if (cepExist) {
          return this.prisma.cep.update({
            where: { id: data.id },
            data: {
              cep: data.cep,
              logradouro: data.logradouro,
              complemento: data.complemento,
              bairro: data.bairro,
              localidade: data.localidade,
              uf: data.uf,
              ibge: data.ibge,
              gia: data.gia,
              ddd: data.ddd,
              siafi: data.siafi,
            },
          });
        } else {
          return this.prisma.cep.create({
            data: {
              cep: data.cep,
              logradouro: data.logradouro,
              complemento: data.complemento,
              bairro: data.bairro,
              localidade: data.localidade,
              uf: data.uf,
              ibge: data.ibge,
              gia: data.gia,
              ddd: data.ddd,
              siafi: data.siafi,
            },
          });
        }
      }),
    );
  }

  async getAllCep() {
    return this.prisma.cep
      .findMany({ select: { id: true, cep: true, bairro: true } })
      .then((result) => result)
      .catch((e) => {
        console.log(e);
      });
  }

  async getCep(cep: string) {
    return this.prisma.cep
      .findUnique({
        where: { cep: cep },
        select: { id: true, cep: true, bairro: true, uf: true },
      })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
  }

  async deleteCep(cep: string) {
    return this.prisma.cep
      .findUnique({
        where: { cep: cep },
        select: { id: true, cep: true },
      })
      .then((existingCep) => {
        if (existingCep) {
          return this.prisma.cep.delete({
            where: { cep: cep },
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  // async getAllUsers() {
  //   return this.prisma.user
  //     .findMany({ select: { id: true, nome: true, email: true } })
  //     .then((result) => result)
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  // async getContactsByUserId(userId: number) {
  //   return this.prisma.contact
  //     .findMany({
  //       where: { userId: userId },
  //       select: { id: true, number: true, userId: true }
  //     })
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  // async createUser(nome: string, email: string) {
  //   return this.prisma.user
  //     .findUnique({
  //       where: { email: email }
  //     })
  //     .then((existingUser) => {
  //       if (existingUser) {
  //         console.log(existingUser);
  //         throw new Error('E-mail already registered.');
  //       }
  //       return this.prisma.user.create({
  //         data: {
  //           nome,
  //           email
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // }

  // async updateUser(id: number, email: string) {
  //   return this.prisma.user
  //     .findUnique({
  //       where: { id: id }
  //     })
  //     .then((existingUser) => {
  //       if (!existingUser) {
  //         throw new Error('User does not exist.');
  //       }
  //       return this.prisma.user.update({
  //         where: { id: id },
  //         data: { email: email }
  //       });
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // }
}
