import {useState, useEffect} from 'react';
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import {useHistory} from 'react-router-dom';
import {v4} from 'uuid';

export default function Main() {
    const history = useHistory();
    const [rooms, updateRooms] = useState([]);

    useEffect(()=>{
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
          updateRooms(rooms);
        })
    }, []);
    return(
        <div>
            <h1>Available Rooms</h1>
            
            <ul>
                {rooms.map(roomID => (
                    <li key={roomID}>
                        {roomID}
                        <button onClick={() =>{
                            history.push(`/room/${roomID}`);
                        }}>JOIN ROOM</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => {
                history.push(`/room/${v4()}`)
            }}>Create New Room</button>
        </div>
    );
};
