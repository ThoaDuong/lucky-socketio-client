import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreData } from '@/stores/store';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';

declare global {
    interface Window {
        responsiveVoice?: any;
    }
}

/**
 * Composable encapsulating bingo number drawing, win/gonna-win logic, and popup management.
 */
export function useGameLogic() {
    const route = useRoute();
    const store = useStoreData();
    const { socketIO } = storeToRefs(store);

    const randomNumber = ref<number>(0);
    const calledNumbers = ref<(number | null)[]>([]);
    const isClearBoard = ref<boolean>(false);
    const isVoiceOn = ref<boolean>(true);

    // Queue for "gonna win" popups to show them sequentially
    const gonnaWinQueue = ref<string[]>([]);
    const isShowingGonnaWin = ref<boolean>(false);

    // Flag to block all win/gonnaWin events once game is ending
    const isGameEnding = ref<boolean>(false);

    const isGameStarted = computed(() => calledNumbers.value.length > 0);
    const countCalledNumbers = computed(() => calledNumbers.value.length);

    /**
     * Uses text-to-speech to announce the drawn bingo number in Vietnamese.
     */
    function handleSpeakNumber(number: number) {
        window.responsiveVoice.speak(number.toString(), 'Vietnamese Female', { volume: 4 });
    }

    /**
     * Draws a random unique number (1-90) and broadcasts it to the room.
     */
    function handleNextNumber() {
        let randomTemp = 0;
        const calledNumbersTemp = [...calledNumbers.value];
        do {
            randomTemp = Math.floor(Math.random() * 90 + 1);
        } while (calledNumbersTemp.indexOf(randomTemp) !== -1);

        // speak random number
        if (isVoiceOn.value) {
            handleSpeakNumber(randomTemp);
        }

        // add random number to first position of list called
        calledNumbersTemp.unshift(randomTemp);

        // send socket event
        socketIO.value.emit('changeRandomNumber', {
            randomNumber: randomTemp,
            calledNumbers: calledNumbersTemp,
            room: route.query.room,
        });
    }

    /**
     * Resets local board state: clears called numbers, random number, and resets UI flags.
     */
    function changeStopAndClear() {
        randomNumber.value = 0;
        calledNumbers.value = [];
        isClearBoard.value = true;
        gonnaWinQueue.value = [];
        isShowingGonnaWin.value = false;
    }

    /**
     * Prompts the admin with a confirmation dialog to clear the board and end the current game.
     */
    function handleStopClear() {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: 'Bạn sẽ không thể hoàn tác hành động này',
            icon: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Có, tôi chắc chắn!',
            cancelButtonText: 'Không, hủy bỏ!',
        }).then((result) => {
            if (result.isConfirmed) {
                socketIO.value.emit('changeStopAndClear', route.query.room);
            }
        });
    }

    /**
     * Notifies the server that the user has successfully won the game.
     */
    function handleWinGame(winNumber: number) {
        if (isGameEnding.value) return;

        socketIO.value.emit('someoneWinGame', {
            username: route.query.username,
            room: route.query.room,
            winNumber: winNumber,
        });
    }

    /**
     * Notifies the server that the user is one number away from winning (gonna win).
     */
    function handleGonnaWin(waitingNumber: number) {
        if (isGameEnding.value) return;

        socketIO.value.emit('gonnaWin', {
            username: route.query.username,
            room: route.query.room,
            waitingNumber: waitingNumber,
        });
    }

    /**
     * Selects the next 'gonna win' event from the queue and sequentially displays its popup.
     */
    async function showNextGonnaWinPopup() {
        if (isShowingGonnaWin.value || isGameEnding.value || gonnaWinQueue.value.length === 0) return;

        isShowingGonnaWin.value = true;
        const username = gonnaWinQueue.value.shift()!;

        await Swal.fire({
            position: 'top-end',
            text: `${username} - sắp thắng rồi!`,
            showConfirmButton: false,
            backdrop: false,
            timer: 3000,
        });

        isShowingGonnaWin.value = false;
        showNextGonnaWinPopup(); // Show next in queue
    }

    /**
     * Clears the 'gonna win' popup queue and immediately closes any currently active sweetalert.
     */
    function closePendingGonnaWinPopups() {
        gonnaWinQueue.value = [];
        if (isShowingGonnaWin.value) {
            Swal.close();
            isShowingGonnaWin.value = false;
        }
    }

    /**
     * Displays a final game-over popup announcing the winner(s) and resetting the game flag.
     */
    async function showWinPopup(title: string, isWinner: boolean) {
        if (isWinner) {
            await Swal.fire({
                title: `Chúc mừng! ${title.toLocaleUpperCase()} ĐÃ KINHHHHHH`,
                confirmButtonText: 'Kết Thúc',
                imageUrl: 'https://img.icons8.com/3d-fluency/94/money-mouth-face-1.png',
                imageWidth: 100,
                imageHeight: 100,
                padding: '1rem',
            });
        } else {
            await Swal.fire({
                title: `${title} đã kinh! Chúc may mắn lần sau.`,
                confirmButtonText: 'Kết Thúc',
                imageUrl: 'https://img.icons8.com/3d-fluency/94/crying-face.png',
                imageWidth: 100,
                imageHeight: 100,
                padding: '1rem',
            });
        }

        // Reset flag after user closes popup
        isGameEnding.value = false;
    }

    return {
        randomNumber,
        calledNumbers,
        isClearBoard,
        isVoiceOn,
        isGameStarted,
        countCalledNumbers,
        isGameEnding,
        gonnaWinQueue,
        isShowingGonnaWin,
        handleSpeakNumber,
        handleNextNumber,
        changeStopAndClear,
        handleStopClear,
        handleWinGame,
        handleGonnaWin,
        showNextGonnaWinPopup,
        closePendingGonnaWinPopups,
        showWinPopup,
    };
}
