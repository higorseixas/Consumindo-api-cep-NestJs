import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CepModule } from './cep/cep.module';

@Module({
  imports: [CepModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
