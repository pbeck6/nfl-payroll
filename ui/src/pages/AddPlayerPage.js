import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddPlayerPage = () => {

    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [debut, setDebut] = useState('');
    const [number, setNumber] = useState('');
    const [teamId, setTeamId] = useState('');
    const [rating, setRating] = useState('');
    const [salary, setSalary] = useState('');

    const history = useHistory();

    const addPlayer = async () => {
        const newPlayer = { name, birthdate, debut, number, teamId, rating, salary };
        const response = await fetch('/players', {
            method: 'POST',
            body: JSON.stringify(newPlayer),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the player");
        } else {
            alert(`Failed to add player, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Player</h1>
            <table class="beautiful-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birthdate</th>
                        <th>Debut</th>
                        <th>Number</th>
                        <th>TeamId</th>
                        <th>Rating</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                    <input
                        type="text"
                        placeholder="Enter name here"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="date"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="date"
                        value={debut}
                        onChange={e => setDebut(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        placeholder="Enter number here"
                        value={number}
                        onChange={e => setNumber(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        placeholder="Enter teamId here"
                        value={teamId}
                        onChange={e => setTeamId(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        placeholder="Enter rating here"
                        value={rating}
                        onChange={e => setRating(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        placeholder="Enter salary here"
                        value={salary}
                        onChange={e => setSalary(e.target.value)} />
                    </td>
                    <button
                        onClick={addPlayer}
                    >Add</button>
                </tbody>
            </table>
        </div>
    );
}

export default AddPlayerPage;