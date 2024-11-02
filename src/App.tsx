import React, { useEffect, useState } from 'react';
import { fetchTasks } from './services/api';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { Task } from './types/Task';
import { Container, Typography, Alert, Paper, Pagination, Box } from '@mui/material';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {

    const loadTasks = async () => {
      try {
        setLoading(true);
        const tasksFromApi = await fetchTasks();
        localStorage.setItem('tasks', JSON.stringify(tasksFromApi.slice(0, 10)));
        setTasks(tasksFromApi.slice(0, 10));
      } catch (err) {
        setError('Failed to fetch tasks');

        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } finally {
        setLoading(false);
      }

    };
    loadTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pageCount = Math.ceil(tasks.length / tasksPerPage);
  const paginatedTasks = tasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );

  return (
    <Container maxWidth="sm">
      <Paper className="p-6">
        <Typography variant="h4" component="h1" sx={{ mb: 2 }} align="center">
          Gestion de Tareas
        </Typography>
        <AddTaskForm
          onAddTask={handleAddTask}
        />
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <TaskList tasks={paginatedTasks} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} loading={loading} />
        {pageCount > 1 && (
          <Box className="flex justify-center mt-4">
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default App;
