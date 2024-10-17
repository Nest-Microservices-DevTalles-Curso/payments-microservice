import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Customer, CustomerCard, Payment } from 'mercadopago';
import { envs } from 'src/config';

@Injectable()
export class PaymentsMercadopagoService {
  private readonly mercadoPagoClient = new MercadoPagoConfig({
    accessToken: envs.mpAccessToken,
  });

  async createPaymentSession(email: string, cardToken: string) {
    try {
      // Paso 1: Buscar o crear el cliente basado en su email
      const customerId = await this.getOrCreateCustomer(email);

      // Paso 2: Obtener las tarjetas del cliente
      const customerCard = new CustomerCard(this.mercadoPagoClient);
      const cards = await customerCard.list({ customerId });

      if (!cards || cards.length === 0) {
        throw new Error('No se encontraron tarjetas asociadas al cliente');
      }

      // Paso 3: Crear el pago utilizando la primera tarjeta
      const payments = new Payment(this.mercadoPagoClient);
      console.log(cardToken)
      const session = await payments.create({
        body: {
          installments: 1,
          payer: {
            email,
          },
          payment_method_id: 'master', // Asumiendo que es MasterCard
          token: cardToken, // El token proporcionado desde el frontend
          transaction_amount: 58,
        },
        requestOptions: { idempotencyKey: '1234' }
      });

      return session;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Función auxiliar para crear o recuperar un cliente existente
  private async getOrCreateCustomer(email: string): Promise<string> {
    const customer = new Customer(this.mercadoPagoClient);

    // Intentar buscar el cliente por email
    const existingCustomer = await customer
      .search({ options: { email } })
      .then((res) => res.results[0])
      .catch(() => null);

    if (existingCustomer) {
      return existingCustomer.id;
    }

    // Si no existe el cliente, lo creamos
    const newCustomer = await customer.create({
      body: {
        email,
      },
    });

    return newCustomer.id;
  }
}
