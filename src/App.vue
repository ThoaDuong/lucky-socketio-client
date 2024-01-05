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
    .text-happy-yellow{
        color: #FCE22A
    }
    .text-happy-red{
        color: #FF8080
    }
    .text-happy-blue{
        color: #95BDFF
    }
    .bg-happy-blue{
        background-color: #95BDFF;
    }
    .bg-happy-yellow{
        background-color: #FCE22A;
    }
    .bg-happy-red{
        background-color: #FF8080;
    }
    .bg-happy-green{
        background-color: #00DFA2;
    }
    .bg-base{
        background-color: #F1EAFF; 
        /* EBE3D5 */
    }
    .bg-login{
        background-color: #7ED7C1; 
        /* EBE3D5 */
    }
</style>