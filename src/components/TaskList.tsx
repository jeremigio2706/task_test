import React from 'react';
import { List, Box, CircularProgress, Alert, } from '@mui/material';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    loading: boolean
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete, loading }) => {
    if (loading) {
        return (
            <Box className="flex justify-center p-8">
                <CircularProgress />
            </Box>
        );
    }

    if (!tasks.length) {
        return (
            <Alert severity="info" className="mt-4">
                "No se encontraron tareas. Agrega tu primera tarea!"
            </Alert>
        );
    }

    return (
        <List>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </List>

    )
}


export default TaskList;
