import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditPlayerPage = ({ playerToEdit }) => {

    const [name, setName] = useState(playerToEdit.name);
    const [birthdate, setBirthdate] = useState(playerToEdit.birthdate);
    const [debut, setDebut] = useState(playerToEdit.debut);
    const [number, setNumber] = useState(playerToEdit.number);
    const [teamId, setTeamId] = useState(playerToEdit.teamId);
    const [rating, setRating] = useState(playerToEdit.rating);
    const [salary, setSalary] = useState(playerToEdit.salary);

    const history = useHistory();

    const editPlayer = async () => {
        const editedPlayer = { name, birthdate, debut, number, teamId, rating, salary };
        const response = await fetch(`/players/${playerToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedPlayer),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the player");
        } else {
            alert(`Failed to edit player, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Edit Player</h1>
            <table>
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
                        value={number}
                        onChange={e => setNumber(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        value={teamId}
                        onChange={e => setTeamId(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        value={rating}
                        onChange={e => setRating(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        value={salary}
                        onChange={e => setSalary(e.target.value)} />
                    </td>
                    <button
                        onClick={editPlayer}
                    >Save</button>
                </tbody>
            </table>
        </div>
    );
}

export default EditPlayerPage;