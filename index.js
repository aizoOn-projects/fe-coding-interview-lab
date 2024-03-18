const express = require('express');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

// POST: login
app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			username
		}
	});

	if (!user) {
		return res.status(401).json({ error: 'User not found' });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json({ error: 'Invalid password' });
	}

	// For simplicity, assuming successful authentication
	// TODO: Implement token generation or session management for complete security
	res.status(200).json({ message: 'Login successful' });
});

// POST: create a new task
app.post('/tasks', async (req, res) => {
	const { title, description, status } = req.body;
	try {
		const newTask = await prisma.task.create({
			data: {
				title,
				description,
				status,
				priority
			}
		});
		res.status(201).json(newTask);
	} catch (error) {
		res.status(400).json({ error: 'Could not create task' });
	}
});

// GET: get the tasks list
app.get('/tasks', async (req, res) => {
	try {
		const tasks = await prisma.task.findMany();
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: 'Could not fetch tasks' });
	}
});

// PUT: update the task
app.put('/tasks/:id', async (req, res) => {
	const { id } = req.params;
	const { title, description, status } = req.body;
	try {
		const updatedTask = await prisma.task.update({
			where: { id: parseInt(id) },
			data: {
				title,
				description,
				status
			}
		});
		res.json(updatedTask);
	} catch (error) {
		res.status(404).json({ error: 'Task not found' });
	}
});

// DELETE: delete a task
app.delete('/tasks/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.task.delete({
			where: { id: parseInt(id) }
		});
		res.status(204).send(); // No content to send back
	} catch (error) {
		res.status(404).json({ error: 'Task not found' });
	}
});
