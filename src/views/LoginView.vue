<template>
    <div class="home_page">
        <!-- Display all screen, yellow one -->
        <div class="h-screen flex justify-center items-center rounded-none bg-pink-50 xl:bg-yellow-50">
            
            <!-- Display 3/4 screen, pink one -->
            <div class="w-full h-fit p-10 xl:w-fit xl:h-fit xl:px-20 xl:drop-shadow-lg bg-pink-50 rounded-lg">
                
                <!-- Display main title -->
                <div class="text-center">
                    <h1 class="font-rubik text-5xl font-bold drop-shadow-lg text-yellow-500">
                        Loo Too
                    </h1>
                    <p class="text-lg text-gray-500 font-medium">
                        Get away from my lucky seat
                    </p>
                </div>

                <!-- Display main icon -->
                <div class="flex justify-center items-center mt-4">
                    <div class="flex justify-center items-center mt-10" data-v-inspector="app.vue:3:9"></div>
                    <img class="w-32 h-fit" src="https://i.imgur.com/hB1TKLR.png" alt="lootoo"/>
                </div>

                <!-- Display login form -->
                <div class="flex justify-center items-center">
                    <form 
                        @submit.prevent="handleLogin"
                        class="w-full">

                        <!-- Display username field -->
                        <div class="md:flex md:justify-center">
                            <div>
                                <div class="my-2 block md:flex gap-1 items-center" for="name">
                                    <div class="flex gap-1">
                                        <img class="w-5 h-5" src="https://img.icons8.com/3d-fluency/94/user-female--v4.png" alt="user-female--v4"/>
                                        <span class="w-24">Username</span>
                                    </div>
                                    <input
                                        v-model="state.username"
                                        class="w-full md:w-56 border border-gray-500 py-2 px-4 rounded-xl"
                                        placeholder="User2508"
                                        type="text"
                                        name="name"
                                        id="name">
                                </div>
                                <!-- Display message error of username -->
                                <p v-if="validate.username" 
                                    class="flex gap-1 text-red-500 font-semibold">
                                    <img class="w-6 h-6" src="https://img.icons8.com/arcade/64/error.png" alt="error"/>
                                    <span>{{ validate.usernameErrorMessage }}</span>
                                </p>
                            </div>
                        </div>

                        <!-- Display room field -->
                        <div class="md:flex md:justify-center">
                            <div>
                                <div class="my-2 block md:flex gap-1 items-center" for="room">
                                    <div class="flex gap-1">
                                        <img class="w-5 h-5" src="https://img.icons8.com/3d-fluency/94/room.png" alt="room"/>
                                        <span class="w-24">Room</span>
                                    </div>
                                    <input
                                        v-model="state.room"
                                        class="w-full md:w-56 border border-gray-500 py-2 px-4 rounded-xl"
                                        placeholder="room1"
                                        type="text"
                                        name="room"
                                        id="room">
                                </div>
                                <!-- Display message error of room -->
                                <p v-if="validate.room" 
                                    class="flex gap-1 text-red-500 font-semibold">
                                    <img class="w-6 h-6" src="https://img.icons8.com/arcade/64/error.png" alt="error"/>
                                    <span>{{ validate.roomErrorMessage }}</span>
                                </p>
                            </div>
                        </div>


                        <!-- Display submit login button -->
                        <div class="flex justify-center items-center mt-4">
                            <button 
                                class="rounded-full bg-yellow-500 border-yellow-600 border-4 text-white py-2 px-6 mx-auto"
                                type="submit">
                                <!-- <svg class="w-6 h-6 float-left" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg> -->
                                <img class="w-6 h-6 float-left" src="https://img.icons8.com/matisse/100/controller.png" alt="play game icon" />
                                <span class="float-right ml-2 font-semibold">
                                    Join
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive } from 'vue'
    import { useStoreData } from '@/stores/store'
    import { useRouter } from 'vue-router'
    import { storeToRefs } from 'pinia';


    //static variable
    const state = reactive({
        username: '' as string,
        room: '' as string,
    })
    const validate = reactive({
        username: false as boolean,
        usernameErrorMessage: '' as string,
        room: false as boolean,
        roomErrorMessage: '' as string,
    })
    const router = useRouter();
    const store = useStoreData();
    const { users } = storeToRefs(store);


    //mounted
    onMounted(() => {
        store.getUsersFromAPI();
    })


    function checkIsValidLogin(){
        if(!state.username || state.username.length > 20){
            validate.username = true;
            validate.usernameErrorMessage = "This username's length is too long";
            return false;
        }

        if(!state.room || state.room.length > 10){
            validate.room = true;
            validate.roomErrorMessage = "This room's length is too long";
            return false;
        }

        const isUsernameExist = users.value.findIndex(user => user.username === state.username);
        if(isUsernameExist !== -1){
            validate.username = true;
            validate.usernameErrorMessage = 'This username already exist';
            return false
        }
        // let firsUser = users.value[0];
        // if(firsUser && firsUser.room !== state.room){
        //     validate.room = true;
        //     validate.roomErrorMessage = "This room does not exist";
        //     return false;
        // }
        if(users.value.length === 9){
            validate.room = true;
            validate.roomErrorMessage = "This room was full";
            return false;
        }
        return true;
    }

    function handleLogin(){
        //exit when invalid
        if(!checkIsValidLogin()){
            return;
        }


        //valid information
        //reset validate
        validate.username = false;
        validate.room = false;

        //send socket event: user join room
        store.socketIO.emit('userJoinRoom', { ...state });
        
        //navigation to room page
        router.push({
            name: 'room',
            query: { ...state }
        });
    }
</script>