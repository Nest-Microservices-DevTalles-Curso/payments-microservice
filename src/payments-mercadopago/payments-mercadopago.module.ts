import { Module } from '@nestjs/common';
import { PaymentsMercadopagoService } from './payments-mercadopago.service';
import { PaymentsMercadopagoController } from './payments-mercadopago.controller';

@Module({
  controllers: [PaymentsMercadopagoController],
  providers: [PaymentsMercadopagoService],
})
export class PaymentsMercadopagoModule {}
