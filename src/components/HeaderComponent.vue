<template>
    <header class="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-20 bg-white shadow-sm">
        <div class="flex items-center gap-3 animate-fade-in-down">
            <img class="w-10 h-10" src="https://i.imgur.com/hB1TKLR.png" alt="logo" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 font-bold text-2xl font-rubik tracking-wide">Loo Too</span>
        </div>
        <a href="#" class="text-gray-600 hover:text-pink-500 font-semibold transition-colors duration-300 animate-fade-in-down delay-100 flex items-center gap-1">
            <img class="w-5 h-5 bg-gray-100 rounded-full p-0.5" src="https://img.icons8.com/ios-filled/50/000000/help.png" alt="rules"/>
            Luật chơi
        </a>
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
