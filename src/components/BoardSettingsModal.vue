<template>
    <!-- Board Selection Modal overlay -->
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" @click.self="$emit('close')">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-scale-up border border-white/20">
            <!-- Modal Header -->
            <div class="px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-400 flex justify-between items-center">
                <h2 class="text-xl font-bold text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Cài Đặt Bảng
                </h2>
                <button @click="$emit('close')" class="text-white hover:bg-white/20 p-1 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l18 18" />
                    </svg>
                </button>
            </div>

            <!-- Modal Content -->
            <div class="p-6">
                <p class="text-gray-500 mb-4 text-sm font-medium">Chọn một bảng mới từ danh sách bên dưới:</p>
                <div class="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 styled-scrollbar">
                    <div 
                        v-for="board in boards" :key="board.id"
                        @click="canSelect(board) ? $emit('select', board.id) : null"
                        :class="{
                            'hover:bg-pink-50 cursor-pointer transform hover:scale-[1.01] active:scale-95': canSelect(board),
                            'opacity-60 grayscale cursor-not-allowed': !canSelect(board),
                            'border-pink-200 bg-pink-50/30': board.id === currentBoardId
                        }"
                        class="flex items-center gap-4 p-3 border-2 border-transparent rounded-xl transition-all duration-200">
                        
                        <!-- Board Preview -->
                        <div 
                            :style="{'background': board.color}"
                            class="w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                            <img class="w-7 h-7 invert brightness-0" src="https://img.icons8.com/matisse/100/paper.png" alt="board preview"/>
                        </div>

                        <!-- Board Info -->
                        <div class="flex-1">
                            <h4 class="font-bold text-gray-700">{{ board.title || `Bảng #${board.id}` }}</h4>
                            <p class="text-xs text-gray-400">
                                {{ board.username ? `Đang được ${board.username} sử dụng` : 'Có sẵn' }}
                            </p>
                        </div>

                        <!-- Status Icon -->
                        <div class="flex items-center">
                            <div v-if="board.id === currentBoardId" class="text-pink-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div v-else-if="board.username" class="text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-gray-50 text-right">
                <button @click="$emit('close')" class="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
                    Đóng
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Board } from '@/interfaces/Board';

/**
 * Props for the Board Settings modal.
 */
const props = defineProps<{
    isOpen: boolean;
    boards: Board[];
    currentBoardId: number | null;
    isGameStarted: boolean;
}>();

defineEmits<{
    (e: 'close'): void;
    (e: 'select', boardId: number): void;
}>();

/**
 * Checks whether a board can be selected (available and game not in progress).
 */
function canSelect(board: Board): boolean {
    return board.username === null && !props.isGameStarted;
}
</script>
