<template>
    <table class="table-auto mx-auto text-center">
        <tbody class="border-2 border-gray-600">
            <tr v-for="(row, rowIndex) in props.boardNumber" :key="rowIndex">
                <td v-for="(number, index) in row"
                    @click="handleClickSquare(number)"
                    :key="index"
                    :style="{'background': number !== null ? props.color : 'rgb(212 212 216)'}"
                    :class="{
                        'relative': true,
                        'text-white text-lg border px-2 py-3 hover:cursor-pointer': number !== null,
                        'text-lg border px-4 py-3': number === null,
                        'px-3': number && number < 10,
                    }"
                    >
                    <span>{{ number }}</span>
                    <span v-if="activeBoard[rowIndex].indexOf(number) !== -1" class="absolute top-6 left-0.5 border-t-2 rotate-45 border-gray-500 px-4"></span>
                    <span v-if="activeBoard[rowIndex].indexOf(number) !== -1" class="absolute top-6 left-0.5 border-t-2 rotate-[-45deg] border-gray-500 px-4"></span>
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
    const emit = defineEmits(['winGame', 'resetClearBoard']);

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

    watch(() => props.checkClearBoard, (newValue, oldValue) => {
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
        if(tempActiveBoard.length < 1){
            tempActiveBoard.push(number);
        }else{
            checkWinGame(tempActiveBoard, number);
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