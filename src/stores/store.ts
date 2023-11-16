import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { User } from "@/interfaces/User";
import { Board } from "@/interfaces/Board";

const uri = 'http://localhost:8000';
const headers = {
    'Content-Type': 'application/json',
}
export const useStoreData = defineStore('storeData', {
    state: () => {
        return {
            socketIO: io(uri),
            users: [] as User[],
            boards: [] as Board[],
            currentBoard: null as Board|null,
        }
    },
    getters: {
        //no need
        // getUsers(): User[] {
        //     return this.users;
        // }
    },
    actions: {
        
        // USER API
        async getUsersFromAPI () {
            const response = await fetch(`${uri}/users`, {
                method: 'GET',
                headers: headers
            });
            this.users = await response.json();
        },

        // BOARD API
        async getBoardsFromAPI () {
            const response = await fetch(`${uri}/boards`, {
                method: 'GET',
                headers: headers
            })
            this.boards = await response.json();
        },
        async getBoardByUsernameFromAPI (username: string) {
            const response = await fetch(`${uri}/boards/${username}`, {
                method: 'GET',
                headers: headers
            })
            this.currentBoard = await response.json();
        },
        async updateUsernameInBoardFromAPI (username: string, targetBoardId: number) {
            const bodyData = {
                username,
                targetBoardId
            }
            await fetch(`${uri}/boards/`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(bodyData)
            })
        }
    }
})