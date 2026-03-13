<template>
    <table class="table-auto mx-auto text-center">
        <tbody class="border-2 border-gray-600">
            <tr v-for="(row, rowIndex) in props.boardNumber" :key="rowIndex"
            :class="{
                'border-b-2 border-gray-600': rowIndex === 2 || rowIndex === 5,
            }">
                <!-- #DDDDDD -->
                <td v-for="(number, index) in row"
                    @click="handleClickSquare(number)"
                    :key="index"
                    :style="{'background': number !== null ? props.color : '#F1EAFF'}"
                    :class="{
                        'relative py-[0.9rem] text-md md:text-xl': true,
                        'text-white text-lg border px-2 md:px-[0.6rem] hover:cursor-pointer': number !== null,
                        'text-lg border px-4': number === null,
                        'px-3 md:px-[0.8rem]': number && number < 20,
                        'px-3 md:px-[1rem]': number && number < 10,
                    }"
                    >
                    <span>{{ number }}</span>
                    
                    <!-- show star for selected -->
                    <img v-if="activeBoard[rowIndex].indexOf(number) !== -1" 
                        class="w-11 h-11 absolute top-1 left-0 md:top-2 md:left-[0.75px] opacity-80"
                        src="https://img.icons8.com/pulsar-line/48/hand-drawn-star.png" alt="star"/>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup lang="ts">
    import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
    import Swal from 'sweetalert2';
    
    const props = defineProps<{
        boardNumber: (number | null)[][]|undefined,
        calledNumbers: (number | null)[],
        color: string|undefined,
        checkClearBoard: boolean
    }>();
    const emit = defineEmits(['winGame', 'resetClearBoard', 'gonnaWin']);

    const activeBoard = ref<(number | null)[][]>([[], [], [], [], [], [], [], [], []]);
    const STORAGE_KEY = 'lootoo_activeBoard';

    /** Save active board selections to sessionStorage */
    function saveActiveBoard() {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(activeBoard.value));
    }

    /** Restore active board selections from sessionStorage */
    function restoreActiveBoard() {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                activeBoard.value = JSON.parse(saved);
            } catch {
                clearActiveBoard();
            }
        }
    }

    onMounted(() => {
        restoreActiveBoard();
    })

    onUnmounted(() => {
        clearActiveBoard();
    })

    //clear active board when change to another board 
    watch(() => props.boardNumber, (newValue, oldValue) => {
        if (newValue && oldValue) {
            if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                clearActiveBoard();
            }
        }
    })

    watch(() => props.checkClearBoard, (newValue) => {
        if(newValue){
            clearActiveBoard();
            emit('resetClearBoard');
        }
    })

    /**
     * Handles the click event on a bingo square, adding or removing it from the active board.
     */
    function handleClickSquare(calledNumber: number | null){
        if(!calledNumber){
            return null;
        }
        props.boardNumber?.map((row, rowIndex) => {
            row.map(number => {
                if(number === calledNumber){
                    // tempActiveBoard: list array with selected numbers
                    let tempActiveBoard: (number | null)[] = activeBoard.value[rowIndex];
                    let index = tempActiveBoard.indexOf(number);

                    // row: list array with numbers has selected number (include waiting number)

                    // check if not existed: add else: remove
                    index === -1 ? handleAddNumber(tempActiveBoard, number, row) : handleRemoveNumber(tempActiveBoard, index);
                }
            })  
        })
        // Save state after any click
        saveActiveBoard();
    }

    /**
     * Attempts to add a dialed number to the active selection, checking for potential win conditions.
     */
    function handleAddNumber(tempActiveBoard: (number | null)[], number: number, arrayNumberHasSelected: (number|null)[]){
        switch(tempActiveBoard.length){
            case 3:
                checkGonnaWin(tempActiveBoard, number, arrayNumberHasSelected);
                break;
            case 4:
                checkWinGame(tempActiveBoard, number);
                break;
            default:
                tempActiveBoard.push(number);
        }
    }

    /**
     * Removes an incorrectly selected number from the active board selection.
     */
    function handleRemoveNumber(tempActiveBoard: (number | null)[], index: number){
        tempActiveBoard.splice(index, 1);
    }

    /**
     * Completely resets the user's active board selection and removes it from session storage.
     */
    function clearActiveBoard(){
        let value: (number | null)[][] = [[], [], [], [], [], [], [], [], []];
        activeBoard.value = value;
        sessionStorage.removeItem(STORAGE_KEY);
    }
    
    /**
     * Displays an error popup alerting the user that they selected uncalled numbers.
     */
    function  alertInValidCalledNumbers(missingNumbers: number[]){
        Swal.fire({
            title: 'Oh no!',
            text: `Misunderstanding! The numbers: ${missingNumbers.toString()} have not being called`,
            icon: 'error',
            imageWidth: 60,
            imageHeight: 60,
            confirmButtonText: 'Continue'
        })
    }

    /**
     * Validates selected numbers against the official called numbers to identify any false claims.
     */
    function checkMissingNumbers(tempActiveBoard: (number | null)[], number: number): number[]{
        let missingNumbers: number[] = [];

        // check if selected number not exist in called numbers => add to missing
        props.calledNumbers.indexOf(number) === -1 ? missingNumbers.push(number) : null;

        // check if list selected numbers (not include selected) not exist in called numbers => add to missing
        tempActiveBoard.forEach(numberActive => {
            if(numberActive){
                let index = props.calledNumbers.indexOf(numberActive);
                if(index === -1){
                    missingNumbers.push(numberActive);
                }
            }
        })
        return missingNumbers;
    }

    /**
     * Verifies if the sequence of 5 selected numbers constitutes a valid win.
     */
    function checkWinGame(tempActiveBoard: (number | null)[], number: number){
        //check all number is called
        const missingNumbers: number[] = checkMissingNumbers(tempActiveBoard, number);

        //is valid win game
        if(missingNumbers.length > 0){
            alertInValidCalledNumbers(missingNumbers);
        }else{
            //emit function to parent component to handle: RoomView
            emit('winGame', number);
        }
    }

    /**
     * Finds the single remaining unselected number in a row when 4 numbers have already been selected.
     */
    function findWaitingNumber(tempActiveBoard: (number|null)[], arrayNumberHasSelected: (number|null)[]){
        let waitingNumber = -1;
        arrayNumberHasSelected.forEach(rowNumber => {
            if(rowNumber !== null){
                let index = tempActiveBoard.indexOf(rowNumber);
                if(index === -1){
                    waitingNumber = rowNumber;
                }
            }
        })
        return waitingNumber;
    }

    /**
     * Verifies a 'gonna win' state (4 out of 5 valid numbers) and emits the waiting number event.
     */
    function checkGonnaWin(tempActiveBoard: (number | null)[], number: number, arrayNumberHasSelected: (number|null)[]){
        //check all number is called
        const missingNumbers: number[] = checkMissingNumbers(tempActiveBoard, number);

        //is valid win game
        if(missingNumbers.length > 0){
            alertInValidCalledNumbers(missingNumbers);
        }else{
            tempActiveBoard.push(number);
            const waitingNumber = findWaitingNumber(tempActiveBoard, arrayNumberHasSelected);

            //emit function to parent component to handle: RoomView
            emit('gonnaWin', waitingNumber);
        }
    }
</script>