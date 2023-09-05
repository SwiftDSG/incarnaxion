<template>
  <div class="rd-empty"></div>
</template>

<script lang="ts" setup>
  const router = useRouter();

  onMounted(() => {
    router.push("/creator");
  });
</script>
