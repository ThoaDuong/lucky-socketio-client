<template>
    <div class="home_page relative h-screen w-full overflow-hidden bg-gradient-to-br from-pink-200 via-pink-50 to-yellow-200">
        
        <!-- Shared Header -->
        <HeaderComponent />

        <!-- Main Content (Centered) -->
        <div class="relative z-10 flex h-full justify-center items-center p-4">
            <!-- Glassmorphism Card -->
            <div class="w-full max-w-md p-8 md:p-10 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] animate-fade-in-up">
                
                <!-- Display main title -->
                <div class="text-center mb-8">
                    <h1 class="font-rubik text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 drop-shadow-sm mb-2">
                        Loo Too
                    </h1>
                    <p class="text-base text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 drop-shadow-sm font-medium tracking-wide">
                        Get away from my lucky seat
                    </p>
                </div>

                <!-- Display login form -->
                <div class="flex justify-center items-center">
                    <form @submit.prevent="handleLogin" class="w-full">
                        <!-- Username field -->
                        <div class="mb-5">
                            <label class="flex items-center gap-2 mb-2 text-gray-700 font-semibold" for="name">
                                <img class="w-5 h-5" src="https://img.icons8.com/3d-fluency/94/user-female--v4.png" alt="user"/>
                                <span>Username</span>
                            </label>
                            <input
                                v-model="state.username"
                                class="w-full bg-white/90 border border-gray-200 text-gray-800 placeholder-gray-400 py-3 px-5 rounded-full outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-300 font-medium shadow-inner"
                                placeholder="User2508"
                                type="text"
                                name="name"
                                id="name">
                            <!-- Error message -->
                            <p v-if="validate.username" class="flex items-center gap-1 mt-2 text-pink-500 font-medium animate-shake">
                                <img class="w-5 h-5" src="https://img.icons8.com/arcade/64/error.png" alt="error"/>
                                <span class="text-sm">{{ validate.usernameErrorMessage }}</span>
                            </p>
                        </div>

                        <!-- Room field -->
                        <div class="mb-8">
                            <label class="flex items-center gap-2 mb-2 text-gray-700 font-semibold" for="room">
                                <img class="w-5 h-5" src="https://img.icons8.com/3d-fluency/94/room.png" alt="room"/>
                                <span>Room</span>
                            </label>
                            <input
                                v-model="state.room"
                                class="w-full bg-white/90 border border-gray-200 text-gray-800 placeholder-gray-400 py-3 px-5 rounded-full outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-300 font-medium shadow-inner"
                                placeholder="123"
                                type="text"
                                name="room"
                                id="room">
                            <!-- Error message -->
                            <p v-if="validate.room" class="flex items-center gap-1 mt-2 text-pink-500 font-medium animate-shake">
                                <img class="w-5 h-5" src="https://img.icons8.com/arcade/64/error.png" alt="error"/>
                                <span class="text-sm">{{ validate.roomErrorMessage }}</span>
                            </p>
                        </div>

                        <!-- Loading indicator -->
                        <div v-if="isLoading.listStartedRoom || isLoading.users" class="flex justify-center mb-4">
                            <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>

                        <!-- Submit button -->
                        <div class="flex justify-center mt-2">
                            <button 
                                class="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 shadow-[0_4px_14px_0_rgba(236,72,153,0.39)] text-white py-3 px-8 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 font-bold text-lg"
                                type="submit">
                                <img class="w-6 h-6" src="https://img.icons8.com/matisse/100/controller.png" alt="play" />
                                <span>Join Game</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Shared Footer -->
        <FooterComponent />
    </div>
</template>

<script setup lang="ts">
    import { reactive, watch } from 'vue';
    import { useStoreData } from '@/stores/store';
    import { useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import FooterComponent from '@/components/FooterComponent.vue';

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
    
    // Check validation for username and room inputs
    function checkValidInputsLogin(){
        if(!state.username){
            validate.username = true;
            validate.usernameErrorMessage = "The username field is required";
            return;
        }

        if(state.username.length > 15){
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

    // Handle user login process
    function handleLogin(){
        resetValidated();

        store.getUsersFromAPI();
        isLoading.users = true;
        store.getListStartedRoom();
        isLoading.listStartedRoom = true;

        checkValidInputsLogin();
    }
    
    // Execute actions upon successful login
    function successLogin() {
        //save session for reconnection after refresh
        sessionStorage.setItem('lootoo_session', JSON.stringify({
            username: state.username,
            room: state.room
        }));

        //send socket event: user join room
        store.socketIO.emit('userJoinRoom', { ...state });
        
        //navigation to room page
        router.push({
            name: 'room',
            query: { ...state }
        });
    }

    // Reset validation states and error messages
    function resetValidated(){
        validate.username = false;
        validate.room = false;
        validate.roomErrorMessage = "";
        validate.usernameErrorMessage = "";
    }
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

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>