<script lang="ts">
  interface Props {
    label: string;
    type?: string;
    id: string;
    name?: any;
    placeholder?: string;
    required?: boolean;
    value?: string;
  }

  let {
    label,
    type = 'text',
    id,
    name = id,
    placeholder = '',
    required = false,
    value = $bindable('')
  }: Props = $props();
</script>

<div class="space-y-2">
  <label for={id} class="block text-sm font-medium text-gray-700">
    {label}
  </label>
  <input
    {type}
    {id}
    {name}
    {placeholder}
    {required}
    bind:value
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
