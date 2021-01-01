<template>
    <!-- Full screen -->
    <div class="w-full h-screen grid grid-cols-12 p-3 gap-3">
        <!-- Left side -->
        <div class="col-span-3">
            <div class="h-full grid grid-rows-10 gap-3">
                <!-- Logo block -->
                <div class="bg-gray-300 row-span-1">
                    <h1 class="text-2xl font-bold h-full flex justify-center items-center">Lucky Break</h1>
                </div>
                <div class="row-span-9">
                    <div class="h-full grid grid-rows-10 gap-3">
                        <!-- User information block -->
                        <div class="bg-gray-300 row-span-2">
                            <div class="grid grid-cols-3 mt-3">
                                <div class="col-span-1 mx-auto text-center">
                                    <img width="48" height="48" src="https://img.icons8.com/fluency/48/jake.png" alt="jake"/>
                                </div>
                                <div class="col-span-2 text-left">
                                    <h3 class="text-xl font-semibold">thoad</h3>
                                    <p>Member</p>
                                </div>
                            </div>
                        </div>
                        <!-- Boards list block -->
                        <div class="bg-gray-300 row-span-8">
                            <h3 class="font-semibold text-lg text-left p-3">Select board here</h3>
                            <div v-for="n in 5" :key="n" 
                            class="grid grid-cols-3 mt-3">
                                <div class="col-span-1 mx-auto text-center">
                                    <img
                                    :style="{'background': 'pink'}"
                                    class="w-14 h-14 p-2 rounded-full text-white mx-auto"
                                    src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/external-Board-education-smashingstocks-hand-drawn-black-smashing-stocks.png"
                                    alt="board image"/>
                                </div>
                                <div class="col-span-2 text-left">
                                    <h3 class="text-lg py-4 font-semibold">username {{ n }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Right side -->
        <div class="col-span-9">
            <div class="max-w-full h-full grid grid-rows-10 gap-3">
                <!-- Dynamic banner block -->
                <div class="bg-gray-300 row-span-1 overflow-x-hidden px-3">
                    <div class="relative h-full flex justify-right items-center">
                        <div class="animate-marquee whitespace-nowrap">
                            <span class="mx-4 text-xl">Please do not reload the page during play</span>
                            <span class="mx-4 text-xl">Please do not reload the page during play</span>
                        </div>
                        <div class="absolute animate-marquee2 whitespace-nowrap">
                            <span class="mx-4 text-xl">Please do not reload the page during play</span>
                            <span class="mx-4 text-xl">Please do not reload the page during play</span>
                        </div>
                    </div>
                </div>
                <div class="row-span-9">
                    <div class="w-full h-full grid grid-cols-9 gap-3">
                        <!-- Game play block -->
                        <div class="col-span-6">
                            <div class="max-w-full h-full grid grid-rows-10 gap-3">
                                <!-- Called numbers block -->
                                <div class="bg-gray-300 row-span-2 overflow-x-hidden">
                                    <div class="h-full mx-5 flex gap-3 justify-right items-center overflow-x-auto">
                                        <div class="flex gap-3 items-center bg-blue-400 rounded-full py-2 px-4">
                                            <div class="block">
                                                <span class="text-xl font-semibold">0</span>
                                                <span>/90</span>
                                            </div>
                                            <div class="block">
                                                <div class="bg-yellow-400 w-14 h-14 flex justify-center items-center rounded-full text-2xl font-semibold">
                                                    2
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="n in 15" :key="n">
                                            <div class="bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full text-xl font-semibold">
                                                {{ n }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Selected board block -->
                                <div class="bg-gray-300 row-span-8">06</div>
                            </div>
                        </div>
                        <div class="col-span-3">
                            <div class="w-full h-full grid grid-rows-3 gap-3">
                                <!-- Admin action block -->
                                <div class="bg-gray-300 row-span-1">07</div>
                                <!-- ChatBox block -->
                                <div class="bg-gray-300 row-span-2">08</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>