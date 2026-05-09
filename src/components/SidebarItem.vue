<script setup lang="ts">
const props = defineProps<{
  icon: any;
  label: string;
  active: boolean;
}>();
</script>

<template>
  <button
    :class="[
      'flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-200',
      active 
        ? 'bg-sage text-white shadow-lg shadow-sage/20' 
        : 'text-gray-500 hover:bg-black/5 hover:text-gray-900'
    ]"
  >
    <component :is="icon" :size="20" />
    <span class="font-medium">{{ label }}</span>
  </button>
</template>
