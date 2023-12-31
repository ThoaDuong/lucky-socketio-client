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
                        'relative py-[3%]': true,
                        'text-white text-lg border px-1 md:px-2 hover:cursor-pointer': number !== null,
                        'text-lg border px-4': number === null,
                        'px-2 md:px-3': number && number < 20,
                    }"
                    >
                    <span>{{ number }}</span>
                    
                    <!-- show star for selected -->
                    <img v-if="activeBoard[rowIndex].indexOf(number) !== -1" 
                        class="w-11 h-11 absolute top-0 left-0 opacity-80"
                        src="https://img.icons8.com/pulsar-line/48/hand-drawn-star.png" alt="star"/>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup lang="ts">
    import { ref, defineProps, defineEmits, onUnmounted, watch } from 'vue';
    import Swal from 'sweetalert2';
    
    const props = defineProps<{
        boardNumber: (number | null)[][]|undefined,
        calledNumbers: (number | null)[],
        color: string|undefined,
        checkClearBoard: boolean
    }>();
    const emit = defineEmits(['winGame', 'resetClearBoard', 'gonnaWin']);

    const activeBoard = ref<(number | null)[][]>([[], [], [], [], [], [], [], [], []]);
    
    onUnmounted(() => {
        clearActiveBoard();
    })

    //clear active board when change to another board 
    watch(() => props.boardNumber, (newValue, oldValue) => {
        if(newValue && newValue !== oldValue){
            clearActiveBoard();
        }
    })

    watch(() => props.checkClearBoard, (newValue) => {
        if(newValue){
            clearActiveBoard();
            emit('resetClearBoard');
        }
    })

    function handleClickSquare(calledNumber: number | null){
        if(!calledNumber){
            return null;
        }
        props.boardNumber?.map((row, rowIndex) => {
            row.map(number => {
                if(number === calledNumber){
                    let tempActiveBoard: (number | null)[] = activeBoard.value[rowIndex];
                    let index = tempActiveBoard.indexOf(number);
                    index === -1 ? handleAddNumber(tempActiveBoard, number) : handleRemoveNumber(tempActiveBoard, index);
                }
            })  
        })
    }

    function handleAddNumber(tempActiveBoard: (number | null)[], number: number){
        switch(tempActiveBoard.length){
            case 3:
                tempActiveBoard.push(number);
                //alert 3
                emit('gonnaWin');
                break;
            case 4:
                checkWinGame(tempActiveBoard, number);
                break;
            default:
                tempActiveBoard.push(number);
        }
    }

    function handleRemoveNumber(tempActiveBoard: (number | null)[], index: number){
        tempActiveBoard.splice(index, 1);
    }

    function clearActiveBoard(){
        let value: (number | null)[][] = [[], [], [], [], [], [], [], [], []];
        activeBoard.value = value;
    }

    function  alertWinGame(){
        Swal.fire({
            title: 'Congratulation!',
            confirmButtonText: 'End Game',
            imageUrl: "https://img.freepik.com/premium-vector/you-win-sign-pop-art-style_175838-498.jpg?w=360",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Win game image"
        })
    }
    
    function  alertInValidWinGame(missingNumbers: number[]){
        Swal.fire({
            title: 'Oh no!',
            text: `Misunderstanding! The numbers: ${missingNumbers.toString()} have not being called`,
            icon: 'error',
            confirmButtonText: 'Continue'
        })
    }

    function checkWinGame(tempActiveBoard: (number | null)[], number: number){
        //check all number is called
        let missingNumbers: number[] = [];
        props.calledNumbers.indexOf(number) ? missingNumbers.push(number) : null;
        tempActiveBoard.forEach(numberActive => {
            if(numberActive){
                let index = props.calledNumbers.indexOf(numberActive);
                if(index === -1){
                    missingNumbers.push(numberActive);
                }
            }
        })
        //is valid win game
        if(missingNumbers.length > 0){
            alertInValidWinGame(missingNumbers);
        }else{
            //emit function to parent component to handle: RoomView
            emit('winGame');
            alertWinGame();
            clearActiveBoard();
        }
    }
</script>