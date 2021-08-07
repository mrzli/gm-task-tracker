import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
