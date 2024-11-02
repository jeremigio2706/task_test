import React from 'react';
import {
    ListItem,
    ListItemText,
    IconButton,
    Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../types/Task';

interface TaskItemProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => (
    <ListItem>
        <Checkbox checked={task.completed} onChange={() => onToggleComplete(task.id)} />
        <ListItemText
            primary={task.title}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        />
        <IconButton edge="end" onClick={() => onDelete(task.id)}>
            <DeleteIcon
                style={{ color: 'red' }}
            />
        </IconButton>
    </ListItem>
);



export default TaskItem;
