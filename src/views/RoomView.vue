<template>
    <div class="room_page 2xl:flex 2xl:justify-center bg-image-base background-image">
        <!-- Responsive concept
            normal: phone
            md - lg: tablet
            xl: laptop
            2xl: desktop 
        -->

        <!-- Full screen -->
        <div class="w-full h-screen max-h-screen 2xl:w-[80%] overflow-y-auto grid grid-cols-12 p-2 gap-2">
            <!-- Left side -->
            <div class="
                col-span-12 
                md:col-span-4 
                xl:col-span-3">
                <div class="h-full">
                    <!-- Logo block -->
                    <div class="h-[80px] bg-base bg-opacity-80 rounded-xl flex mb-2">
                        <div class="px-4 pt-1">
                            <img class="w-16 h-16" src="https://i.imgur.com/hB1TKLR.png" alt="Lootoo"/>
                        </div>
                        <h1 class="font-rubik text-4xl text-yellow-500 font-bold h-full flex items-center">LooToo</h1>
                    </div>
                    <!-- User information block -->
                    <div class="h-[100px] w-full mb-2 flex items-center bg-base bg-opacity-80 rounded-xl relative">
                        <div class="px-4">
                            <img class="w-16 h-16" src="https://img.icons8.com/clouds/100/corgi.png" alt="Temporary profile picture"/>
                        </div>
                        <div class="text-left">
                            <div class="flex gap-2">
                                <h3 class="text-lg font-semibold drop-shadow-lg text-happy-blue">{{ route.query.username }}</h3>
                            </div>
                            <p class="text-sm"><strong>Role:</strong>
                                {{ isCurrentUserAdmin ? 'Host' : 'Player' }}
                            </p>
                            <p class="text-sm"><strong>Room Code:</strong> {{ route.query.room }}</p>
                        </div>
                        <div class="absolute top-3 right-24">
                            <button v-if="agora.micMuted"
                                @click="handleToggleMicrophone()">
                                <img class="w-5 h-5" src="https://img.icons8.com/pulsar-color/48/no-microphone.png" alt="no-microphone"/>
                            </button>
                            <button v-else
                                @click="handleToggleMicrophone()">
                                <img class="w-5 h-5" src="https://img.icons8.com/pulsar-color/48/radio-studio.png" alt="radio-studio"/>
                            </button>
                            <button v-if="backgroundMusic.isOn"
                                @click="handleToggleBackgroundMusic()">
                                <img class="w-5 h-5" src="https://img.icons8.com/pulsar-color/48/speaker.png" alt="speaker"/>
                            </button>
                            <button v-else
                                @click="handleToggleBackgroundMusic()">
                                <img class="w-5 h-5" src="https://img.icons8.com/pulsar-color/48/mute.png" alt="mute"/>
                            </button>
                        </div>
                        <button @click="handleLeaveRoom()"
                            class="absolute top-2 right-2 rounded-full bg-happy-red text-white py-1 px-3 text-sm font-semibold">
                            <span>Leave</span>
                            <img class="w-4 h-4 mt-0.5 ml-1 float-right" src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-exiting-from-shopping-mall-with-arrow-outside-mall-filled-tal-revivo.png" alt="suicide"/>
                        </button>
                    </div>
                    <!-- Boards list block -->
                    <div class="h-[250px] md:h-[calc(100vh-212px)] bg-base bg-opacity-80 rounded-xl">
                        <h3 class="content-title">
                            Select board here
                        </h3>

                        <div class="h-[70%] md:h-[84%] overflow-y-auto">
                            <div
                            v-for="board in customBoards" :key="board.id"
                            @click="board.username === null && !isGameStarted ? handleChangeBoard(board.id) : null"
                            :class="{
                                'hover:cursor-pointer': !!(board.username === null && !isGameStarted),
                                'opacity-60': !!(board.username !== null || isGameStarted),
                                'grid grid-cols-3 pb-1': true,
                            }">
                                <div class="col-span-1 mx-auto text-center">
                                    <img
                                    :style="{'background': board.color}"
                                    class="w-14 h-14 p-2 rounded-full text-white mx-auto"
                                    src="https://img.icons8.com/matisse/100/paper.png"
                                    alt="board image"/>
                                </div>
                                <div class="col-span-2 flex gap-3 text-left">
                                    <h3 class="text-lg py-4 font-semibold">
                                        {{ board.username }}
                                    </h3>
                                    <span v-show="board.username !== null" class="py-[1.3rem]">
                                        <span v-if="board.micMuted">
                                            <img class="w-4 h-4" src="https://img.icons8.com/pulsar-color/48/no-microphone.png" alt="no-microphone"/>
                                        </span>
                                        <span v-else>
                                            <img class="w-4 h-4" src="https://img.icons8.com/pulsar-color/48/radio-studio.png" alt="radio-studio"/>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
            <!-- Right side -->
            <div class="
                col-span-12 sm:overflow-y-hidden
                md:col-span-8 md:overflow-y-auto
                xl:col-span-9">
                <div class="h-full">
                    <!-- Dynamic banner block -->
                    <div class="hidden md:block h-[80px] bg-base bg-opacity-80 rounded-xl overflow-x-hidden mb-2 px-3">
                        <div class="relative h-full flex justify-right items-center font-black-ops text-2xl">
                            <!-- Welcome to the party! Get ready for some fun. -->
                        
                            <div class="animate-marquee whitespace-nowrap">
                                <span class="mx-4 text-happy-blue">No refresh during play</span>
                                <span class="mx-4 text-happy-red">Happy new year</span>
                                <span class="mx-4 text-happy-blue">No refresh during play</span>
                                <span class="mx-4 text-happy-red">Happy new year</span>
                                <span class="mx-4 text-happy-blue">No refresh during play</span>
                                <span class="mx-4 text-happy-red">Happy new year</span>
                            </div>
                            <div class="absolute animate-marquee2 whitespace-nowrap">
                                <span class="mx-4 text-happy-blue">No refresh during play</span>
                                <span class="mx-4 text-happy-red">Happy new year</span>
                                <span class="mx-4 text-happy-blue">No refresh during play</span>
                                <span class="mx-4 text-happy-red">Happy new year</span>
                                <span class="mx-4 text-happy-blue">No refresh during play</span>
                                <span class="mx-4 text-happy-red">Happy new year</span>
                            </div>
                        </div>
                    </div>
                    <div class="h-auto xl:h-[100px] mb-2">
                        <div class="h-full grid grid-cols-3 gap-2">
                            <!-- Called numbers block -->
                            <div class="h-full col-span-3 py-3 xl:py-0 xl:col-span-2 bg-base bg-opacity-80 rounded-xl overflow-x-hidden">
                                <div class="h-full mx-5 flex justify-right items-center overflow-x-auto">
                                    <div class="flex items-center bg-happy-blue rounded-full py-2 px-4">
                                        <!-- Random number -->
                                        <div class="block w-20">
                                            <span class="text-xl font-semibold">
                                                {{ countCalledNumbers }}
                                            </span>
                                            <span>/90</span>
                                        </div>
                                        <!-- List called numbers -->
                                        <div class="block">
                                            <div class="bg-happy-yellow w-14 h-14 flex justify-center items-center rounded-full text-2xl font-semibold">
                                                {{calledNumbers[0] ? calledNumbers[0] : 0}}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-for="(number, index) in [...calledNumbers.filter((n, index) => index !== 0)]" 
                                        :key="index">
                                        <div class="bg-happy-yellow w-12 h-12 flex justify-center items-center rounded-full mx-1 text-xl font-semibold">
                                            {{ number }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Admin action block -->
                            <div class="h-full col-span-3 py-3 xl:py-0 xl:col-span-1 block bg-base bg-opacity-80 rounded-xl">
                                
                                <div class="h-full flex justify-center items-center">
                                    <!-- Take host option -->
                                    <div v-if="!isCurrentUserAdmin" class="text-center">
                                        <button @click="handleTakeAdmin"
                                        :disabled="isExistUserAdmin"
                                        :class="{
                                            'opacity-70': isExistUserAdmin
                                        }"
                                        class="rounded-full bg-happy-blue text-white py-1 px-3 text-sm font-semibold">
                                            <!-- <img class="w-5 h-5 mt-0.5 mr-1 float-left" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-host-award-events-flaticons-lineal-color-flat-icons.png" alt="host"/> -->
                                            <img class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/32/external-lock-web-programming-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" alt="host"/>
                                            <span>Host</span>
                                        </button>
                                        <button @click="isVoiceOn = !isVoiceOn"
                                            class="rounded-full bg-happy-green text-white mx-1 py-1 px-3 text-sm font-semibold">
                                            <img v-show="isVoiceOn" class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/pulsar-color/48/speaker.png" alt="speaker"/>
                                            <img v-show="!isVoiceOn" class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/pulsar-color/48/mute.png" alt="mute"/>
                                            <span>{{ isVoiceOn ? 'On' : 'Off' }}</span>
                                        </button>
                                    </div>
                                    
                                    
                                    <!-- Admin action -->
                                    <div v-else>
                                        <div class="text-center">
                                            <button @click="handleReleaseAdmin"
                                                class="rounded-full bg-happy-blue text-white mx-1 py-1 px-3 text-sm font-semibold">
                                                <!-- <img class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/pulsar-color/48/delete-sign.png" alt="close-sign"/> -->
                                                <img class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/32/external-unlock-web-programming-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" alt="close-sign"/>
                                                <span>Release</span>
                                            </button>
                                            <button @click="handleStopClear"
                                                class="rounded-full bg-happy-red text-white mx-1 py-1 px-3 text-sm font-semibold">
                                                <!-- <img class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-exiting-from-shopping-mall-with-arrow-outside-mall-filled-tal-revivo.png" alt="suicide"/> -->
                                                <img class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/pulsar-color/48/delete-sign.png" alt="close-sign"/>
                                                <span>End</span>
                                            </button>
                                            <button @click="isVoiceOn = !isVoiceOn"
                                                class="rounded-full bg-happy-green text-white mx-1 py-1 px-3 text-sm font-semibold">
                                                <img class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/pulsar-color/48/speaker.png" alt="speaker"/>
                                                <span>{{ isVoiceOn ? 'On' : 'Off' }}</span>
                                            </button>
                                            <button @click="handleNextNumber"
                                                class="rounded-full bg-happy-green text-white mt-2 mx-1 py-1 px-3 text-sm font-semibold">
                                                <img class="w-4 h-4 mt-0.5 mr-1 float-left" src="https://img.icons8.com/pulsar-color/48/forward.png" alt="forward"/>
                                                <span>Next Number</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-auto xl:h-[calc(100vh-212px)]">
                        <div class="grid grid-cols-3 gap-2">
                            <!-- Display current board -->
                            <div class="h-full col-span-3 xl:col-span-2 bg-base bg-opacity-80 rounded-xl flex justify-center items-center overflow-y-auto">

                                <!-- Display current board -->
                                <div class="my-4 xl:my-1">
                                    <BoardComponent 
                                        :boardNumber="currentBoard?.numbers" 
                                        :color="currentBoard?.color"
                                        :calledNumbers="calledNumbers"
                                        :checkClearBoard="isClearBoard"
                                        @win-game="handleWinGame" 
                                        @reset-clear-board="isClearBoard = false"
                                        @gonna-win="handleGonnaWin"
                                    />
                                </div>
                            </div>
                            <!-- ChatBox block -->
                            <div class="h-full col-span-3 xl:col-span-1 bg-base bg-opacity-80 rounded-xl">
                                <h3 class="content-title">
                                    Chat Box
                                </h3>
                                <!-- Display chat box | md:h-[calc(100vh-212px-87px-106px-350px)]  -->
                                <div class="
                                    relative w-full h-[320px] 
                                    md:min-h-[300px] md:h-[calc(100vh-212px-595px)]                                     xl:min-h-[500px] xl:h-[calc(100vh-212px-44px)]">
                                    <div id="chat-box" class="
                                        h-[250px] overflow-y-auto
                                        md:h-[calc(100%-80px)] 
                                        xl:h-[calc(100vh-230px-32%)]">
                                        <div v-for="(m, index) in messages" 
                                        :key="index"
                                        class="mx-3">
                                            <div v-if="!!(m.username === 'BotChat')"
                                            class="my-2 flex justify-center">
                                                <div class="w-fit px-4 py-1 text-xs bg-violet-300 rounded">
                                                    {{ m.message }}
                                                </div>
                                            </div>
                                            <div v-else-if="!!(m.username !== route.query.username)" 
                                            class="my-2">
                                                <div class="text-left font-semibold text-xs text-orange-900 opacity-40 ml-3 mb-[-3px]">
                                                    {{ m.username }}
                                                </div>
                                                <div class="w-fit px-4 py-1 text-sm bg-happy-green rounded-full text-left">
                                                    {{ m.message }}
                                                </div>
                                            </div>
                                            <div v-else
                                            class="flex justify-end my-2">
                                                <div class="w-fit px-4 py-1 text-sm bg-happy-blue rounded-full text-right">
                                                    {{ m.message }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="absolute bottom-[40px] xl:bottom-[60px] w-full">
                                        <div class="w-[90%] mx-auto text-sm">
                                            <input
                                            v-model="message"
                                            @keyup="handleTypingEvent($event)"
                                            @keyup.enter="handleSendMessage"
                                            ref="typingInputRef"
                                            class="shadow-md border rounded-full w-full py-2 pl-5 pr-12 xl:pr-10 text-gray-700 focus:outline-none"
                                            type="text"
                                            placeholder="tap enter to send">
                                        </div>
                                    </div>
                                    <div @click="isShowEmoji = !isShowEmoji" 
                                        class="absolute bottom-[38px] xl:bottom-[58px] right-[40px] xl:right-[30px]">
                                        <button><img class="w-7 h-7" src="https://img.icons8.com/emoji/48/smiling-face-with-smiling-eyes.png" alt="smile"/></button>
                                    </div>
                                    <div v-show="isShowEmoji" 
                                        class="absolute bottom-[80px] xl:bottom-[100px] right-[25px]">
                                        <EmojiPicker 
                                            :hide-group-names="true"
                                            :disable-sticky-group-names="true"
                                            :disable-skin-tones="true"
                                            :display-recent="true"
                                            @select="handleSelectEmoji" />
                                    </div>
                                    <!-- Display typing -->
                                    <p 
                                    class="absolute bottom-[15px] xl:bottom-[35px] left-8 mx-6 text-left text-sm">
                                        <span v-if="!!(typing.usernameList.length === 1)">
                                            {{ typing.usernameList[0] }} is typing
                                        </span>
                                        <span v-if="!!(typing.usernameList.length > 1)">
                                            <label v-for="(name, index) in typing.usernameList"
                                            :key="index">
                                                <span>{{ name }}</span> 
                                                <span v-show="typing.usernameList.length-1 !== index">, </span> 
                                            </label>
                                            are typing...
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed, reactive, watch, Ref, markRaw } from 'vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import Swal from 'sweetalert2';
    import { useStoreData } from '@/stores/store';
    import { useRoute, useRouter } from 'vue-router'
    import { storeToRefs } from 'pinia';
    import { Message } from '@/interfaces/Message';
    import { Board } from '@/interfaces/Board';
    import { BoardRoom } from '@/interfaces/BoardRoom';
    import EmojiPicker from 'vue3-emoji-picker'
    import 'vue3-emoji-picker/css'
    import AgoraRTC, { IAgoraRTCClient, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
    import { appid } from '@/assets/appid';

    declare global {
        interface Window {
            responsiveVoice?: any;
        }
    }

    //static variable
    const randomNumber = ref<number>(0);
    const calledNumbers = ref<(number | null)[]>([]);
    const messages = ref<Message[]>([]);
    const message = ref<string>("");
    const store = useStoreData();
    const route = useRoute();
    const router = useRouter();
    const isClearBoard = ref<boolean>(false);
    const timeoutScroll = ref<number>();
    const customBoards = ref<Board[]>([]);
    const isVoiceOn = ref<boolean>(true);
    const isShowEmoji = ref<boolean>(false);
    const typingInputRef = ref<Ref|null>(null);

    const typing = reactive({
        isTyping: false as boolean,
        timeout: undefined as number | undefined,
        usernameList: [] as string[],
    })
    const backgroundMusic = reactive({
        isOn: true as boolean,
        musicTrack: new Audio(require("@/assets/background_music.mp3")) as HTMLAudioElement,
    })
    const agora = reactive({
        appid: appid,
        token: null,
        rtcUid: route.query.username ? route.query.username.toString() : "",
        room: route.query.room ? route.query.room.toString() : "",
        rtcClient: null as null|IAgoraRTCClient,
        audioTrack: {
            localAudioTrack: null as null|Promise<IMicrophoneAudioTrack>,
            remoteAudioTracks: {} as any
        },
        micMuted: true,
        isFirstTimeTurnMicro: true,
    })

    async function initRtc () {
        agora.rtcClient = markRaw(AgoraRTC.createClient({mode:"rtc", codec:"vp8"}));

        // agora.rtcClient.on('user-joined', handleUserJoined);
        agora.rtcClient.on('user-published', handleUserPublished);
        agora.rtcClient.on('user-left', handleUserLeft);

        await agora.rtcClient.join(
            agora.appid, agora.room, agora.token, agora.rtcUid
        );

        agora.audioTrack.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
        (await agora.audioTrack.localAudioTrack).setMuted(agora.micMuted);
        await agora.rtcClient.publish(await agora.audioTrack.localAudioTrack);

    }

    //store data
    const { users, boards, boards_room, socketIO } = storeToRefs(store);

    const isGameStarted = computed(() => calledNumbers.value.length > 0 ? true : false);
    const isCurrentUserAdmin = computed(() => {
        const user  = users.value.find(user => 
            user.username === route.query.username && user.room === route.query.room
        );
        return !!(user?.isAdmin); 
    })
    const isExistUserAdmin = computed(() => {
        const index = users.value.findIndex(user => 
            user.isAdmin === true && user.room === route.query.room
        ); 
        return !!(index !==-1);
    })
    const countCalledNumbers = computed(() => calledNumbers.value.length);
    const currentBoard = computed(() => {
        return customBoards.value.find(b => b.username === route.query.username);
    })

    watch(isGameStarted, (isGameStartedNew) => {
        if(isCurrentUserAdmin.value){
            const room = route.query.room ? route.query.room.toString() : '';
            if(isGameStartedNew){
                store.addStartedRoom(room);
            } else{
                store.removeStartedRoom(room);
            }
        }
    })

    //to handle in watch when boards or boards_room change
    const twoVariable = computed<[Board[], BoardRoom[]]>(() => [boards.value, boards_room.value]);
    watch(twoVariable, async (newValue) => {
        if(newValue){
            let tempBoards: Board[] = [];
            //run loop with boards list
            newValue[0].forEach(item => {
                //check if boards_room exist, init username
                const rsBoard = newValue[1].find(br => 
                    br.boardId === item.id && br.room === route.query.room
                );
                tempBoards.push({
                    ...item, 
                    username: rsBoard ? rsBoard.username : null,
                    micMuted: rsBoard ? rsBoard.micMuted : false,
                })
            })
            customBoards.value = tempBoards;
        }
    }, { deep: true });

    //lifecycle hook
    onMounted(() => {
        //initial api data from back-end
        store.getUsersFromAPI();
        store.getBoardsFromAPI();
        store.getBoardsRoomFromAPI();
        messages.value.push({
            username: 'BotChat',
            message: `Welcome ${route.query.username}!`
        })
        handleScrollToBottom();

        //Agora RTC
        // initRtc(); 
        
        //set default for responsive voice
        window.responsiveVoice.setDefaultVoice("Vietnamese Female");
        window.responsiveVoice.setDefaultRate(1.2);

        //set background music
        if(backgroundMusic.isOn){
            backgroundMusic.musicTrack.play();
            backgroundMusic.musicTrack.loop = true;
            backgroundMusic.musicTrack.volume = 0.2;
        }

        //listen socket.io connection
        socketIO.value.on('someoneJoinRoom', (username) => {
            store.getUsersFromAPI();
            store.getBoardsFromAPI();
            store.getBoardsRoomFromAPI();
            messages.value.push({
                username: 'BotChat',
                message: `${username}, just joined`
            })
            handleScrollToBottom();
        })

        socketIO.value.on('someoneChangeBoardToAll', () => {
            store.getBoardsFromAPI();
            store.getBoardsRoomFromAPI();
        })

        socketIO.value.on('someoneChangeMicMuted', () => {
            store.getBoardsRoomFromAPI();
        })

        socketIO.value.on('someoneLeaveRoom', (username) => {
            store.getUsersFromAPI();
            // store.getBoardsFromAPI(); - not reset all boards
            store.getBoardsRoomFromAPI();
            messages.value.push({
                username: 'BotChat',
                message: `${username}, just left`
            })
        })

        socketIO.value.on('updateRandomNumber', (data) => {
            randomNumber.value = data.randomNumber;
            calledNumbers.value = data.calledNumbers;

            if(isVoiceOn.value){
                handleSpeakNumber(data.randomNumber);
            }
        })

        socketIO.value.on('updateStopAndClear', () => {
            changeStopAndClear();
        })
        
        socketIO.value.on('someoneSendMessageToAll', (data) => {
            //add new message
            messages.value.push({ ...data });

            //scroll to bottom when submit chatting
            handleScrollToBottom();
        })

        socketIO.value.on('someoneTypingMessage', (username) => {
            typing.usernameList.push(username);
        })

        socketIO.value.on('someoneNoLongerTyping', (username) => {
            const index = typing.usernameList.indexOf(username);
            typing.usernameList.splice(index, 1);
        })

        socketIO.value.on('winGameOne', (username) => {
            //user win game, alert to all
            route.query.username === username ? alertWinGame("You") : alertLuckNextTime(username);

            //Sent message for the others
            messages.value.push({
                username: 'BotChat',
                message: `${username} won!!!`
            })
            //clear numbers and boards
            changeStopAndClear();
        })

        socketIO.value.on('winGameMultiple', (usernameList) => {
            //user win game, alert to all
            const isWin = usernameList.includes(route.query.username);
            isWin ? alertWinGame(usernameList) : alertLuckNextTime(usernameList);

            //Sent message for the others
            messages.value.push({
                username: 'BotChat',
                message: `${usernameList} won!!!`
            })
            //clear numbers and boards
            changeStopAndClear();
        })

        socketIO.value.on('someoneGonnaWinToAll', (username) => {
            //add to chatbox
            messages.value.push({
                username: 'BotChat',
                message: `${username} - just got 4 numbers in a row`
            })

            //scroll chatbox to bottom
            handleScrollToBottom();

            //show popup
            Swal.fire({
                position: "top-end",
                text: `${username} - just got 4 numbers in a row`,
                showConfirmButton: false,
                backdrop: false,
                timer: 3000
            });
        })  
            

        socketIO.value.on('someoneTakeAdminToAll', () => {
            store.getUsersFromAPI();
        })

        socketIO.value.on('someoneReleaseAdminToAll', () => {
            store.getUsersFromAPI();
        })
    })

    //handle function
    function handleToggleBackgroundMusic(){
        backgroundMusic.isOn = !backgroundMusic.isOn;
        if(backgroundMusic.isOn){
            backgroundMusic.musicTrack.play();
        } else{
            backgroundMusic.musicTrack.pause();
        }
    }

    async function handleToggleMicrophone(){
        agora.micMuted = !agora.micMuted;

        // init RTC at the first time
        if(agora.isFirstTimeTurnMicro && !agora.micMuted){
            initRtc();
            agora.isFirstTimeTurnMicro = false;
        }
        // adjust muted
        else{
            (await agora.audioTrack.localAudioTrack)?.setMuted(agora.micMuted);
        }

        store.socketIO.emit("changeMicMuted", {
            username: route.query.username,
            room: route.query.room,
            micMuted: agora.micMuted,
        })
    }

    // function handleUserJoined(user: any){
    //     // console.log('user joined', user);
    // }

    async function handleUserPublished(user: any, mediaType: any){
        await agora.rtcClient?.subscribe(user, mediaType);

        if(mediaType === 'audio'){
            agora.audioTrack.remoteAudioTracks[user.uid] = [user.audioTrack];
            user.audioTrack.play();
        }
    }

    function handleUserLeft(user: any){
        delete agora.audioTrack.remoteAudioTracks[user.uid];
    }

    function handleScrollToBottom(){
        clearTimeout(timeoutScroll.value);
        timeoutScroll.value = setTimeout(() => {
            const el = document.getElementById('chat-box');
            if (el) {
                el.scrollTop = el.scrollHeight;
            }
        }, 0)
    }

    function handleSpeakNumber(number: number){
        //responsiveVoice import at index.html
        window.responsiveVoice.speak(number.toString(), "Vietnamese Female", {volume: 4});
    }

    function handleNextNumber(){
        let randomTemp = 0;
        let calledNumbersTemp = [...calledNumbers.value];
        do{
            randomTemp = Math.floor(Math.random() * 90 + 1);
        }while(calledNumbersTemp.indexOf(randomTemp) !== -1);
        
        //speak random number
        if(isVoiceOn.value){
            handleSpeakNumber(randomTemp);
        }

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
        isClearBoard.value = true;
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
            if (result.isConfirmed){
                //send socket event when confirm
                socketIO.value.emit('changeStopAndClear', (route.query.room));
            }
        })
    }

    function handleChangeBoard(targetBoardId: number){
        //send event to server | socket.io
        socketIO.value.emit("userChangeBoard", {
            username: route.query.username,
            room: route.query.room,
            targetBoardId: targetBoardId
        })
    }

    function handleSendMessage() {
        if(message.value === ""){
            return;
        }
        socketIO.value.emit('someoneSendMessage', ({
            room: route.query.room,
            username: route.query.username,
            message: message.value
        }))
        message.value = "";
        isShowEmoji.value = false;
    }

    function timeoutFunction(){
        typing.isTyping = false;
        socketIO.value.emit("noLongerTypingMessage", ({
            username: route.query.username,
            room: route.query.room
        }))
    }

    function handleTypingEvent(event: KeyboardEvent) {
        if(event.key !== 'Enter'){
            if(!typing.isTyping){
                typing.isTyping = true;
                socketIO.value.emit("typingMessage", ({
                    username: route.query.username,
                    room: route.query.room
                }))
                clearTimeout(typing.timeout);
                typing.timeout = setTimeout(timeoutFunction, 600);
            }else{
                clearTimeout(typing.timeout);
                typing.timeout = setTimeout(timeoutFunction, 600);
            }
        }

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

    async function handleLeaveRoom(){
        // pause background music
        backgroundMusic.musicTrack.pause();

        // stop audio calling
        (await agora.audioTrack.localAudioTrack)?.stop();
        (await agora.audioTrack.localAudioTrack)?.close();
        agora.rtcClient?.unpublish();
        agora.rtcClient?.leave();

        // move back to login page
        router.push({
            name: 'login'
        })

        // handle leave room
        socketIO.value.emit("userLeaveRoom", {
            username: route.query.username,
            room: route.query.room
        })
    }

    function handleSelectEmoji(emoji: any) {
        message.value = message.value.concat(emoji.i);
        typingInputRef.value.focus();
    }

    function alertLuckNextTime(username: string) {
        Swal.fire({
            title: `${username} won! Better luck next time.`,
            confirmButtonText: 'End Game',
            imageUrl: "https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-shamrock-st-patrick-day-wanicon-lineal-color-wanicon.png",
            imageWidth: 100,
            imageHeight: 100,
            padding: '1rem',
        })
    }

    function alertWinGame (username: string) {
        Swal.fire({
            title: `Congratulations! ${username} won`,
            confirmButtonText: 'End Game',
            imageUrl: "https://img.icons8.com/external-filled-outline-geotatah/64/external-best-friend-best-friend-forever-filled-outline-filled-outline-geotatah-6.png",
            imageWidth: 100,
            imageHeight: 100,
            padding: '1rem',
        })
    }

    //handle function from BoardComponent
    function handleWinGame(winNumber: number){
        socketIO.value.emit('someoneWinGame', {
            username: route.query.username,
            room: route.query.room,
            winNumber: winNumber,
        })
    }

    function handleGonnaWin(waitingNumber: number){
        socketIO.value.emit('gonnaWin', ({
            username: route.query.username,
            room: route.query.room,
            waitingNumber: waitingNumber
        }))
    }
</script>