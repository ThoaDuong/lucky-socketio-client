import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { User } from "@/interfaces/User";
import { Board } from "@/interfaces/Board";
import { BoardRoom } from "@/interfaces/BoardRoom";

// const uri = 'https://lootoo-app-server.onrender.com';
const uri = 'http://localhost:8000'
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
            boards_room: [] as BoardRoom[],
            listStartedRoom: [] as string[],
        }
    },
    getters: {
        //no need
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

        //BOARD ROOM API
        async getBoardsRoomFromAPI () {
            const response = await fetch(`${uri}/boards_room`, {
                method: 'GET',
                headers: headers
            })
            this.boards_room = await response.json();
        },

        //STARTED ROOM API
        async getListStartedRoom () {
            const response = await fetch(`${uri}/started_room`, {
                method: 'GET',
                headers: headers
            })
            this.listStartedRoom = await response.json();
        },
        async addStartedRoom (room: string) {
            const response = await fetch(`${uri}/started_room/add?room=${room}`, {
                method: 'GET',
                headers: headers,
            })
            if(response?.status !== 200){
                console.log('Error from addStartedRoom', response);
            }
        },
        async removeStartedRoom (room: string) {
            const response = await fetch(`${uri}/started_room/remove?room=${room}`, {
                method: 'GET',
                headers: headers,
            })
            if(response?.status !== 200){
                console.log('Error from removeStartedRoom', response);
            }
        }
    }
})