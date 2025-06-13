<template>
    <div class="max-w-xl mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden">
      <!-- Navigation header -->
      <div class="flex items-center justify-between p-4 bg-gray-800 text-white rounded-t-xl">
        <button class="p-2 rounded-full hover:bg-gray-700 transition-colors" @click="previousDay">
          <!-- ChevronLeft icon SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h2 class="text-lg font-medium">{{ formattedDate }}</h2>
        <button class="p-2 rounded-full hover:bg-gray-700 transition-colors" @click="nextDay">
          <!-- ChevronRight icon SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
  
      <!-- Program list -->
      <div class="p-4 flex flex-col space-y-4">
        <div 
          v-for="(program, index) in programs" 
          :key="index" 
          class="flex items-center p-4 rounded-lg relative overflow-hidden"
          :class="getCategoryClass(program.category)"
        >
          <div class="mr-4 md:mr-5">
            <img 
              :src="program.hostImage" 
              :alt="program.host" 
              class="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white"
            />
          </div>
          <div class="flex-1">
            <div class="flex items-center text-sm text-gray-600 mb-1">
              <!-- Clock icon SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{{ program.startTime }}{{ program.endTime ? ' | ' + program.endTime : '' }}</span>
            </div>
            <h3 class="text-lg font-semibold m-0">{{ program.title }}</h3>
            <p v-if="program.host" class="text-sm text-gray-600 m-0">{{ program.host }}</p>
          </div>
          <div 
            v-if="program.isCurrent" 
            class="absolute top-3 right-3 bg-pink-600 text-white px-2 py-1 rounded text-xs font-semibold"
          >
            AHORA
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Current date state
  const currentDate = ref(new Date())
  
  // Format the date as "Día Número Mes, Año"
  const formattedDate = computed(() => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    return currentDate.value.toLocaleDateString('es-ES', options)
      .replace(/^\w/, (c) => c.toUpperCase())
  })
  
  // Navigation functions
  const previousDay = () => {
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() - 1)
    currentDate.value = newDate
  }
  
  const nextDay = () => {
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() + 1)
    currentDate.value = newDate
  }
  
  // Get Tailwind classes for each category
  const getCategoryClass = (category) => {
    const classes = {
      classics: 'bg-green-100',
      morning: 'bg-yellow-100',
      midday: 'bg-orange-100',
      afternoon: 'bg-blue-100',
      evening: 'bg-purple-100',
      night: 'bg-teal-100'
    }
    return classes[category] || 'bg-gray-100'
  }
  
  // Determine if a program is currently on air
  const isCurrentProgram = (startTime, endTime) => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()
    
    const [startHour, startMinutes] = parseTime(startTime)
    const [endHour, endMinutes] = endTime ? parseTime(endTime) : [23, 59]
    
    const currentTimeValue = currentHour * 60 + currentMinutes
    const startTimeValue = startHour * 60 + startMinutes
    const endTimeValue = endHour * 60 + endMinutes
    
    return currentTimeValue >= startTimeValue && currentTimeValue < endTimeValue
  }
  
  // Helper to parse time strings like "4:00 am" into hours and minutes
  const parseTime = (timeString) => {
    const [time, period] = timeString.split(' ')
    let [hours, minutes] = time.split(':').map(Number)
    
    if (period === 'pm' && hours < 12) {
      hours += 12
    } else if (period === 'am' && hours === 12) {
      hours = 0
    }
    
    return [hours, minutes]
  }
  
  // Sample program data
  // In a real application, this would likely come from an API
  const programs = ref([
    {
      title: 'Clásicos La 7',
      startTime: '4:00 am',
      endTime: null,
      host: 'DJ Clásico',
      hostImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      category: 'classics',
      isCurrent: false
    },
    {
      title: 'El Despertador de La 7',
      startTime: '4:00 am',
      endTime: '6:00 am',
      host: 'Ana María',
      hostImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      category: 'morning',
      isCurrent: false
    },
    {
      title: 'Despertares del Campo',
      startTime: '6:00 am',
      endTime: '9:00 am',
      host: 'Carlos Pérez',
      hostImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      category: 'morning',
      isCurrent: false
    },
    {
      title: 'Tropical y bailable',
      startTime: '9:00 am',
      endTime: '12:00 pm',
      host: 'Miguel Ángel',
      hostImage: 'https://randomuser.me/api/portraits/men/4.jpg',
      category: 'midday',
      isCurrent: false
    },
    {
      title: 'Salsa y Sabor',
      startTime: '12:00 pm',
      endTime: '2:00 pm',
      host: 'Laura y Tomás',
      hostImage: 'https://randomuser.me/api/portraits/women/5.jpg',
      category: 'midday',
      isCurrent: true
    },
    {
      title: 'Conversonantes',
      startTime: '2:00 pm',
      endTime: '5:00 pm',
      host: 'Sofía Martínez',
      hostImage: 'https://randomuser.me/api/portraits/women/6.jpg',
      category: 'afternoon',
      isCurrent: false
    },
    {
      title: 'Multiverso La 7',
      startTime: '5:00 pm',
      endTime: '8:00 pm',
      host: 'Daniel Rojas',
      hostImage: 'https://randomuser.me/api/portraits/men/7.jpg',
      category: 'evening',
      isCurrent: false
    },
    {
      title: 'Ritmos Urbanos',
      startTime: '8:00 pm',
      endTime: null,
      host: 'Alejandro y María',
      hostImage: 'https://randomuser.me/api/portraits/men/8.jpg',
      category: 'night',
      isCurrent: false
    }
  ])
  
  // In a real application, you would update the isCurrent property based on the current time
  // For example, with a setInterval or when the component is mounted
  </script>