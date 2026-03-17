<template>
    <div class="room_page 2xl:flex 2xl:justify-center bg-gradient-to-br from-pink-200 via-pink-50 to-yellow-200 min-h-screen relative">
        <HeaderComponent />

        <!-- Responsive concept
            normal: phone
            md - lg: tablet
            xl: laptop
            2xl: desktop 
        -->

        <!-- Full screen -->
        <!-- Adjusted padding (pt-24 pb-16) to account for absolute header/footer -->
        <div class="w-full 2xl:w-[80%] grid grid-cols-12 px-2 pt-24 pb-20 gap-2 relative z-10 w-full">
            <!-- Left side -->
            <div class="
                col-span-12 
                md:col-span-4 
                xl:col-span-3">
                <div class="h-full">
                    <!-- User information block -->
                    <div class="h-auto min-h-[100px] w-full mb-2 flex flex-row justify-start items-center bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl relative transition-all duration-300 hover:shadow-2xl px-4 py-3 gap-4">
                        <!-- Left: Avatar -->
                        <div class="flex-shrink-0">
                            <img class="w-16 h-16 rounded-full border-2 border-pink-200 p-1 bg-white object-cover shadow-sm hover:scale-105 transition-transform" 
                                 src="https://img.icons8.com/clouds/100/corgi.png" 
                                 alt="Profile Avatar" />
                        </div>
                        
                        <!-- Right: Details (3 lines) -->
                        <div class="flex flex-col justify-center text-left flex-1 min-w-0">
                            <!-- Line 1: Username & Edit -->
                            <div class="flex items-center gap-2 mb-1 group">
                                <template v-if="!isEditingName">
                                    <h3 class="text-lg font-bold drop-shadow-sm text-pink-600 truncate max-w-[150px]">
                                        {{ route.query.username }}
                                    </h3>
                                    <button @click="startEditName" class="p-1.5 rounded-full hover:bg-pink-100 text-pink-400 transition-all focus:opacity-100" title="Edit name">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </template>
                                <template v-else>
                                    <div class="flex flex-col gap-1 flex-1">
                                        <input 
                                            ref="nameInput"
                                            v-model="editNameValue" 
                                            @keyup.enter="saveEditName"
                                            @blur="cancelEditName"
                                            class="w-full max-w-[150px] px-2 py-1 text-sm bg-white border-2 border-pink-300 rounded focus:outline-none focus:border-pink-500 text-pink-700 font-bold shadow-sm"
                                            type="text" 
                                            placeholder="Enter new name..."
                                            maxlength="15"
                                        />
                                        <!-- Error message below input -->
                                        <div v-if="nameError" class="text-red-500 text-[10px] font-bold animate-fade-in-up">
                                            {{ nameError }}
                                        </div>
                                    </div>
                                </template>
                            </div>
                            
                            <!-- Line 2: Role -->
                            <p class="text-sm text-gray-700 flex items-center gap-1.5 mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <strong class="text-gray-500 font-medium">Role:</strong> 
                                <span class="font-semibold" :class="isCurrentUserAdmin ? 'text-indigo-600' : 'text-gray-800'">
                                    {{ isCurrentUserAdmin ? 'Host' : 'Player' }}
                                </span>
                            </p>
                            
                            <!-- Line 3: Room Code -->
                            <p class="text-sm text-gray-700 flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                                <strong class="text-gray-500 font-medium">Code:</strong> 
                                <span class="text-pink-500 font-bold bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                                    {{ route.query.room }}
                                </span>
                            </p>
                        </div>

                        <!-- Temprarily Hidden Action Buttons (Mic & Leave) -->
                        <div v-show="false" class="hidden items-center gap-2">
                            <!-- Mic Button -->
                            <button v-if="agora.micMuted"
                                @click="handleToggleMicrophone()"
                                class="p-1.5 bg-white/50 rounded-full hover:bg-white/80 transition-all duration-300 shadow-sm border border-white/60">
                                <img class="w-5 h-5" src="https://img.icons8.com/pulsar-color/48/no-microphone.png" alt="no-microphone"/>
                            </button>
                            <button v-else
                                @click="handleToggleMicrophone()"
                                class="p-1.5 bg-white/50 rounded-full hover:bg-white/80 transition-all duration-300 shadow-sm border border-white/60">
                                <img class="w-5 h-5" src="https://img.icons8.com/pulsar-color/48/radio-studio.png" alt="radio-studio"/>
                            </button>
                            <!-- Leave Button -->
                            <button @click="handleLeaveRoom()"
                                class="rounded-full bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 text-white py-1 px-3 text-sm font-semibold flex items-center">
                                <span>Leave</span>
                                <img class="w-4 h-4 ml-1" src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/ffffff/external-exiting-from-shopping-mall-with-arrow-outside-mall-filled-tal-revivo.png" alt="leave"/>
                            </button>
                        </div>
                    </div>
                    <!-- Boards list block -->
                    <div class="h-auto min-h-[250px] bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl">
                        <h3 class="content-title text-gray-700 bg-white/50 border-b border-white/40">
                            Select board here
                        </h3>

                        <div class="w-full">
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
                col-span-12
                md:col-span-8
                xl:col-span-9">
                <div class="h-full">

                    <div class="h-auto mb-2">
                        <div class="h-full grid grid-cols-3 gap-2">
                            <!-- Called numbers block -->
                            <div class="h-full col-span-3 py-3 xl:py-0 xl:col-span-2 bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl overflow-x-hidden flex items-center transition-all duration-300 hover:shadow-2xl">
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
                            <div class="h-full col-span-3 py-3 xl:py-0 xl:col-span-1 block bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl transition-all duration-300 hover:shadow-2xl">
                                
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
                    <div class="h-auto grid grid-cols-3 gap-2">
                            <!-- Display current board -->
                            <div class="h-full col-span-3 xl:col-span-2 bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl flex justify-center items-start pt-4 transition-all duration-300 hover:shadow-2xl">

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
                            <div class="h-full col-span-3 xl:col-span-1 bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl">
                                <h3 class="content-title pb-2 border-b border-white/40 text-pink-600 drop-shadow-sm font-bold pt-3 bg-white/50 rounded-t-xl mb-0">
                                    Chat Box
                                </h3>
                                <!-- Display chat box -->
                                <div class="
                                    relative w-full flex-1 flex flex-col overflow-hidden 
                                    h-[400px] md:h-[500px] xl:h-[600px]">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterComponent />
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed, watch } from 'vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import FooterComponent from '@/components/FooterComponent.vue';
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

    // ── Edit Name Logic ──────────────────────────────────────────
    const isEditingName = ref(false);
    const editNameValue = ref('');
    const nameError = ref('');
    const nameInput = ref<HTMLInputElement | null>(null);

    const startEditName = () => {
        isEditingName.value = true;
        editNameValue.value = route.query.username as string;
        nameError.value = '';
        setTimeout(() => {
            if (nameInput.value) nameInput.value.focus();
        }, 50);
    };

    const cancelEditName = () => {
        isEditingName.value = false;
        nameError.value = '';
    };

    const saveEditName = async () => {
        const newName = editNameValue.value.trim();
        if (!newName) {
            nameError.value = 'Name cannot be empty';
            return;
        }
        if (newName === route.query.username) {
            cancelEditName();
            return;
        }
        
        // Check for duplicates locally first
        const isDuplicate = customBoards.value.some(b => b.username === newName);
        if (isDuplicate) {
            nameError.value = 'Username already exists';
            // Clear error after 2 seconds
            setTimeout(() => { nameError.value = ''; }, 2000);
            return;
        }

        const oldName = route.query.username as string;
        const room = route.query.room as string;
        
        // Call backend API to persist the change
        const response = await store.updateUsernameToAPI(oldName, newName, room);
        
        if (response.success) {
            // Update URL/Route silently or via router push
            router.push({ query: { username: newName, room } });
            
            // Update Session Storage
            sessionStorage.setItem('lootoo_session', JSON.stringify({ username: newName, room }));
            
            // Notify other clients via socket so they update their boards
            socketIO.value.emit('userRename', { oldUsername: oldName, newUsername: newName, room });
            
            cancelEditName();
        } else {
            nameError.value = response.error || 'Error updating name';
            setTimeout(() => { nameError.value = ''; }, 2000);
        }
    };

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

        socketIO.value.on('someoneRenameToAll', ({ oldUsername, newUsername }) => {
            store.getUsersFromAPI();
            store.getBoardsRoomFromAPI();
            addBotMessage(`${oldUsername} renamed to ${newUsername}`);
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
