<script setup lang="ts"></script>

<template>
  <nav
    class="flex justify-between p-2 sm:p-4 shadow-lg items-center z-10 sticky top-0 bg-white"
  >
    <div>
      <img src="../assets/img/logo.png" class="h-8 sm:h-10" />
    </div>
    <div class="flex gap-4 md:gap-8 items-center">
      <!-- <NavigationBarLink to="radio">Programación </NavigationBarLink>
      <NavigationBarLink to="coupons">Cupones </NavigationBarLink>
      <NavigationBarLink to="sales">Clasificados</NavigationBarLink> -->
      <NavigationBarLink to="/">
        <IconsHome />
        <span>Inicio</span>
      </NavigationBarLink>
      <NavigationBarLink to="directorio">
        <IconsBlocks />
        <span>Directorio</span>
      </NavigationBarLink>
    </div>
    <div>
      <AuthCard />
    </div>
  </nav>
</template>

<style scoped></style>
