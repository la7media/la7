<script setup lang="ts">
const coupons = [
  {
    id: 1,
    storeName: "Café Delicioso",
    availableCoupons: 15,
    shortPremio: "Gaseosa gratis",
    storeImage:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop&w=1000&q=80",
    description:
      "Disfruta de un 25% de descuento en todos nuestros productos de café gourmet. Válido de lunes a viernes.",
  },
  {
    id: 4,
    storeName: "Sushi Place",
    availableCoupons: 8,
    shortPremio: "Roll extra gratis",
    storeImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop&w=1000&q=80",
    description:
      "En la compra de un combo, recibe un roll extra gratis. Solo los viernes.",
  },
  {
    id: 5,
    storeName: "Hamburguesas Max",
    availableCoupons: 12,
    shortPremio: "Papas gratis",
    storeImage:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?crop&w=1000&q=80",
    description: "Compra una hamburguesa doble y llévate papas gratis.",
  },
  {
    id: 6,
    storeName: "Heladería Fresco",
    availableCoupons: 18,
    shortPremio: "Segunda bola gratis",
    storeImage:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?crop&w=1000&q=80",
    description:
      "Compra un helado y recibe una segunda bola gratis. Válido todos los martes.",
  },
  {
    id: 7,
    storeName: "Cafetería Aroma",
    availableCoupons: 14,
    shortPremio: "Café gratis",
    storeImage:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?crop&w=1000&q=80",
    description:
      "Por cada dos cafés, el tercero es gratis. Solo en horario matutino.",
  },
  {
    id: 8,
    storeName: "Tacos El Rincón",
    availableCoupons: 25,
    shortPremio: "Taco gratis",
    storeImage:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?crop&w=1000&q=80",
    description: "Compra 5 tacos y te regalamos 1. Solo los jueves.",
  },
  {
    id: 9,
    storeName: "Pastelería Dulce Tentación",
    availableCoupons: 9,
    shortPremio: "Postre gratis",
    storeImage:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop&w=1000&q=80",
    description:
      "Compra un pastel y llévate un postre gratis. Válido los fines de semana.",
  },
];
</script>
<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <CouponCard v-for="coupon in coupons" :key="coupon.id" :coupon="coupon" />
  </div>
</template>
