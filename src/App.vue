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
    .swal2-confirm{
        font-size: 12px !important;
        padding: 3px 10px  !important;
        background-color: #00DFA2 !important;
        border-radius: 99px !important;
    }
    .swal2-cancel{
        font-size: 12px !important;
        padding: 3px 10px  !important;
        background-color: #FF8080 !important;
        border-radius: 99px !important;
    }
    .swal2-title{
        font-size: 20px !important;
        padding-top: 5px !important;
    }
    #swal2-html-container{
        font-size: 14px !important;
        font-weight: bold !important;
        margin-bottom: 0px !important;
        margin-top: 20px !important;
    }
    .swal2-image{
        margin-top: 10px !important;
    }
</style>