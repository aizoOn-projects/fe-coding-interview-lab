// createUser.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createUser() {
	const hashedPassword = await bcrypt.hash('codinginterview2024', 10);
	await prisma.user.create({
		data: {
			username: 'polimi',
			password: hashedPassword
		}
	});
	console.log('User created');
}

createUser()
	.catch(e => console.error(e))
	.finally(async () => await prisma.$disconnect());
