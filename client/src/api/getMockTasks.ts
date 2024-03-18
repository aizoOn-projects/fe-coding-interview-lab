const getMockTasks = async () => {
	const data = await fetch('/MOCK_DATA_100.json');
	const json = await data.json();

	return json;
};

export default getMockTasks;
