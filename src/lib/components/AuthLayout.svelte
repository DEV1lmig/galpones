<script lang="ts">
  import { Image } from "@unpic/svelte";

  export let image = "";
  export let showIllustration = false;

  const finalImage = image !== "" ? image : (showIllustration ? "/assets/images/chavez.png" : "");
</script>

<div class="flex flex-row min-h-screen w-full">
    {#if finalImage !== ""}
      <div class="flex-1 w-2/3 h-screen relative overflow-hidden bg-gray-200">
        <Image
          src={finalImage}
          layout="constrained"
          width={1200}
          height={1200}
          alt="Auth Layout Image"
          class="absolute w-full inset-0 h-full object-cover"
        />
      </div>
    {/if}
  <div class="flex-1 w-full flex items-center justify-center p-8">
    <slot></slot>
  </div>
</div>
