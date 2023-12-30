import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PromotionAdminService } from 'src/promotion/service/Promotion.Admin.Service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(
    private readonly promotionadminService: PromotionAdminService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(TasksService.name);
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug(
      'Đã chạy cron job vào lúc ' + new Date().toLocaleString(),
    );
    const deleteExpired =
      await this.promotionadminService.deletePromotionExpired();
    if (deleteExpired.status) {
      this.logger.debug('Đã hết hạn mã giảm giá');
    } else {
      this.logger.debug('Không có mã giảm giá nào hết hạn');
    }
  }
}
