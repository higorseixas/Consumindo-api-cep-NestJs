import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';

@Module({
  controllers: [CepController],
  providers: [CepService, PrismaService],
  exports: [CepService],
  imports: [HttpModule],
})
export class CepModule {}
