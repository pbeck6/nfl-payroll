import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

/**
 * Component for a player contains functionality for editing and deleting. Along with all of the player parameter properties.
 */
function Player({ player, onDelete, onEdit}) {
    return (
        <tr>
            <td>{player.name}</td>
            <td>{player.birthdate}</td>
            <td>{player.debut}</td>
            <td>{player.number}</td>
            <td>{player.teamId}</td>
            <td>{player.rating}</td>
            <td>{player.salary}</td>
            <td><MdEdit onClick={() => onEdit(player)}/></td>
            <td><MdDeleteForever onClick={() => onDelete(player._id)}/></td>
        </tr>
    );
}

export default Player