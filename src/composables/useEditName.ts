import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStoreData } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { Board } from '@/interfaces/Board';

/**
 * Composable encapsulating the inline username-editing logic.
 */
export function useEditName() {
    const route = useRoute();
    const router = useRouter();
    const store = useStoreData();
    const { socketIO } = storeToRefs(store);

    const isEditingName = ref(false);
    const editNameValue = ref('');
    const nameError = ref('');
    const nameInput = ref<HTMLInputElement | null>(null);

    /**
     * Activates the edit-name input and focuses it.
     */
    function startEditName() {
        isEditingName.value = true;
        editNameValue.value = route.query.username as string;
        nameError.value = '';
        setTimeout(() => {
            if (nameInput.value) nameInput.value.focus();
        }, 50);
    }

    /**
     * Cancels the edit-name flow and clears any error.
     */
    function cancelEditName() {
        isEditingName.value = false;
        nameError.value = '';
    }

    /**
     * Validates and saves the new username via API, then notifies other clients.
     */
    async function saveEditName(customBoards: Board[]) {
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
        const isDuplicate = customBoards.some(b => b.username === newName);
        if (isDuplicate) {
            nameError.value = 'Username already exists';
            setTimeout(() => { nameError.value = ''; }, 2000);
            return;
        }

        const oldName = route.query.username as string;
        const room = route.query.room as string;

        // Call backend API to persist the change
        const response = await store.updateUsernameToAPI(oldName, newName, room);

        if (response.success) {
            // Update URL/Route silently
            router.push({ query: { username: newName, room } });

            // Update Session Storage
            sessionStorage.setItem('lootoo_session', JSON.stringify({ username: newName, room }));

            // Notify other clients via socket
            socketIO.value.emit('userRename', { oldUsername: oldName, newUsername: newName, room });

            cancelEditName();
        } else {
            nameError.value = response.error || 'Error updating name';
            setTimeout(() => { nameError.value = ''; }, 2000);
        }
    }

    return {
        isEditingName,
        editNameValue,
        nameError,
        nameInput,
        startEditName,
        cancelEditName,
        saveEditName,
    };
}
