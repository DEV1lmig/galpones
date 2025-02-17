export interface User {
    id: string;
    username: string;
    role: string;
    createdAt: Date;
}

export interface Customer {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string | null;
    cedula: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date | null;
    creator?: User;
  }

export interface Article {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Loan {
  id: number;
  cliente_id: number;
  articulo_id: number;
  monto_total: number;
  monto_pagado: number;
  total_cuotas: number;
  cuotas_restantes: number;
  fecha_prestamo: Date;
  cliente?: Customer;
  articulo?: Article;
}

export interface Payment {
  id: number;
  prestamo_id: number;
  fecha_pago: Date;
  monto: number;
  tipo_pago: string;
  numero_transaccion?: string;
  prestamo?: Loan;
}
