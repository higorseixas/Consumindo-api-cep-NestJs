import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CepModule } from './cep/cep.module';
import { StateController } from './state/state.controller';

@Module({
  imports: [CepModule, HttpModule, StateController],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
