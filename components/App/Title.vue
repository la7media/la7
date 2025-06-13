<script lang="ts" setup>
type Size = "normal" | "big" | "extraBig";
type Align = "center" | "left" | "right";

const { size = "normal", align = "center" } = defineProps<{
  size?: Size;
  align?: Align;
}>();

const sizes: Record<Size, string> = {
  normal: "text-4xl",
  big: "text-8xl",
  extraBig: "text-16xl",
};

const sizefin = sizes[size] ?? sizes.normal;
</script>

<template>
  <div :class="[`text-${align}`, 'mb-8', $attrs.class]">
    <h1 :class="[sizefin, 'font-bold text-gray-900 mb-2']">
      <slot />
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
      >
        <slot name="emphasis" />
      </span>
    </h1>
    <p class="text-gray-600">
      <slot name="description" />
    </p>
  </div>
</template>
