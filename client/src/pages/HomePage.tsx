import React, { Context } from 'react';
import TableToolbar from '@/components/TableToolbar';
import Tasks, { Task } from './Tasks';
import DashboardSection from './DashboardSection';
import { createContext, useState } from 'react';
import { ModeToggle } from '@/components/ModeToggle';
import { Badge } from '@/components/ui/badge';

type TasksContextType = {
	tasksData: Task[];
	setTasksData: React.Dispatch<React.SetStateAction<Task[]>>;
	filteredTaskData: Task[];
	setFilteredTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
	currentTaskData: Task | null;
	setCurrentTaskData: React.Dispatch<React.SetStateAction<Task | null>>;
};

export const TasksContext: Context<TasksContextType> = createContext<TasksContextType>({
	tasksData: [],
	setTasksData: () => null,
	filteredTaskData: [],
	setFilteredTaskData: () => null,
	currentTaskData: null,
	setCurrentTaskData: () => {}
});
const HomePage = () => {
	const [tasksData, setTasksData] = useState<Task[]>([]);
	const [currentTaskData, setCurrentTaskData] = useState<Task | null>(null);
	const [filteredTaskData, setFilteredTaskData] = useState<Task[]>([]);

	return (
		<TasksContext.Provider
			value={{
				tasksData,
				setTasksData,
				currentTaskData,
				setCurrentTaskData,
				filteredTaskData,
				setFilteredTaskData
			}}
		>
			<div className='p-5 space-y-4 h-full flex flex-col container'>
				<div className='flex flex-row justify-between'>
					<h1 className='text-2xl font-extralight'>
						Interview Project - Task Management
					</h1>
					<ModeToggle />
				</div>
				<DashboardSection />
				<TableToolbar />
				<Tasks />
				<div className='flex space-x-4 items-center'>
					<div className='flex w-full items-end space-x-4'>
						<a className='text-xs font-light' href='https://www.aizoongroup.com/'>
							<img src='/logo.png' width={'108px'} />
							aizoongroup.com
						</a>
					</div>
					<div className='flex space-x-1 items-center'>
						<span className='text-xs font-light'>version </span>
						<Badge variant={'secondary'}>{APP_VERSION}</Badge>
					</div>
				</div>
			</div>
		</TasksContext.Provider>
	);
};

export default HomePage;
