import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsMercadopagoModule } from './payments-mercadopago/payments-mercadopago.module';

@Module({
  imports: [PaymentsModule, PaymentsMercadopagoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
