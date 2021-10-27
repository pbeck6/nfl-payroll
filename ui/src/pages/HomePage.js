import React from 'react';
import { Link } from 'react-router-dom';
import PlayerTable from '../components/PlayerList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


/**
 * Homepage in SPA react app. 
 * Homepage function loads all players in database using react effect hook. 
 * Deletes cause page to reload and display data after deletion from database.
 * Edits redirect user to /edit-player page in SPA.
 * Lastly, function returns the PlayerTable and displays it. 
 */
function HomePage({ setPlayerToEdit }) {

    const [players, setPlayers] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/players/${_id}`, { method: 'DELETE'});
        if (response.status === 204) {
            setPlayers(players.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete player with _id = ${_id}, status code = ${response.status}`); 
        }
    }


    const onEdit = player => {
        setPlayerToEdit(player);
        history.push("/edit-player");
    }

    const loadPlayers = async () => {
        const response = await fetch('/players');
        const data = await response.json();
        setPlayers(data);
    }

    useEffect(() => {
        loadPlayers();
    }, []);

    return (
        <>
            <h2>List of Players</h2>
            <PlayerTable players={players} onDelete={onDelete} onEdit={onEdit}></PlayerTable>
            <Link to="/add-player">Add a player</Link>
        </> 
    )
};

    export default HomePage;