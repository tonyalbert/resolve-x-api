import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';

@Module({
  controllers: [OperatorController],
  providers: [OperatorService],
})
export class OperatorModule {}
