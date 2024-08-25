// JavaScript source code
import { useState } from "react";

const AddForm = ({ handleSubmit }) => {
    const [formState, setFormState] = useState('');

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(formState);
            setFormState();
        }}>
            <input type="text" placeholder="Enter a Pokemon name..." value={formState} onChange={(e) => setFormState(e.target.value)} />
            <br />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddForm;