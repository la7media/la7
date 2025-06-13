<script setup>
// Props with default values
const location = "Robledo";

// State
const sortOption = ref("relevance");
const listings = [
  {
    seller: "Javier López",
    price: 9000000,
    currency: "USD",
    location: "Robledo Parque",
    title: 'MacBook Pro M2 Pro 16 " 512gb SSD 16GB RAM ',
    description: "Excelente Computador para diseño y desrrollo audiovisual",
    condition: "Used",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_MacBookPros_13-15-17_stacked_08-2009.jpg",
    isFavorite: false,
  },
  {
    seller: "Contactar",
    price: 400000,
    currency: "USD",
    location: "Altamira",
    title: "Arriendo Abitación para Estudiantes",
    description: "Habitación para Estudiantes con baño compartido",
    condition: "New",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/JuniorSuite.JPG",
    isFavorite: false,
  },
  {
    seller: "Alexandra",
    price: 650000,
    currency: "GBP",
    location: "Robledo Parque",
    title: "Celular Xiaomi Redmi Not 13",
    description:
      "El Xiaomi Redmi Note 13 con 8GB de RAM y 256GB de almacenamiento interno es un smartphone que destaca por su rendimiento y capacidad de almacenamiento.",
    condition: "Used",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/IPhone_13_Pro_camera_lens_group.jpg",
    isFavorite: false,
  },
];

// Methods
const formatPrice = (price, currency) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
};

const toggleFavorite = (index) => {
  listings.value[index].isFavorite = !listings.value[index].isFavorite;
};
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <!-- Header with results count and sorting -->
    <div class="flex justify-between items-center mb-6">
      <p class="text-gray-600">
        Encontramos {{ listings.length }} en {{ location }}, 1 a
        {{ listings.length }}
      </p>
      <div class="flex items-center gap-2">
        <span class="text-gray-600">Listar Por</span>
        <div class="relative">
          <select
            v-model="sortOption"
            class="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="relevance">Más Relevantes</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio:Mayor a Menor</option>
            <option value="newest">Más nuevos</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Listings -->
    <div class="space-y-4">
      <div
        v-for="(listing, index) in listings"
        :key="index"
        class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row"
      >
        <!-- Product Image -->
        <div class="relative md:w-1/3 h-64 md:h-auto">
          <img
            :src="listing.image"
            :alt="listing.title"
            class="w-full h-full object-cover"
          />
          <button
            class="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            @click="toggleFavorite(index)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              :class="
                listing.isFavorite
                  ? 'text-orange-500 fill-orange-500'
                  : 'text-gray-400'
              "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <!-- Product Details -->
        <div class="p-6 flex-1 flex flex-col">
          <div class="mb-1 text-gray-700">{{ listing.seller }}</div>
          <div class="text-3xl font-bold mb-1">
            {{ formatPrice(listing.price, listing.currency) }}
          </div>
          <div class="text-gray-600 mb-2">{{ listing.location }}</div>

          <h2 class="text-xl font-semibold mb-2">{{ listing.title }}</h2>
          <p class="text-gray-600 mb-4 line-clamp-2">
            {{ listing.description }}
          </p>

          <div class="flex items-center mb-6">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium"
              :class="
                listing.condition === 'New'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              "
            >
              <svg
                v-if="listing.condition === 'New'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ listing.condition }}
            </span>
          </div>

          <div class="mt-auto">
            <button
              class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Contact now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
