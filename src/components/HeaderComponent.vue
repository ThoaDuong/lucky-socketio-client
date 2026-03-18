<template>
    <header class="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-20 bg-white shadow-sm">
        <router-link :to="{ name: 'login' }" class="flex items-center gap-1 animate-fade-in-down py-2">
            <img class="w-8 h-8 mb-1" src="../../public/logo.png" alt="logo" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 font-bold text-3xl font-rubik tracking-wide">
              LooToo
            </span>
        </router-link>
        <div class="flex items-center gap-4 animate-fade-in-down delay-100">
            <router-link :to="{ name: 'rules' }" target="_blank" class="text-pink-500 border-b border-pink-500 hover:text-yellow-500 hover:border-yellow-500 font-semibold transition-colors duration-300 flex items-center gap-1">
                <span>Luật chơi</span>
            </router-link>
        </div>
    </header>
</template>

<script setup lang="ts">
// Shared Header Component
</script>

<style scoped>
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out forwards;
}
</style>
