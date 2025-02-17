import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index';

export async function GET() {
  try {
    const result = await db.query.loans.findMany({
      with: {
        customer: true,
        article: true
      },
    });
    // Map fields to match the Loan type
    const mappedLoans = result.map((loan) => ({
      ...loan,
      fecha_prestamo: loan.fecha_prestamo ? new Date(loan.fecha_prestamo) : new Date(0),
      cliente_id: loan.cliente_id === null ? 0 : loan.cliente_id,
      articulo_id: loan.articulo_id === null ? 0 : loan.articulo_id,
      monto_total: Number(loan.monto_total) || 0,
      monto_pagado: Number(loan.monto_pagado) || 0,
    }));
    return json(mappedLoans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    return json({ error: 'Error fetching loans' }, { status: 500 });
  }
}
