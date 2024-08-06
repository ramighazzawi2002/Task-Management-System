import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import axios from "axios";
import Cookies from "js-cookie";

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const TaskItem = ({ task, onEdit, onDelete }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

  const TaskForm = ({ task, onSubmit, onCancel }) => {
    const [title, settitle] = useState(task ? task.title : "");
    const [description, setdescription] = useState(
      task ? task.description : ""
    );

    const handleSubmit = (e, id) => {
      e.preventDefault();
      onSubmit({ userId: id, title, description });
    };

    return (
      <form onSubmit={e => handleSubmit(e, userInfo.id)}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={e => settitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="description"
          value={description}
          onChange={e => setdescription(e.target.value)}
          required
          multiline
          rows={4}
          margin="normal"
        />
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">
            {task ? "Update" : "Create"} Task
          </Button>
        </DialogActions>
      </form>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get("token"); // Retrieve the token from cookies
        if (!token) {
          alert("No token found, please login.");
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/users/protected-route",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        setUserInfo(response.data); // Store the protected data

        // Simulating API calls

        const tasks = await axios.get(`
        http://localhost:5000/api/tasks/get-tasks/${response.data.id}`);

        setTasks(tasks.data); // Store the tasks
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [update]);

  const handleCreateTask = async newTask => {
    await axios.post("http://localhost:5000/api/tasks/add-task", {
      userId: userInfo.id,
      title: newTask.title,
      description: newTask.description,
    });
    setTasks([...tasks, { ...newTask }]);
    console.log(newTask);
    setIsTaskFormOpen(false);
  };

  const handleEditTask = task => {
    setEditingTask(task);
    console.log(editingTask);
    setIsTaskFormOpen(true);
    setUpdate(false);
  };

  const handleUpdateTask = async updatedTask => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setIsTaskFormOpen(false);
    setEditingTask(null);
    await axios.put(`http://localhost:5000/api/tasks/update-task`, {
      title: updatedTask.title,
      description: updatedTask.description,
      id: editingTask.id,
    });
    setUpdate(true);
  };

  const handleDeleteTask = taskId => {
    setTasks(tasks.filter(t => t.id !== taskId));
    axios.put(`http://localhost:5000/api/tasks/delete-task`, {
      id: taskId,
    });
    setUpdate(true);
  };

  const handleLogout = () => {
    // Implement logout logic here
    Cookies.remove("token");
    navigate("/login");
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management System
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {userInfo.username}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsTaskFormOpen(true)}
          sx={{ mb: 2 }}
        >
          Create New Task
        </Button>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
        <Dialog open={isTaskFormOpen} onClose={() => setIsTaskFormOpen(false)}>
          <DialogTitle>
            {editingTask ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogContent>
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setIsTaskFormOpen(false);
                setEditingTask(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default Home;
