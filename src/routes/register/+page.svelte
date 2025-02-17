<script lang="ts">
  import AuthLayout from '$lib/components/AuthLayout.svelte';
  import AuthForm from '$lib/components/AuthForm.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import Button from '$lib/components/Button.svelte';

  interface Data {
    error?: string;
  }

  const { data } = $props<{data: Data}>();
  let username = $state('');
  let password = $state('');
</script>

<AuthLayout showIllustration>
  <AuthForm
    title="Registro"
    subtitle="Crea tu cuenta para acceder al sistema"
    formAction="/register"
  >
    <InputField
      label="Usuario"
      id="username"
      name="username"
      placeholder="Ingresa tu usuario"
      required
      bind:value={username}
    />

    <InputField
      label="Contraseña"
      type="password"
      id="password"
      name="password"
      placeholder="Ingresa tu contraseña"
      required
      bind:value={password}
    />

    {#if data.error}
      <div class="text-red-500 text-sm">{data.error}</div>
    {/if}

    <Button type="submit">
      Registrar
    </Button>
  </AuthForm>
</AuthLayout>
