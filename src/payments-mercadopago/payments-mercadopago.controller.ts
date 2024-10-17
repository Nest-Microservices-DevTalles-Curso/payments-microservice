import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsMercadopagoService } from './payments-mercadopago.service';

@Controller('payments-mercadopago')
export class PaymentsMercadopagoController {
  constructor(
    private readonly paymentsMercadopagoService: PaymentsMercadopagoService,
  ) {}

  // Este endpoint recibe el email y el token de tarjeta desde el front-end
  @Post('mp-create-payment-session')
  async createPaymentSession(@Body() body: { email: string; cardToken: string }) {
    const { email, cardToken } = body;

    try {
      const paymentSession = await this.paymentsMercadopagoService.createPaymentSession(email, cardToken);
      return paymentSession;
    } catch (error) {
      return {
        success: false,
        message: 'Error al crear la sesión de pago',
        error: error.message,
      };
    }
  }

  @Get('mp-success')
  success() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  @Get('mp-cancel')
  cancel() {
    return {
      ok: false,
      message: 'Payment cancelled',
    };
  }

  @Post('mp-webhook')
  async mpWebhook(@Body() body: any) {
    // Aquí puedes manejar las notificaciones de MercadoPago, como pagos aprobados, rechazados, etc.
    console.log('Webhook received:', body);
    return {
      received: true,
    };
  }
}
