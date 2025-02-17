import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index';

export async function GET() {
  try {
    const result = await db.query.payments.findMany({
      with: {
        loan: true,
      },
    });
    const mappedPayments = result.map((payment) => ({
      ...payment,
      fecha_pago: payment.fecha_pago ? new Date(payment.fecha_pago) : new Date(0),
      prestamo_id: payment.prestamo_id === null ? 0 : payment.prestamo_id,
      monto: Number(payment.monto) || 0,
      numero_transaccion: payment.numero_transaccion === null ? undefined : payment.numero_transaccion,
    }));
    return json(mappedPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return json({ error: 'Error fetching payments' }, { status: 500 });
  }
}
