<template>
    <div class="room_page 2xl:flex 2xl:justify-center bg-image-base background-image">
        <!-- Responsive concept
            normal: phone
            md - lg: tablet
            xl: laptop
            2xl: desktop 
        -->

        <!-- Full screen -->
        <div class="w-full min-h-screen xl:h-screen xl:max-h-screen 2xl:w-[80%] overflow-y-auto grid grid-cols-12 p-2 gap-2">
            <!-- Left side -->
            <div class="
                col-span-12 
                md:col-span-4 
                xl:col-span-3">
                <div class="h-full">
                    <!-- Logo block -->
                    <div class="h-[80px] bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl flex mb-2 transition-all duration-300 hover:shadow-2xl">
                        <div class="px-4 pt-1">
                            <img class="w-16 h-16" src="https://i.imgur.com/hB1TKLR.png" alt="Lootoo"/>
                        </div>
                        <h1 class="font-rubik text-4xl text-yellow-500 font-bold h-full flex items-center">LooToo</h1>
                    </div>
                    <!-- User information block -->
                    <div class="h-[100px] w-full mb-2 flex items-center bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl relative transition-all duration-300 hover:shadow-2xl">
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
                            <!-- Background music buttons (disabled)
                            <button v-if="backgroundMusic.isOn"
                                @click="handleToggleBackgroundMusic()">
                                <img class="w-5 h-5" src="https://img.icons8.com/pulsar-color/48/speaker.png" alt="speaker"/>
                            </button>
                            <button v-else
                                @click="handleToggleBackgroundMusic()">
                                <img class="w-5 h-5" src="https://img.icons8.com/pulsar-color/48/mute.png" alt="mute"/>
                            </button>
                            -->
                        </div>
                        <button @click="handleLeaveRoom()"
                            class="absolute top-2 right-2 rounded-full bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 text-white py-1 px-3 text-sm font-semibold">
                            <span>Leave</span>
                            <img class="w-4 h-4 mt-0.5 ml-1 float-right" src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-exiting-from-shopping-mall-with-arrow-outside-mall-filled-tal-revivo.png" alt="suicide"/>
                        </button>
                    </div>
                    <!-- Boards list block -->
                    <div class="h-[250px] md:h-auto min-h-[250px] xl:h-[calc(100vh-212px)] bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl">
                        <h3 class="content-title">
                            Select board here
                        </h3>

                        <div class="flex-1 overflow-y-auto w-full styled-scrollbar">
                            <div
                            v-for="board in customBoards" :key="board.id"
                            @click="board.username === null && !isGameStarted ? handleChangeBoard(board.id) : null"
                            :class="{
                                'hover:cursor-pointer hover:bg-white/40 transform hover:scale-[1.02]': !!(board.username === null && !isGameStarted),
                                'opacity-60 grayscale': !!(board.username !== null || isGameStarted),
                                'grid grid-cols-3 pb-1 transition-all duration-300 rounded-lg mx-2 my-1': true,
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

                    <div class="h-auto xl:h-[100px] mb-2">
                        <div class="h-full grid grid-cols-3 gap-2">
                            <!-- Called numbers block -->
                            <div class="h-full col-span-3 py-3 xl:py-0 xl:col-span-2 bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl overflow-x-hidden flex items-center transition-all duration-300 hover:shadow-2xl">
                                <div class="w-full mx-5 flex justify-start items-center overflow-x-auto styled-scrollbar py-2">
                                    <div class="flex items-center bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md rounded-full py-2 px-4 shrink-0 transition-transform duration-300 hover:scale-105">
                                        <!-- Random number -->
                                        <div class="block w-20">
                                            <span class="text-xl font-semibold">
                                                {{ countCalledNumbers }}
                                            </span>
                                            <span>/90</span>
                                        </div>
                                        <!-- List called numbers (latest) -->
                                        <div class="block">
                                            <div class="bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg w-14 h-14 flex justify-center items-center rounded-full text-2xl font-bold text-gray-800 transition-all duration-300 transform scale-110">
                                                {{calledNumbers[0] ? calledNumbers[0] : 0}}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- History numbers with TransitionGroup -->
                                    <TransitionGroup name="list-number" tag="div" class="flex items-center">
                                        <div v-for="(number, index) in calledNumbers.slice(1)" 
                                            :key="number ? `num-${number}` : `idx-${index}`"
                                            class="shrink-0">
                                            <div class="bg-white/60 border border-white/80 shadow-inner w-12 h-12 flex justify-center items-center rounded-full mx-1.5 text-xl font-semibold text-gray-700 transition-all duration-300 hover:bg-white hover:scale-110">
                                                {{ number }}
                                            </div>
                                        </div>
                                    </TransitionGroup>
                                </div>
                            </div>
                            <!-- Admin action block -->
                            <div class="h-full col-span-3 py-3 xl:py-0 xl:col-span-1 block bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl transition-all duration-300 hover:shadow-2xl">
                                
                                <div class="h-full flex justify-center items-center">
                                    <!-- Take host option -->
                                    <div v-if="!isCurrentUserAdmin" class="flex flex-wrap justify-center items-center gap-3">
                                        <button @click="handleTakeAdmin"
                                        :disabled="isExistUserAdmin"
                                        :class="{
                                            'opacity-50 grayscale cursor-not-allowed': isExistUserAdmin,
                                            'hover:-translate-y-1 hover:shadow-lg active:scale-95': !isExistUserAdmin
                                        }"
                                        class="rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-1.5 px-4 text-sm font-semibold transition-all duration-300 transform flex items-center">
                                            <img class="w-4 h-4 mr-1.5" src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/32/FFFFFF/external-lock-web-programming-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" alt="host"/>
                                            <span>Host</span>
                                        </button>
                                        <button @click="isVoiceOn = !isVoiceOn"
                                            class="rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-1.5 px-4 text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center">
                                            <img v-show="isVoiceOn" class="w-4 h-4 mr-1.5" src="https://img.icons8.com/pulsar-line/48/FFFFFF/speaker.png" alt="speaker"/>
                                            <img v-show="!isVoiceOn" class="w-4 h-4 mr-1.5" src="https://img.icons8.com/pulsar-line/48/FFFFFF/mute.png" alt="mute"/>
                                            <span>{{ isVoiceOn ? 'On' : 'Off' }}</span>
                                        </button>
                                    </div>
                                    
                                    
                                    <!-- Admin action -->
                                    <div v-else>
                                        <div class="flex flex-wrap justify-center items-center gap-3">
                                            <button @click="handleReleaseAdmin"
                                                class="rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-1.5 px-4 text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center">
                                                <img class="w-4 h-4 mr-1.5" src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/32/FFFFFF/external-unlock-web-programming-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" alt="close-sign"/>
                                                <span>Release</span>
                                            </button>
                                            <button @click="handleStopClear"
                                                class="rounded-full bg-gradient-to-r from-red-400 to-rose-500 text-white py-1.5 px-4 text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center">
                                                <img class="w-4 h-4 mr-1.5" src="https://img.icons8.com/pulsar-line/48/FFFFFF/delete-sign.png" alt="close-sign"/>
                                                <span>End</span>
                                            </button>
                                            <button @click="isVoiceOn = !isVoiceOn"
                                                class="rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-1.5 px-4 text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center">
                                                <img v-show="isVoiceOn" class="w-4 h-4 mr-1.5" src="https://img.icons8.com/pulsar-line/48/FFFFFF/speaker.png" alt="speaker"/>
                                                <img v-show="!isVoiceOn" class="w-4 h-4 mr-1.5" src="https://img.icons8.com/pulsar-line/48/FFFFFF/mute.png" alt="mute"/>
                                                <span>{{ isVoiceOn ? 'On' : 'Off' }}</span>
                                            </button>
                                            <button @click="handleNextNumber"
                                                class="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-1.5 px-4 text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 focus:ring-4 focus:ring-orange-300 outline-none flex items-center">
                                                <img class="w-4 h-4 mr-1.5" src="https://img.icons8.com/pulsar-line/48/FFFFFF/forward.png" alt="forward"/>
                                                <span>Next Number</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-auto xl:h-[calc(100vh-124px)] grid grid-cols-3 gap-2">
                            <!-- Display current board -->
                            <div class="h-full col-span-3 xl:col-span-2 bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl flex justify-center items-center overflow-y-auto transition-all duration-300 hover:shadow-2xl">

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
                            <div class="h-full col-span-3 xl:col-span-1 bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl">
                                <h3 class="content-title pb-2 border-b border-white/20 text-indigo-900 drop-shadow-sm font-bold pt-3 bg-white/20 rounded-t-xl mb-0">
                                    Chat Box
                                </h3>
                                <!-- Display chat box -->
                                <div class="
                                    relative w-full flex-1 flex flex-col overflow-hidden 
                                    min-h-[300px] h-[320px] 
                                    md:min-h-[300px] md:h-[calc(100vh-507px)] 
                                    xl:min-h-[500px] xl:h-[calc(100vh-124px-44px)]">
                                    <div id="chat-box" class="
                                        flex-1 overflow-y-auto styled-scrollbar px-2 py-4 relative z-10">
                                        
                                        <TransitionGroup name="chat-list" tag="div" class="space-y-3">
                                            <div v-for="(m, index) in messages" 
                                            :key="'msg-'+index"
                                            class="mx-1">
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
                                                    <div class="w-fit px-4 py-1 text-sm bg-gradient-to-r from-teal-400 to-emerald-500 text-white shadow font-medium rounded-2xl rounded-tl-none text-left max-w-[85%] break-words">
                                                        {{ m.message }}
                                                    </div>
                                                </div>
                                                <div v-else
                                                class="flex justify-end my-1">
                                                    <div class="w-fit px-4 py-1 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow font-medium rounded-2xl rounded-tr-none text-right max-w-[85%] break-words">
                                                        {{ m.message }}
                                                    </div>
                                                </div>
                                            </div>
                                        </TransitionGroup>
                                    </div>
                                    <!-- Chat Input Area -->
                                    <div class="w-full bg-white/40 backdrop-blur-md p-3 rounded-b-xl border-t border-white/50 relative z-20">
                                        <div class="w-full relative flex items-center bg-white/70 rounded-full shadow-inner border border-white/60">
                                            <input
                                            v-model="message"
                                            @keyup="handleTypingEvent($event)"
                                            @keyup.enter="handleSendMessage"
                                            ref="typingInputRef"
                                            class="w-full py-2.5 pl-5 pr-12 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                                            type="text"
                                            placeholder="Type a message...">
                                            
                                            <!-- Emoji Button Inside Input -->
                                            <button @click="isShowEmoji = !isShowEmoji" 
                                                class="absolute right-2 p-1.5 rounded-full hover:bg-white/50 transition-colors">
                                                <img class="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity" src="https://img.icons8.com/emoji/48/smiling-face-with-smiling-eyes.png" alt="smile"/>
                                            </button>
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
                                    </div>
                                        <!-- Typing Indicator -->
                                        <div class="absolute -top-7 left-4 text-xs font-semibold text-indigo-800 bg-white/60 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm transition-opacity duration-300"
                                             :class="typing.usernameList.length > 0 ? 'opacity-100' : 'opacity-0'">
                                            <span v-if="typing.usernameList.length === 1">
                                                {{ typing.usernameList[0] }} is typing...
                                            </span>
                                            <span v-else-if="typing.usernameList.length > 1">
                                                {{ typing.usernameList.join(', ') }} are typing...
                                            </span>
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
    import { ref, onMounted, computed, watch } from 'vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import { useStoreData } from '@/stores/store';
    import { useRoute, useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import { Board } from '@/interfaces/Board';
    import { BoardRoom } from '@/interfaces/BoardRoom';
    import EmojiPicker from 'vue3-emoji-picker';
    import 'vue3-emoji-picker/css';

    // ── Composables ──────────────────────────────────────────────
    import { useAgora } from '@/composables/useAgora';
    import { useChat } from '@/composables/useChat';
    import { useGameLogic } from '@/composables/useGameLogic';
    import { useAdmin } from '@/composables/useAdmin';

    // ── Agora (voice chat) ───────────────────────────────────────
    const { agora, handleToggleMicrophone, leaveRtc } = useAgora();

    // ── Chat (messages, typing, emoji) ───────────────────────────
    const {
        messages, message, typing, isShowEmoji, typingInputRef,
        addBotMessage, handleScrollToBottom, handleSendMessage,
        handleTypingEvent, handleSelectEmoji,
    } = useChat();

    // ── Game logic (numbers, win, popups) ────────────────────────
    const {
        randomNumber, calledNumbers, isClearBoard, isVoiceOn,
        isGameStarted, countCalledNumbers, isGameEnding,
        gonnaWinQueue,
        handleSpeakNumber, handleNextNumber, changeStopAndClear,
        handleStopClear, handleWinGame, handleGonnaWin,
        showNextGonnaWinPopup, closePendingGonnaWinPopups, showWinPopup,
    } = useGameLogic();

    // ── Admin (host role) ────────────────────────────────────────
    const {
        isCurrentUserAdmin, isExistUserAdmin,
        handleTakeAdmin, handleReleaseAdmin,
    } = useAdmin();

    // ── Core dependencies ────────────────────────────────────────
    const store = useStoreData();
    const route = useRoute();
    const router = useRouter();
    const { boards, boards_room, socketIO } = storeToRefs(store);

    // ── Board state ──────────────────────────────────────────────
    const customBoards = ref<Board[]>([]);

    /** The board currently assigned to this user. */
    const currentBoard = computed(() => {
        return customBoards.value.find(b => b.username === route.query.username);
    });

    // ── Watchers ─────────────────────────────────────────────────

    /** Sync started-room list when game starts or stops (admin only). */
    watch(isGameStarted, (isGameStartedNew) => {
        if (isCurrentUserAdmin.value) {
            const room = route.query.room ? route.query.room.toString() : '';
            if (isGameStartedNew) {
                store.addStartedRoom(room);
            } else {
                store.removeStartedRoom(room);
            }
        }
    });

    /** Merge boards + boards_room into customBoards whenever either changes. */
    const boardsAndRooms = computed<[Board[], BoardRoom[]]>(() => [boards.value, boards_room.value]);
    watch(boardsAndRooms, (newValue) => {
        if (newValue) {
            const tempBoards: Board[] = [];
            newValue[0].forEach(item => {
                const rsBoard = newValue[1].find(
                    br => br.boardId === item.id && br.room === route.query.room
                );
                tempBoards.push({
                    ...item,
                    username: rsBoard ? rsBoard.username : null,
                    micMuted: rsBoard ? rsBoard.micMuted : false,
                });
            });
            customBoards.value = tempBoards;
        }
    }, { deep: true });

    // ── Lifecycle ────────────────────────────────────────────────

    onMounted(() => {
        // Re-emit join on refresh/reconnect so the server updates the socket id
        const sessionData = sessionStorage.getItem('lootoo_session');
        if (sessionData) {
            const { username, room } = JSON.parse(sessionData);
            socketIO.value.emit('userJoinRoom', { username, room });
        }

        // Fetch initial API data
        store.getUsersFromAPI();
        store.getBoardsFromAPI();
        store.getBoardsRoomFromAPI();
        addBotMessage(`Welcome ${route.query.username}!`);

        // Set default text-to-speech voice
        window.responsiveVoice.setDefaultVoice('Vietnamese Female');
        window.responsiveVoice.setDefaultRate(1.2);

        // ── Socket listeners ─────────────────────────────────────

        /** Restore game state on reconnect. */
        socketIO.value.on('roomState', (data) => {
            randomNumber.value = data.randomNumber;
            calledNumbers.value = data.calledNumbers;
        });

        /** A brand-new user joined the room. */
        socketIO.value.on('someoneJoinRoom', (username) => {
            store.getUsersFromAPI();
            store.getBoardsFromAPI();
            store.getBoardsRoomFromAPI();
            addBotMessage(`${username}, just joined`);
        });

        socketIO.value.on('someoneChangeBoardToAll', () => {
            store.getBoardsFromAPI();
            store.getBoardsRoomFromAPI();
        });

        socketIO.value.on('someoneChangeMicMuted', () => {
            store.getBoardsRoomFromAPI();
        });

        /** A user's socket disconnected (grace period started). */
        socketIO.value.on('someoneDisconnectRoom', (username) => {
            addBotMessage(`${username}, just left`);
        });

        /** A user successfully reconnected within the grace period. */
        socketIO.value.on('someoneReconnectRoom', (username) => {
            addBotMessage(`${username}, just reconnected`);
        });

        /** A user permanently left the room (grace period expired or manual leave). */
        socketIO.value.on('someoneLeaveRoom', (username) => {
            store.getUsersFromAPI();
            store.getBoardsRoomFromAPI();
            addBotMessage(`${username}, just left room`);
        });

        /** A new number was drawn. */
        socketIO.value.on('updateRandomNumber', (data) => {
            randomNumber.value = data.randomNumber;
            calledNumbers.value = data.calledNumbers;
            if (isVoiceOn.value) {
                handleSpeakNumber(data.randomNumber);
            }
        });

        socketIO.value.on('updateStopAndClear', () => {
            changeStopAndClear();
        });

        /** A chat message was sent by someone. */
        socketIO.value.on('someoneSendMessageToAll', (data) => {
            messages.value.push({ ...data });
            handleScrollToBottom();
        });

        socketIO.value.on('someoneTypingMessage', (username) => {
            typing.usernameList.push(username);
        });

        socketIO.value.on('someoneNoLongerTyping', (username) => {
            const index = typing.usernameList.indexOf(username);
            typing.usernameList.splice(index, 1);
        });

        /** Single winner event. */
        socketIO.value.on('winGameOne', (username) => {
            if (isGameEnding.value) return;
            isGameEnding.value = true;
            closePendingGonnaWinPopups();
            addBotMessage(`${username} won!!!`);
            changeStopAndClear();
            const isWinner = route.query.username === username;
            showWinPopup(isWinner ? 'You' : username, isWinner);
        });

        /** Multiple winners event. */
        socketIO.value.on('winGameMultiple', (usernameList) => {
            if (isGameEnding.value) return;
            isGameEnding.value = true;
            closePendingGonnaWinPopups();
            addBotMessage(`${usernameList} won!!!`);
            changeStopAndClear();
            const isWinner = usernameList.includes(route.query.username);
            showWinPopup(usernameList.toString(), isWinner);
        });

        /** Someone is one number away from winning. */
        socketIO.value.on('someoneGonnaWinToAll', (username) => {
            if (isGameEnding.value) return;
            addBotMessage(`${username} - just got 4 numbers in a row`);
            gonnaWinQueue.value.push(username);
            showNextGonnaWinPopup();
        });

        socketIO.value.on('someoneTakeAdminToAll', () => {
            store.getUsersFromAPI();
        });

        socketIO.value.on('someoneReleaseAdminToAll', () => {
            store.getUsersFromAPI();
        });
    });

    // ── Room-level handlers (orchestration between composables) ──

    /**
     * Sends an event to change the user's board to a target board.
     */
    function handleChangeBoard(targetBoardId: number) {
        socketIO.value.emit('userChangeBoard', {
            username: route.query.username,
            room: route.query.room,
            targetBoardId: targetBoardId,
        });
    }

    /**
     * Disconnects from WebRTC, clears sessions, and leaves the game room.
     */
    async function handleLeaveRoom() {
        sessionStorage.removeItem('lootoo_session');
        sessionStorage.removeItem('lootoo_activeBoard');

        await leaveRtc();

        router.push({ name: 'login' });

        socketIO.value.emit('userLeaveRoom', {
            username: route.query.username,
            room: route.query.room,
        });
    }
</script>

<style scoped>
/* Custom scrollbar for glassmorphism panels */
.styled-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.styled-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.styled-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
}
.styled-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6);
}

/* Chat List Transition */
.chat-list-enter-active,
.chat-list-leave-active,
.chat-list-move {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.chat-list-enter-from,
.chat-list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
.chat-list-leave-active {
  position: absolute;
}

/* Number List Transition */
.list-number-move,
.list-number-enter-active,
.list-number-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-number-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.5);
}
.list-number-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.list-number-leave-active {
  position: absolute;
}
</style>
