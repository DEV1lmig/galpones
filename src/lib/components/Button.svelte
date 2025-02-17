<script lang="ts">
  interface Props {
    type?: 'submit' | 'button';
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
    onClick?: () => void;
    children?: import('svelte').Snippet;
  }

  let {
    type = 'button',
    variant = 'primary',
    fullWidth = true,
    onClick = () => {},
    children
  }: Props = $props();

  const variantClasses = {
    primary: 'bg-[#2B3784] hover:bg-[#232d6a]',
    secondary: 'bg-[#DC004E] hover:bg-[#b80041]'
  };
</script>

<button
  {type}
  class="{fullWidth ? 'w-full' : ''} py-2 px-4 {variantClasses[variant]} text-white rounded-md transition-colors"
  {...{ "r:click": onClick }}
>
  {@render children?.()}
</button>
