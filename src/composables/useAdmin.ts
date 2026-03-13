import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreData } from '@/stores/store';
import { storeToRefs } from 'pinia';

/**
 * Composable encapsulating admin (host) role management.
 */
export function useAdmin() {
    const route = useRoute();
    const store = useStoreData();
    const { users, socketIO } = storeToRefs(store);

    /** Whether the current user holds admin (host) privileges. */
    const isCurrentUserAdmin = computed(() => {
        const user = users.value.find(
            (u) => u.username === route.query.username && u.room === route.query.room
        );
        return !!(user?.isAdmin);
    });

    /** Whether any user in the room currently holds admin privileges. */
    const isExistUserAdmin = computed(() => {
        const index = users.value.findIndex(
            (u) => u.isAdmin === true && u.room === route.query.room
        );
        return index !== -1;
    });

    /**
     * Emits a socket event granting admin (host) privileges to the current user.
     */
    function handleTakeAdmin() {
        socketIO.value.emit('userTakeAdmin', {
            username: route.query.username,
            room: route.query.room,
        });
    }

    /**
     * Emits a socket event relinquishing the current user's admin (host) privileges.
     */
    function handleReleaseAdmin() {
        socketIO.value.emit('userReleaseAdmin', {
            username: route.query.username,
            room: route.query.room,
        });
    }

    return {
        isCurrentUserAdmin,
        isExistUserAdmin,
        handleTakeAdmin,
        handleReleaseAdmin,
    };
}
