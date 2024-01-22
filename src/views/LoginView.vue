<template>
    <div class="home_page">
        <!-- Display all screen, yellow one -->
        <div class="h-screen flex justify-center items-center rounded-none bg-login xl:bg-base">
            
            <!-- Display 3/4 screen, pink one -->
            <div class="w-full h-fit p-10 xl:w-fit xl:h-fit xl:px-20 xl:drop-shadow-lg bg-login rounded-lg">
                
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
                    <img class="w-32 h-auto" src="https://i.imgur.com/hB1TKLR.png" alt="lootoo"/>
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
                                        class="w-full md:w-60 border border-gray-500 py-2 px-4 rounded-xl"
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
                                        class="w-full md:w-60 border border-gray-500 py-2 px-4 rounded-xl"
                                        placeholder="123"
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

                        <p v-if="isLoading.listStartedRoom || isLoading.users">
                            <img class="text-center mx-auto w-10 h-10" src="@/assets/spinner.gif" alt="loading"/>
                        </p>


                        <!-- Display submit login button -->
                        <div class="flex justify-center items-center mt-4">
                            <button 
                                class="rounded-full bg-yellow-500 border-yellow-600 border-4 text-white py-2 px-6 mx-auto"
                                type="submit">
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
    import { reactive, watch } from 'vue';
    import { useStoreData } from '@/stores/store';
    import { useRouter } from 'vue-router';
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
    const isLoading = reactive({
        users: false as boolean,
        listStartedRoom: false as boolean,
    });

    const router = useRouter();
    const store = useStoreData();
    const { users, listStartedRoom } = storeToRefs(store);


    //check users when done loading
    watch(users, (newUsers) => {
        //check validate when users change
        let isUsernameExist = newUsers.findIndex(user => user.username === state.username);
        if(isUsernameExist !== -1){
            validate.username = true;
            validate.usernameErrorMessage = "This username already exist";
       }
       //current user is not in users list yet => + 1
        if(newUsers.length + 1 > 11){
            validate.room = true;
            validate.roomErrorMessage = "This room was full";
        }
        isLoading.users = false;
    })

    //check listStartedRoom when done loading
    watch(listStartedRoom, (newList => {
        if(newList && newList.findIndex(room => room === state.room) !== -1){
            validate.room = true;
            validate.roomErrorMessage = "Game in progress";
        }
        isLoading.listStartedRoom = false;
    }))

    watch(isLoading, (newValue) => {
        if(newValue.users === false && newValue.listStartedRoom === false){

        // if(newValue === false && oldValue === true){
            if(!validate.room && !validate.username){
                successLogin();
            }   
        }
    })
    
    function checkValidInputsLogin(){
        if(!state.username){
            validate.username = true;
            validate.usernameErrorMessage = "The username field is required";
            return;
        }

        if(state.username.length > 20){
            validate.username = true;
            validate.usernameErrorMessage = "This username's length is too long";
            return;
        }

        if(!state.room){
            validate.room = true;
            validate.roomErrorMessage = "The room field is required";
            return;
        }

        if(state.room.length > 10){
            validate.room = true;
            validate.roomErrorMessage = "This room's length is too long";
            return;
        }
    }

    function handleLogin(){
        resetValidated();

        store.getUsersFromAPI();
        isLoading.users = true;
        store.getListStartedRoom();
        isLoading.listStartedRoom = true;

        checkValidInputsLogin();
    }
    
    function successLogin() {
        //send socket event: user join room
        store.socketIO.emit('userJoinRoom', { ...state });
        
        //navigation to room page
        router.push({
            name: 'room',
            query: { ...state }
        });
    }

    function resetValidated(){
        validate.username = false;
        validate.room = false;
        validate.roomErrorMessage = "";
        validate.usernameErrorMessage = "";
    }
</script>