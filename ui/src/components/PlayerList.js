import React from 'react';
import Player from './Player';


/**
 * Table for players. Will display the player parameters in the header, and then in the table body it will display each player recorded
 * in the database. Makes call down to Player in Player.js to map them to the table.
 */
function PlayerTable({ players, onDelete, onEdit}) {
    return (
        <table id="beautiful-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Birthdate</th>
                    <th>Debut</th>
                    <th>Number</th>
                    <th>teamId</th>
                    <th>rating</th>
                    <th>salary</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player, i) => <Player player={player}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i}/>)}
            </tbody>
        </table>
    )
}

export default PlayerTable