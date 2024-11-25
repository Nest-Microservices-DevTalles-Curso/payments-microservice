import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsMercadopagoModule } from './payments-mercadopago/payments-mercadopago.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [PaymentsModule, PaymentsMercadopagoModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
