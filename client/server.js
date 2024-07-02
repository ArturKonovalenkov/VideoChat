import path from 'path'
import express from 'express'
import { createServer } from 'http';
import { Server } from 'socket.io';
import ACTIONS from "./src/socket/action.js" 
import socket from './src/socket/socket.js'
import { version } from 'os';


const PORT =  3000;
const app = express()
const server = createServer(app)
const io = new Server(server);

function getClientRooms(){
    const {rooms} = io.sockets.adapter
    return Array.from(rooms.keys()).filter(roomId=> validateHeaderName(roomId)&& version(roomId) === 4)
}

function shareRoomsInfo(){
    io.emit(ACTIONS.SHARE_ROOMS,{
        rooms: getClientRooms()
    })
}

io.on('connection', (socket) => {
    shareRoomsInfo();
    socket.on(ACTIONS.JOIN, (config) =>{
        const {room: roomID} = config;
        const {rooms: joinedRooms} = socket;

        if(Array.from(joinedRooms).includes(roomID)){
            return console.warn(`Alredy joined to ${roomID}`)
        }
        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

        clients.forEach(
            clientId=>{
                io.to(clientId).emit(ACTIONS.ADD_PEER,{
                    peerID: clientId,
                    createOffer:true,
                })
            })
            socket.join(roomID);
            shareRoomsInfo()
    })
})
function leaveRoom(){
    const {rooms} = socket;

    Array.from(rooms).forEach(roomID=>{
        const client = Array.from(io.socket.adapter.rooms.get(roomID) || []);

        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.REMOVE_PEER,{
                peerID: socket.id,
            })

            socket.emit(ACTIONS.REMOVE_PEER,{
                peerID: clientId
            })
        })
    })
}

socket.on(ACTIONS.LEAVE,leaveRoom);
socket.on("disconnecting", leaveRoom)

server.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
})

