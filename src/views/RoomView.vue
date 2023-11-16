<template>
    <div class="room_page">
        <div class="grid h-screen place-items-center bg-yellow-50">
            <div class="w-full h-full xl:w-3/4 rounded-lg">
                <div class="grid grid-cols-1 xl:grid-cols-5 mt-6">

                    <!-- Left side -->
                    <div class="col-span-2">

                        <!-- Display all list boards -->
                        <div class="bg-white mb-6 rounded-xl drop-shadow-md py-3 px-6">
                            
                            <!-- Display title of boards -->
                            <h3 class="text-xl text-left font-semibold text-gray-600 my-3">
                                Pick your board here
                            </h3>


                            <div class="flex gap-4 max-w-full overflow-x-auto">
                                <div v-for="board in boards"
                                    :key="board.id"
                                    @click=" board.username === null ? handleChangeBoard(board.id) : null"
                                    :class="{
                                        'hover:cursor-pointer': !!(board.username === null),
                                        'opacity-60': !!(board.username !== null),
                                        'text-center': true,
                                    }">
                                    <svg 
                                    :style="{'background': board.color}"
                                    :class="`w-14 h-14 p-3 rounded-full text-white mx-auto`"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <label class="text-md font-semibold text-yellow-600 mt-2">
                                        {{ board.username }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Display personal user's information -->
                        <div class="bg-white mb-6 rounded-xl drop-shadow-md py-3 px-6 text-left">

                            <!-- Display clear board function -->
                            <button class="mt-2 py-1 px-4 rounded-full bg-yellow-400 float-right"
                                @click="isClearBoard = true">
                                Clear Board
                            </button>

                            <!-- Display current user information & selected board -->
                            <div class="my-4">
                                <h3 class="text-xl font-semibold text-gray-600 my-3">
                                    {{ currentBoard?.username }}'s board
                                </h3>
                                <BoardComponent 
                                    :boardNumber="currentBoard?.numbers" 
                                    :color="currentBoard?.color"
                                    :calledNumbers="calledNumbers"
                                    :checkClearBoard="isClearBoard"
                                    @win-game="handleWinGame" 
                                    @reset-clear-board="isClearBoard = false"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Right side -->
                    <div class="col-span-3 xl:ml-6">

                        <!-- Display all users joined -->
                        <div class="bg-white mb-6 rounded-xl drop-shadow-md py-3 px-6">
                            
                            <!-- Display title of boards -->
                            <h3 class="text-xl text-left font-semibold text-gray-600 my-3">
                                All users
                            </h3>
                            
                            <div class="flex gap-4 max-w-full overflow-x-auto">
                                <div v-for="user in users" :key="user.id">
                                    <svg class="w-14 h-14 p-3 bg-blue-500 rounded-full text-white mx-auto"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                                    </svg>
                                    <label class="text-center text-md font-semibold text-yellow-600 mt-2">
                                        {{ user.username }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Display action block -->
                        <div class="bg-white mb-6 rounded-xl drop-shadow-md py-3 px-6 text-left">

                            <!-- Display clear board function -->
                            <div class="block mx-auto">
                                <div class="float-right">
                                    <button 
                                    :disabled="isExistUserAdmin"
                                    @click="handleTakeAdmin"
                                    :class="{
                                        'opacity-70': isExistUserAdmin
                                    }"
                                    class="mt-2 mr-2 py-1 px-4 rounded-full bg-yellow-400">
                                        Take Admin
                                    </button>
                                    <button 
                                    v-if="isCurrentUserAdmin"
                                    @click="handleReleaseAdmin"
                                    class="py-1 px-4 rounded-full bg-yellow-400">
                                        Release Admin
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Display random number -->
                            <div class="clear-right mx-auto text-center">
                                <div class="text-8xl font-bold text-yellow-600 py-8">
                                    {{ randomNumber }}
                                </div>
                            </div>
                            
                            <!-- Display game actions -->
                            <div v-if="isCurrentUserAdmin">
                                <span class="float-right italic text-gray-400">Room owner only</span>
                                <h3 class="font-semibold text-lg text-gray-600 mb-3">Game action </h3>
                                <div class="mx-auto text-center">
                                    <button @click="handleStopClear" class="rounded-full bg-orange-500 mx-1 text-white py-1 px-3">
                                        <svg class="w-5 h-5 mt-0.5 mr-2 float-left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                        <span>Stop & Clear</span>
                                    </button>
                                    <button @click="handleNextNumber" class="rounded-full bg-green-500 mx-1 text-white py-1 px-4">
                                        <svg class="w-5 h-5 mt-0.5 mr-2 float-left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                        </svg>
                                        <span>Next Number</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Display called numbers -->
                            <div>
                                <h3 class="font-semibold text-lg text-gray-600 my-3">
                                    Called number
                                </h3>
                                <div class="flex flex-wrap h-auto max-h-52 overflow-y-auto">
                                    <span v-for="(number, index) in calledNumbers" :key="index" 
                                    class="bg-blue-400 rounded-full py-1 px-3 text-white mr-1 mt-1">
                                        {{ number }} 
                                    </span>
                                </div>        
                            </div>
                        </div>

                        <!-- Display chat box -->
                        <div class="bg-white mb-6 rounded-xl drop-shadow-md py-3 px-6">
                            <h3 class="font-bold text-xl text-gray-700 my-5">
                                Chat Box
                            </h3>

                            <!-- Display list messages -->
                            <div id="chat-box" class="h-auto max-h-48 overflow-y-auto">
                                <p v-for="(m, index) in messages" :key="index"
                                    :class="{
                                        'italic text-gray-400': !!(m.username === 'BotChat'),
                                        'text-left': true,
                                        'text-right': !!(m.username === route.query.username)
                                    }"
                                >
                                    <strong v-show="!!(m.username !== route.query.username)">
                                        {{ m.username }}:
                                    </strong>
                                    {{ m.message }}
                                </p>
                            </div>
                            <input
                                v-model="message"
                                @keyup.enter="handleSendMessage"
                                class="shadow appearance-none border rounded-xl w-full my-3 p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="tap enter to send">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import { useStoreData } from '@/stores/store';
    import { useRoute } from 'vue-router'
    import { Message } from '@/interfaces/Message';
    import Swal from 'sweetalert2';
    import { storeToRefs } from 'pinia';

    //static variable
    const randomNumber = ref<number>(0);
    const calledNumbers = ref<(number | null)[]>([]);
    const messages = ref<Message[]>([]);
    const message = ref<string>("");
    const store = useStoreData();
    const route = useRoute();
    const isClearBoard = ref(false);

    //store data
    const { users, boards, currentBoard, socketIO } = storeToRefs(store);

    const isCurrentUserAdmin = computed(() => {
        const user  = users.value.find(user => user.username === route.query.username);
        return !!(user?.isAdmin); 
    })
    const isExistUserAdmin = computed(() => {
        const index = users.value.findIndex(user => user.isAdmin === true); 
        return !!(index !==-1);
    })

    //lifecycle hook
    onMounted(() => {
        //initial api data from back-end
        const usernameRoute = route.query.username ? route.query.username.toString() : '';
        store.getUsersFromAPI();
        store.getBoardsFromAPI();
        store.getBoardByUsernameFromAPI(usernameRoute);
        messages.value.push({
            username: 'BotChat',
            message: `Welcome ${usernameRoute}!`
        })

        //listen socket.io connection
        socketIO.value.on('someoneJoinRoom', (username) => {
            store.getUsersFromAPI();
            store.getBoardsFromAPI();
            messages.value.push({
                username: 'BotChat',
                message: `${username}, just joined`
            })
        })

        socketIO.value.on('someoneChangeBoardToAll', () => {
            const usernameRoute = route.query.username ? route.query.username.toString() : '';
            store.getBoardsFromAPI();
            store.getBoardByUsernameFromAPI(usernameRoute);
        })

        socketIO.value.on('someoneLeaveRoom', (username) => {
            store.getUsersFromAPI();
            store.getBoardsFromAPI();
            messages.value.push({
                username: 'BotChat',
                message: `${username}, just left`
            })
        })

        socketIO.value.on('updateRandomNumber', (data) => {
            randomNumber.value = data.randomNumber;
            calledNumbers.value = data.calledNumbers;
        })

        socketIO.value.on('updateStopAndClear', () => {
            changeStopAndClear();
        })
        
        socketIO.value.on('someoneSendMessageToAll', (data) => {
            messages.value.push({ ...data });
        })

        socketIO.value.on('endGame', (username) => {
            //user win game, alert to all
            Swal.fire({
                title: `${username} won`,
                confirmButtonText: 'End Game',
                imageUrl: "https://i.imgur.com/lbdhOxl.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Win game image"
            })

            //clear numbers and boards
            changeStopAndClear();
            isClearBoard.value = true;
        })

        socketIO.value.on('someoneTakeAdminToAll', () => {
            store.getUsersFromAPI();
        })

        socketIO.value.on('someoneReleaseAdminToAll', () => {
            store.getUsersFromAPI();
        })
    })

    //handle function
    function handleNextNumber(){
        let randomTemp = 0;
        let calledNumbersTemp = [...calledNumbers.value];
        do{
            randomTemp = Math.floor(Math.random() * 90 + 1);
        }while(calledNumbersTemp.indexOf(randomTemp) !== -1);
        //add random number to first position of list called
        calledNumbersTemp.unshift(randomTemp);

        //send socket event
        socketIO.value.emit('changeRandomNumber', { 
            randomNumber: randomTemp,
            calledNumbers: calledNumbersTemp,
            room: route.query.room 
        });
    }

    function changeStopAndClear(){
        randomNumber.value = 0;
        calledNumbers.value = [];
    }

    function handleStopClear(){
        //show alert to confirm
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able to recover this action",
            icon: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
        }).then((result) => {
            console.log('res', result);
            if (result.isConfirmed){
                //send socket event when confirm
                socketIO.value.emit('changeStopAndClear', (route.query.room));
            }
        })
    }

    function handleChangeBoard(targetBoardId: string){
        //send event to server | socket.io
        socketIO.value.emit("userChangeBoard", {
            username: route.query.username,
            room: route.query.room,
            targetBoardId: targetBoardId
        })
    }

    function handleSendMessage() {
        socketIO.value.emit('someoneSendMessage', ({
            room: route.query.room,
            username: route.query.username,
            message: message.value
        }))
        message.value = "";

        //scroll to bottom when submit chatting
        setTimeout(()=>{
            const el = document.getElementById('chat-box');
            if (el) {
                el.scrollTop = el.scrollHeight;
            }
        }, 100)
    }

    function handleTakeAdmin(){
        //send event to server | socket.io
        socketIO.value.emit("userTakeAdmin", {
            username: route.query.username,
            room: route.query.room,
        })
    }

    function handleReleaseAdmin(){
        //send event to server | socket.io
        socketIO.value.emit("userReleaseAdmin", {
            username: route.query.username,
            room: route.query.room,
        })
    }

    //handle function from BoardComponent
    function handleWinGame(){
        socketIO.value.emit('someoneWinGame', {
            username: route.query.username,
            room: route.query.room
        })
        changeStopAndClear();
    }
</script>