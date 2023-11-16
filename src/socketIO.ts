import { io } from "socket.io-client";

export const socketIO = io("http://localhost:8000");

// //Return data for current user only
// let data = {};
// socketIO.on('welcomeCurrentUser', ({username, room}) => {
//     console.log('testing')
//     data = { username, room }
// })
// export const welcomeCurrentUser = data;


