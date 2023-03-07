import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { StateService } from './state.service';
import { StateController } from './state.controller';

@Module({
  controllers: [StateController],
  providers: [StateService, PrismaService],
  exports: [StateService],
  imports: [HttpModule],
})
export class CepModule {}
