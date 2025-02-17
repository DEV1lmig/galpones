<script lang="ts">
  import { onMount } from 'svelte';
  import { customers, loans, payments, fetchCustomers, fetchLoans, fetchPayments } from '$lib/stores/creditStores';
  onMount(() => {
    fetchCustomers();
    fetchLoans();
    fetchPayments();
  });
</script>

<main class="p-4">
  <h1 class="text-2xl font-bold mb-4">Dashboard - Credit Tracking</h1>

  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">Customers</h2>
    <table class="min-w-full bg-white border">
      <thead>
        <tr>
          <th class="py-2 px-4 border">ID</th>
          <th class="py-2 px-4 border">Nombre</th>
          <th class="py-2 px-4 border">Apellido</th>
          <th class="py-2 px-4 border">Teléfono</th>
          <th class="py-2 px-4 border">Cédula</th>
        </tr>
      </thead>
      <tbody>
        {#each $customers as customer}
          <tr>
            <td class="py-2 px-4 border">{customer.id}</td>
            <td class="py-2 px-4 border">{customer.nombre}</td>
            <td class="py-2 px-4 border">{customer.apellido}</td>
            <td class="py-2 px-4 border">{customer.telefono ?? 'N/A'}</td>
            <td class="py-2 px-4 border">{customer.cedula}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-2">Loans</h2>
    <table class="min-w-full bg-white border">
      <thead>
        <tr>
          <th class="py-2 px-4 border">ID</th>
          <th class="py-2 px-4 border">Customer</th>
          <th class="py-2 px-4 border">Total</th>
          <th class="py-2 px-4 border">Paid</th>
          <th class="py-2 px-4 border">Remaining</th>
          <th class="py-2 px-4 border">Date</th>
        </tr>
      </thead>
      <tbody>
        {#each $loans as loan}
          <tr>
            <td class="py-2 px-4 border">{loan.id}</td>
            <td class="py-2 px-4 border">
              {loan.cliente ? `${loan.cliente.nombre} ${loan.cliente.apellido}` : 'N/A'}
            </td>
            <td class="py-2 px-4 border">{loan.monto_total}</td>
            <td class="py-2 px-4 border">{loan.monto_pagado}</td>
            <td class="py-2 px-4 border">{loan.cuotas_restantes}</td>
            <td class="py-2 px-4 border">{new Date(loan.fecha_prestamo).toLocaleDateString()}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <section>
    <h2 class="text-xl font-semibold mb-2">Payments</h2>
    <table class="min-w-full bg-white border">
      <thead>
        <tr>
          <th class="py-2 px-4 border">ID</th>
          <th class="py-2 px-4 border">Loan ID</th>
          <th class="py-2 px-4 border">Amount</th>
          <th class="py-2 px-4 border">Date</th>
          <th class="py-2 px-4 border">Type</th>
        </tr>
      </thead>
      <tbody>
        {#each $payments as payment}
          <tr>
            <td class="py-2 px-4 border">{payment.id}</td>
            <td class="py-2 px-4 border">{payment.prestamo ? payment.prestamo.id : 'N/A'}</td>
            <td class="py-2 px-4 border">{payment.monto}</td>
            <td class="py-2 px-4 border">{new Date(payment.fecha_pago).toLocaleDateString()}</td>
            <td class="py-2 px-4 border">{payment.tipo_pago}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</main>
