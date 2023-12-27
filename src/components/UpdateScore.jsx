import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UpdateScore = () => {
	const [userList, setUserList] = useState(null);
	const [editNumList, setEditNumList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUserList, setFilteredUserList] = useState(null);

	useEffect(() => {
		const localStorageData = JSON.parse(localStorage.getItem("user"));
		setUserList(localStorageData);
		setFilteredUserList(localStorageData);
		setEditNumList(new Array(localStorageData.length).fill(""));
	}, []);

	const updateScore = (id) => {
		const updatedUserList = userList.map((user) => {
			if (user.id === id) {
				return {
					...user,
					data: {
						...user.data,
						satScore: editNumList[userList.indexOf(user)] || user.data.satScore,
					},
				};
			} else {
				return user;
			}
		});

		localStorage.setItem("user", JSON.stringify(updatedUserList));
		setUserList(updatedUserList);
		setFilteredUserList(updatedUserList);
		setEditNumList(new Array(updatedUserList.length).fill(""));
	};

	const handleSearch = () => {
		const filteredList = userList.filter((item) =>
			item.data.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredUserList(filteredList);
	};

	return (
		<div className='flex justify-center items-center flex-col mt-10'>
			<h2 className='text-2xl uppercase'>Update Score</h2>

			<div className='mb-2'>
				<input
					type='text'
					placeholder='Search by name'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='border p-2'
				/>
				<button
					onClick={handleSearch}
					className='ml-2 bg-blue-500 text-white p-2 rounded'
				>
					Search
				</button>
			</div>

			<div>
				{!filteredUserList ? (
					<div>No data</div>
				) : (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Score</TableCell>
									<TableCell>Edit</TableCell>
									<TableCell>Update</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredUserList.map((item) => (
									<TableRow
										key={item.data.name}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component='th' scope='row'>
											{item.data.name}
										</TableCell>
										<TableCell>{item.data.satScore}</TableCell>
										<TableCell>
											<input
												type='number'
												value={editNumList[userList.indexOf(item)] || ""}
												onChange={(e) => {
													const value = parseInt(e.target.value, 10);
													const updatedEditNumList = [...editNumList];
													updatedEditNumList[userList.indexOf(item)] = value;
													setEditNumList(updatedEditNumList);
												}}
												placeholder='add...'
												className='w-16 pl-1 p-1 bg-gray-100 rounded-md'
											/>
										</TableCell>
										<TableCell>
											<button
												onClick={() => updateScore(item.id)}
												className='p-1 bg-blue-500 rounded-md'
											>
												Submit
											</button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</div>
		</div>
	);
};

export default UpdateScore;
