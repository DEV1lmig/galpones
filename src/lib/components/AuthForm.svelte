<script lang="ts">
  import { enhance } from '$app/forms';

  interface Props {
    title: string;
    subtitle?: string;
    formAction?: string;
    children?: import('svelte').Snippet;
  }

  let {
    title,
    subtitle = '',
    formAction = '',
    children
  }: Props = $props();
</script>

<div class="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-semibold mb-2">{title}</h1>
    {#if subtitle}
      <p class="text-gray-600">{subtitle}</p>
    {/if}
  </div>
  <form method="POST" action={formAction} use:enhance class="space-y-6">
    {@render children?.()}
  </form>
</div>
