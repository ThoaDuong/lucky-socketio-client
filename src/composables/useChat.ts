import { ref, reactive, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreData } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { Message } from '@/interfaces/Message';

/**
 * Composable encapsulating chat messages, typing indicators, and emoji selection.
 */
export function useChat() {
    const route = useRoute();
    const store = useStoreData();
    const { socketIO } = storeToRefs(store);

    const messages = ref<Message[]>([]);
    const message = ref<string>('');
    const isShowEmoji = ref<boolean>(false);
    const typingInputRef = ref<Ref | null>(null);
    const timeoutScroll = ref<number>();

    const typing = reactive({
        isTyping: false as boolean,
        timeout: undefined as number | undefined,
        usernameList: [] as string[],
    });

    /**
     * Pushes a system (BotChat) message to the chat box and scrolls to the bottom.
     */
    function addBotMessage(text: string) {
        messages.value.push({
            username: 'BotChat',
            message: text,
        });
        handleScrollToBottom();
    }

    /**
     * Automatically scrolls the chat box down to show the latest messages.
     */
    function handleScrollToBottom() {
        clearTimeout(timeoutScroll.value);
        timeoutScroll.value = setTimeout(() => {
            const el = document.getElementById('chat-box');
            if (el) {
                el.scrollTop = el.scrollHeight;
            }
        }, 0);
    }

    /**
     * Emits a socket event to send the user's current message to the chat room.
     */
    function handleSendMessage() {
        if (message.value === '') {
            return;
        }
        socketIO.value.emit('someoneSendMessage', {
            room: route.query.room,
            username: route.query.username,
            message: message.value,
        });
        message.value = '';
        isShowEmoji.value = false;
    }

    /**
     * Handles typing state timeouts to notify others when the user stops typing.
     */
    function timeoutFunction() {
        typing.isTyping = false;
        socketIO.value.emit('noLongerTypingMessage', {
            username: route.query.username,
            room: route.query.room,
        });
    }

    /**
     * Detects user keystrokes to emit 'typing' events with a debounce timeout.
     */
    function handleTypingEvent(event: KeyboardEvent) {
        if (event.key !== 'Enter') {
            if (!typing.isTyping) {
                typing.isTyping = true;
                socketIO.value.emit('typingMessage', {
                    username: route.query.username,
                    room: route.query.room,
                });
                clearTimeout(typing.timeout);
                typing.timeout = setTimeout(timeoutFunction, 600);
            } else {
                clearTimeout(typing.timeout);
                typing.timeout = setTimeout(timeoutFunction, 600);
            }
        }
    }

    /**
     * Appends the selected emoji character to the chat input field.
     */
    function handleSelectEmoji(emoji: any) {
        message.value = message.value.concat(emoji.i);
        typingInputRef.value.focus();
    }

    return {
        messages,
        message,
        typing,
        isShowEmoji,
        typingInputRef,
        addBotMessage,
        handleScrollToBottom,
        handleSendMessage,
        handleTypingEvent,
        handleSelectEmoji,
    };
}
