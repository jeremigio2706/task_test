import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface AddTaskFormProps {
    onAddTask: (title: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
    const [taskText, setTaskText] = useState<string>('');
    const [error, setError] = useState('');

    const handleAddTask = () => {
        if (!taskText.trim()) {
            setError('El titulo no puede estar vacio');
            return;
        }
        onAddTask(taskText);
        setTaskText('');
        setError('');

    };

    return (
        <Box className="flex gap-4">
            <TextField
                variant="outlined"
                placeholder="Añade nueva tarea..."
                value={taskText}
                error={!!error}
                helperText={error}
                onChange={(e) => setTaskText(e.target.value)}
            />
            <Button onClick={handleAddTask} variant="contained" color="primary">
                Agregar Tarea
            </Button>
        </Box>

    );
};

export default AddTaskForm;
