<template>
  <router-view/>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Doodle+Shadow&display=swap');

    html, body {
        font-family: 'Montserrat', sans-serif;
        @apply text-gray-700
    }
    .font-rubik{
        font-family: 'Rubik Bubbles', sans-serif;
    }
    .font-doodle{
        font-family: 'Rubik Doodle Shadow', sans-serif;
    }
    .content-title{
        @apply font-semibold text-lg py-2 px-4 text-left;
    }
</style>