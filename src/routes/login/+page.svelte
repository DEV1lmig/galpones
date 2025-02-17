<script lang="ts">
  import AuthLayout from '$lib/components/AuthLayout.svelte';
  import AuthForm from '$lib/components/AuthForm.svelte';
  import InputField from '$lib/components/InputField.svelte';
  import Button from '$lib/components/Button.svelte';

  let usuario = $state('');
  let contrasena = $state('');
</script>

<AuthLayout showIllustration image="/assets/images/chavez.png">
  <AuthForm
    title="Bienvenido"
    subtitle="Bienvenido al sistema de gestion del plan 'Mi Bodega'"
    formAction="/login"
  >
    <InputField
      label="Usuario"
      id="usuario"
      name="username"
      placeholder="Tu usuario"
      required
      bind:value={usuario}
    />

    <InputField
      label="Contraseña"
      type="password"
      id="contrasena"
      name="password"
      placeholder="La contraseña de tu cuenta"
      required
      bind:value={contrasena}
    />

    <div class="space-y-4">
      <Button type="submit">
        Iniciar Sesion
      </Button>

      <a href="/register">
        <Button variant="secondary">
          Registrar
        </Button>
      </a>
    </div>
  </AuthForm>
</AuthLayout>
