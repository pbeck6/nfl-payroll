import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


/**
 * Homepage in SPA react app. 
 * Homepage function loads all exercises in database using react effect hook. 
 * Deletes cause page to reload and display data after deletion from database.
 * Edits redirect user to /edit-exercise page in SPA.
 * Lastly, function returns the ExerciseTable and displays it. 
 */
function HomePage({  }) {


    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
            <Link to="/add-exercise">Add an exercise</Link>
        </> 
    )
};

    export default HomePage;