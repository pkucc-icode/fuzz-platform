<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@vben-core/shared'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <thead :class="cn('[&_tr]:border-b', props.class)">
    <slot />
  </thead>
</template>
