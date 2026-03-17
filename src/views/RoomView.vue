<template>
    <div class="room_page 2xl:flex 2xl:flex-col 2xl:items-center bg-gradient-to-br from-pink-200 via-pink-50 to-yellow-200 min-h-screen relative flex flex-col">
        <HeaderComponent />

        <!-- Responsive concept
            normal: phone
            md - lg: tablet
            xl: laptop
            2xl: desktop 
        -->

        <!-- Full screen -->
        <!-- Adjusted padding (pt-24 pb-16) to account for absolute header/footer -->
        <div class="w-full 2xl:w-[80%] px-2 pt-24 pb-4 relative z-10 flex-1 mx-auto flex flex-col gap-2">
            <!-- Row 1: User Info | Called Numbers + Admin Action -->
            <div class="grid grid-cols-12 gap-2 items-stretch">
                <!-- User information block -->
                <div class="col-span-12 md:col-span-4 xl:col-span-3">
                    <div class="h-full w-full flex flex-row justify-start items-center bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl relative transition-all duration-300 hover:shadow-2xl px-4 py-3 gap-4">
                        <!-- Left: Avatar -->
                        <div class="flex-shrink-0">
                            <img class="w-16 h-16 rounded-full border-2 border-pink-200 p-1 bg-white object-cover shadow-sm hover:scale-105 transition-transform" 
                                 src="https://img.icons8.com/clouds/100/corgi.png" 
                                 alt="Profile Avatar" />
                        </div>
                        
                        <!-- Right: Details -->
                        <div class="flex flex-col justify-center text-left flex-1 min-w-0">
                            <!-- Line 1: Username & Edit & Mic/Speaker -->
                            <div class="flex items-center gap-1.5 mb-1 group">
                                <template v-if="!isEditingName">
                                    <h3 class="text-lg font-bold drop-shadow-sm text-pink-600 truncate max-w-[120px]">
                                        {{ route.query.username }}
                                    </h3>
                                    <button @click="startEditName" class="p-1 rounded-full hover:bg-pink-100 text-pink-400 transition-all" title="Edit name">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <!-- Speaker Button -->
                                    <button
                                        @click="handleToggleSpeaker()"
                                        class="p-1 bg-white/50 rounded-full hover:bg-white/80 transition-all duration-300 shadow-sm border border-white/60"
                                        :title="agora.speakerMuted ? 'Turn on speaker' : 'Turn off speaker'">
                                        <img v-if="agora.speakerMuted" class="w-4 h-4" src="https://img.icons8.com/pulsar-line/48/mute.png" alt="speaker muted"/>
                                        <img v-else class="w-4 h-4" src="https://img.icons8.com/pulsar-line/48/speaker.png" alt="speaker on"/>
                                    </button>
                                    <!-- Mic Button -->
                                    <button
                                        @click="handleToggleMicrophone()"
                                        class="p-1 bg-white/50 rounded-full hover:bg-white/80 transition-all duration-300 shadow-sm border border-white/60"
                                        :title="agora.micMuted ? 'Unmute' : 'Mute'">
                                        <img v-if="agora.micMuted" class="w-4 h-4" src="https://img.icons8.com/pulsar-color/48/no-microphone.png" alt="mic muted"/>
                                        <img v-else class="w-4 h-4" src="https://img.icons8.com/pulsar-color/48/radio-studio.png" alt="mic on"/>
                                    </button>
                                </template>
                                <template v-else>
                                    <div class="flex flex-col gap-1 flex-1">
                                        <input 
                                            ref="nameInput"
                                            v-model="editNameValue" 
                                            @keyup.enter="() => saveEditName(customBoards)"
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
                    </div>
                </div>
                <!-- Called Numbers + Admin Action -->
                <div class="col-span-12 md:col-span-8 xl:col-span-9">
                    <div class="h-full grid grid-cols-3 gap-2">
                        <!-- Called numbers block -->
                        <div class="h-full col-span-3 py-3 xl:py-0 xl:col-span-2 bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl overflow-x-hidden flex items-center transition-all duration-300 hover:shadow-2xl">
                            <div class="w-full mx-5 flex justify-start items-center overflow-x-auto styled-scrollbar py-2">
                                <div class="flex items-center bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md rounded-full py-4 px-4 shrink-0 transition-transform duration-300 hover:scale-105">
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
                            <div class="h-full flex flex-col justify-center items-center px-3 py-2 gap-2">
                                <!-- Case 1: No Host -->
                                <template v-if="!hostUsername">
                                    <p class="text-[10px] font-bold text-gray-400 text-center uppercase tracking-tight">Host Available – Become the Host</p>
                                    <button @click="handleTakeAdmin"
                                        class="rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-1.5 px-4 text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center shadow-md">
                                        <img class="w-4 h-4 mr-1.5" src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/32/FFFFFF/external-lock-web-programming-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" alt="host"/>
                                        <span>Take Host</span>
                                    </button>
                                </template>

                                <!-- Case 2: Current User is Host -->
                                <template v-else-if="isCurrentUserAdmin">
                                    <p class="text-[10px] font-bold text-indigo-500 text-center uppercase tracking-tight">You’re the Current Host</p>
                                    <div class="flex flex-col gap-2 w-full items-center">
                                        <!-- Row 1: Release & End -->
                                        <div class="flex gap-2">
                                            <button @click="handleReleaseAdmin"
                                                class="rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-1 px-3 text-[10px] font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95 flex items-center shadow-sm whitespace-nowrap">
                                                <img class="w-3.5 h-3.5 mr-1" src="https://img.icons8.com/external-yogi-aprelliyanto-glyph-yogi-aprelliyanto/32/FFFFFF/external-unlock-web-programming-yogi-aprelliyanto-glyph-yogi-aprelliyanto.png" alt="release"/>
                                                <span>Release</span>
                                            </button>
                                            <button @click="handleStopClear"
                                                class="rounded-full bg-gradient-to-r from-red-400 to-rose-500 text-white py-1 px-3 text-[10px] font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95 flex items-center shadow-sm whitespace-nowrap">
                                                <img class="w-3.5 h-3.5 mr-1" src="https://img.icons8.com/pulsar-line/48/FFFFFF/delete-sign.png" alt="end"/>
                                                <span>End</span>
                                            </button>
                                        </div>
                                        <!-- Row 2: Next Number -->
                                        <button @click="handleNextNumber"
                                            class="w-full max-w-[130px] rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-1.5 px-3 text-[10px] font-black transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus:ring-2 focus:ring-orange-300 outline-none flex justify-center items-center shadow-md uppercase">
                                            <img class="w-3.5 h-3.5 mr-1.5" src="https://img.icons8.com/pulsar-line/48/FFFFFF/forward.png" alt="forward"/>
                                            <span>Next Number</span>
                                        </button>
                                    </div>
                                </template>

                                <!-- Case 3: Player waiting for Host -->
                                <template v-else>
                                    <p class="text-[10px] font-bold text-orange-400 text-center uppercase tracking-tight">Waiting for Host Actions</p>
                                    <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 truncate max-w-full shadow-sm">
                                        {{ hostUsername }}
                                    </span>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 2: User List | Board + ChatBox -->
            <div class="grid grid-cols-12 gap-2 items-stretch flex-1">
                <!-- User List block -->
                <div class="col-span-12 md:col-span-4 xl:col-span-3">
                    <div class="h-full bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl overflow-hidden">
                        <div class="content-title flex justify-between items-center text-gray-700 bg-white/50 border-b border-white/40 px-4 py-2">
                            <h3 class="font-bold">User List</h3>
                            <button @click="openBoardSettings" class="p-1.5 rounded-full hover:bg-gray-200/50 text-gray-500 transition-all" title="Board Settings">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        <div class="w-full flex-1 overflow-y-auto styled-scrollbar">
                            <div
                            v-for="entry in boards_room" :key="entry.username"
                            class="grid grid-cols-12 pb-2 pt-2 transition-all duration-300 rounded-lg mx-2 my-1 border-b border-gray-100 last:border-0 items-center">
                                <!-- Left: Board Color Icon -->
                                <div class="col-span-3 flex justify-center">
                                    <div 
                                        :style="{'background': customBoards.find(b => b.id === entry.boardId)?.color || '#ccc'}"
                                        class="w-10 h-10 p-2 rounded-full shadow-sm flex items-center justify-center">
                                        <img class="w-6 h-6 invert brightness-0" src="https://img.icons8.com/matisse/100/paper.png" alt="board icon"/>
                                    </div>
                                </div>
                                
                                <!-- Center: Username -->
                                <div class="col-span-5 flex items-center overflow-hidden">
                                    <h3 class="text-sm font-bold text-gray-700 truncate" :title="entry.username">
                                        {{ entry.username }}
                                    </h3>
                                </div>

                                <!-- Right: Status Icons (Mic & Speaker) -->
                                <div class="col-span-4 flex justify-end items-center gap-2 pr-2">
                                    <!-- Mic Status -->
                                    <div class="p-1 rounded-full" :class="entry.micMuted ? 'bg-red-50' : 'bg-green-50'">
                                        <img v-if="entry.micMuted" class="w-4 h-4" src="https://img.icons8.com/pulsar-color/48/no-microphone.png" alt="mic muted"/>
                                        <img v-else class="w-4 h-4" src="https://img.icons8.com/pulsar-color/48/radio-studio.png" alt="mic on"/>
                                    </div>
                                    <!-- Speaker Status -->
                                    <div class="p-1 rounded-full" :class="entry.speakerMuted ? 'bg-orange-50' : 'bg-blue-50'">
                                        <img v-if="entry.speakerMuted" class="w-4 h-4" src="https://img.icons8.com/pulsar-line/48/mute.png" alt="speaker muted"/>
                                        <img v-else class="w-4 h-4" src="https://img.icons8.com/pulsar-line/48/speaker.png" alt="speaker on"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Leave Room button at bottom -->
                        <button @click="handleLeaveRoom()"
                            class="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-50/80 hover:bg-red-100 border-t border-red-100 text-red-500 font-semibold text-sm transition-all duration-300 rounded-b-xl">
                            <img class="w-4 h-4" src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/F43F5E/external-exiting-from-shopping-mall-with-arrow-outside-mall-filled-tal-revivo.png" alt="leave"/>
                            <span>Leave Room</span>
                        </button>
                    </div>
                </div>
                <!-- Board + ChatBox -->
                <div class="col-span-12 md:col-span-8 xl:col-span-9">
                    <div class="h-full grid grid-cols-3 gap-2">
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
                            <div class="relative w-full flex-1 flex flex-col overflow-hidden">
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
        <!-- Board Selection Modal -->
        <BoardSettingsModal
            :isOpen="isBoardSettingsOpen"
            :boards="customBoards"
            :currentBoardId="currentBoard?.id ?? null"
            :isGameStarted="isGameStarted"
            @close="closeBoardSettings"
            @select="handleChangeBoard"
        />
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import FooterComponent from '@/components/FooterComponent.vue';
    import BoardSettingsModal from '@/components/BoardSettingsModal.vue';
    import { useStoreData } from '@/stores/store';
    import { useRoute, useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import EmojiPicker from 'vue3-emoji-picker';
    import 'vue3-emoji-picker/css';

    // ── Composables ──────────────────────────────────────────────
    import { useAgora } from '@/composables/useAgora';
    import { useChat } from '@/composables/useChat';
    import { useGameLogic } from '@/composables/useGameLogic';
    import { useAdmin } from '@/composables/useAdmin';
    import { useEditName } from '@/composables/useEditName';
    import { useBoards } from '@/composables/useBoards';
    import { useRoomSocket } from '@/composables/useRoomSocket';

    // ── Agora (voice chat) ───────────────────────────────────────
    const { agora, handleToggleMicrophone, handleToggleSpeaker, leaveRtc } = useAgora();

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
        isCurrentUserAdmin, isExistUserAdmin, hostUsername,
        handleTakeAdmin, handleReleaseAdmin,
    } = useAdmin();

    // ── Edit Name ────────────────────────────────────────────────
    const {
        isEditingName, editNameValue, nameError, nameInput,
        startEditName, cancelEditName, saveEditName,
    } = useEditName();

    // ── Boards (state, watcher, settings dialog) ─────────────────
    const {
        customBoards, currentBoard, boards_room,
        isBoardSettingsOpen, openBoardSettings, closeBoardSettings,
        handleChangeBoard,
    } = useBoards(isGameStarted, isCurrentUserAdmin);

    // ── Socket listeners ─────────────────────────────────────────
    const { initSocketListeners } = useRoomSocket({
        randomNumber, calledNumbers: calledNumbers as any, isVoiceOn,
        isGameEnding, gonnaWinQueue,
        messages, typing,
        addBotMessage, handleScrollToBottom,
        handleSpeakNumber, changeStopAndClear,
        showNextGonnaWinPopup, closePendingGonnaWinPopups, showWinPopup,
    });

    // ── Core dependencies ────────────────────────────────────────
    const store = useStoreData();
    const route = useRoute();
    const router = useRouter();
    const { socketIO } = storeToRefs(store);

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

        // Register all socket listeners
        initSocketListeners();
    });

    // ── Room-level handlers ──────────────────────────────────────

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

/* Modal Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
