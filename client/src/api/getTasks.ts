const getTasks = async () => {
	const data = await fetch('/api/tasks');
	const json = await data.json();

	return json;
};

export default getTasks;
