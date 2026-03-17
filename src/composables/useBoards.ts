import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreData } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { Board } from '@/interfaces/Board';
import { BoardRoom } from '@/interfaces/BoardRoom';

/**
 * Composable managing board state, board selection dialog, and board-related watchers.
 */
export function useBoards(isGameStarted: { value: boolean }, isCurrentUserAdmin: { value: boolean }) {
    const route = useRoute();
    const store = useStoreData();
    const { boards, boards_room, socketIO } = storeToRefs(store);

    const customBoards = ref<Board[]>([]);

    /** The board currently assigned to this user. */
    const currentBoard = computed(() => {
        return customBoards.value.find(b => b.username === route.query.username);
    });

    // ── Board Settings Dialog ────────────────────────────────────
    const isBoardSettingsOpen = ref(false);

    /** Opens the board selection modal. */
    function openBoardSettings() {
        isBoardSettingsOpen.value = true;
    }

    /** Closes the board selection modal. */
    function closeBoardSettings() {
        isBoardSettingsOpen.value = false;
    }

    /**
     * Sends a socket event to change the user's board to a target board.
     */
    function handleChangeBoard(targetBoardId: number) {
        socketIO.value.emit('userChangeBoard', {
            username: route.query.username,
            room: route.query.room,
            targetBoardId,
        });
        closeBoardSettings();
    }

    // ── Watchers ────────────────────────────────────────────────

    /** Sync started-room list when game starts or stops (admin only). */
    watch(() => isGameStarted.value, (started) => {
        if (isCurrentUserAdmin.value) {
            const room = route.query.room ? route.query.room.toString() : '';
            if (started) {
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

    return {
        customBoards,
        currentBoard,
        boards_room,
        isBoardSettingsOpen,
        openBoardSettings,
        closeBoardSettings,
        handleChangeBoard,
    };
}
