import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await axios.get(API_URL);
    console.log(response.data)
    return response.data;
};
