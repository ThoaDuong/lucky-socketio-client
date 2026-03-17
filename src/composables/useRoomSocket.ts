import { useRoute } from 'vue-router';
import { useStoreData } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { Ref } from 'vue';
import { Message } from '@/interfaces/Message';

/**
 * Options passed from RoomView to wire socket events to the correct composable refs.
 */
interface RoomSocketOptions {
    randomNumber: Ref<number>;
    calledNumbers: Ref<number[]>;
    isVoiceOn: Ref<boolean>;
    isGameEnding: Ref<boolean>;
    gonnaWinQueue: Ref<string[]>;
    messages: Ref<Message[]>;
    typing: { usernameList: string[] };
    addBotMessage: (text: string) => void;
    handleScrollToBottom: () => void;
    handleSpeakNumber: (num: number) => void;
    changeStopAndClear: () => void;
    showNextGonnaWinPopup: () => void;
    closePendingGonnaWinPopups: () => void;
    showWinPopup: (name: string, isWinner: boolean) => void;
}

/**
 * Composable that registers all room-level socket listeners.
 * Should be called once inside onMounted.
 */
export function useRoomSocket(options: RoomSocketOptions) {
    const route = useRoute();
    const store = useStoreData();
    const { socketIO } = storeToRefs(store);

    const {
        randomNumber, calledNumbers, isVoiceOn,
        isGameEnding, gonnaWinQueue,
        messages, typing,
        addBotMessage, handleScrollToBottom,
        handleSpeakNumber, changeStopAndClear,
        showNextGonnaWinPopup, closePendingGonnaWinPopups, showWinPopup,
    } = options;

    /**
     * Registers all socket.io event listeners for the room.
     */
    function initSocketListeners() {
        /** Restore game state on reconnect. */
        socketIO.value.on('roomState', (data: any) => {
            randomNumber.value = data.randomNumber;
            calledNumbers.value = data.calledNumbers;
        });

        /** A brand-new user joined the room. */
        socketIO.value.on('someoneJoinRoom', (username: string) => {
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

        socketIO.value.on('someoneChangeSpeakerMuted', () => {
            store.getBoardsRoomFromAPI();
        });

        socketIO.value.on('someoneRenameToAll', ({ oldUsername, newUsername }: { oldUsername: string; newUsername: string }) => {
            store.getUsersFromAPI();
            store.getBoardsRoomFromAPI();
            addBotMessage(`${oldUsername} renamed to ${newUsername}`);
        });

        /** A user's socket disconnected (grace period started). */
        socketIO.value.on('someoneDisconnectRoom', (username: string) => {
            addBotMessage(`${username}, just left`);
        });

        /** A user successfully reconnected within the grace period. */
        socketIO.value.on('someoneReconnectRoom', (username: string) => {
            addBotMessage(`${username}, just reconnected`);
        });

        /** A user permanently left the room. */
        socketIO.value.on('someoneLeaveRoom', (username: string) => {
            store.getUsersFromAPI();
            store.getBoardsRoomFromAPI();
            addBotMessage(`${username}, just left room`);
        });

        /** A new number was drawn. */
        socketIO.value.on('updateRandomNumber', (data: any) => {
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
        socketIO.value.on('someoneSendMessageToAll', (data: any) => {
            messages.value.push({ ...data });
            handleScrollToBottom();
        });

        socketIO.value.on('someoneTypingMessage', (username: string) => {
            typing.usernameList.push(username);
        });

        socketIO.value.on('someoneNoLongerTyping', (username: string) => {
            const index = typing.usernameList.indexOf(username);
            typing.usernameList.splice(index, 1);
        });

        /** Single winner event. */
        socketIO.value.on('winGameOne', (username: string) => {
            if (isGameEnding.value) return;
            isGameEnding.value = true;
            closePendingGonnaWinPopups();
            addBotMessage(`${username} won!!!`);
            changeStopAndClear();
            const isWinner = route.query.username === username;
            showWinPopup(isWinner ? 'You' : username, isWinner);
        });

        /** Multiple winners event. */
        socketIO.value.on('winGameMultiple', (usernameList: string[]) => {
            if (isGameEnding.value) return;
            isGameEnding.value = true;
            closePendingGonnaWinPopups();
            addBotMessage(`${usernameList} won!!!`);
            changeStopAndClear();
            const isWinner = usernameList.includes(route.query.username as string);
            showWinPopup(usernameList.toString(), isWinner);
        });

        /** Someone is one number away from winning. */
        socketIO.value.on('someoneGonnaWinToAll', (username: string) => {
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
    }

    return { initSocketListeners };
}
