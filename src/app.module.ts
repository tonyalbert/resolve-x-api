import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { OperatorModule } from './operator/operator.module';
import { TicketModule } from './ticket/ticket.module';
import { InteractionModule } from './interaction/interaction.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CompanyModule, 
    UserModule, 
    OperatorModule, 
    TicketModule, 
    InteractionModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
