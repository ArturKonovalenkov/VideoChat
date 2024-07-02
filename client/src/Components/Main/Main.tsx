import { useEffect, useState } from 'react';
import socket from '../../socket/socket.js'
import ACTIONS from '../../socket/action.js'
import { useNavigate} from 'react-router';
import {v4} from "uuid"


export default function Main(){

    const [rooms, setRooms] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        socket.on(ACTIONS.SHARE_ROOMS,({rooms=[]}={})=>{
            setRooms(rooms)
        })
    },[])

   
    return(
        <div>
            <h1>Список комнат</h1>
            <ul>
                    {rooms.map(roomID=>(
                        <li key={roomID}>
                            {roomID}
                            <button onClick={()=>{navigate.push(`/room/${roomID}`) }}>подключиться к комнате</button>
                        </li>
                    ))}
            </ul>
            <button onClick={()=>{navigate.push(`/room/${v4()}`) }}>Создать новую комнату</button>
        </div>
    )
}