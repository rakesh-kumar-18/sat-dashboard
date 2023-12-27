import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DeleteRecord = () => {
	const [userList, setUserList] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUserList, setFilteredUserList] = useState(null);

	useEffect(() => {
		const localStorageData = JSON.parse(localStorage.getItem("user"));
		setUserList(localStorageData);
		setFilteredUserList(localStorageData);
	}, []);

	const deleteUser = (name) => {
		const updatedUserList = userList.filter((user) => user.data.name !== name);

		setFilteredUserList(updatedUserList);
		setUserList(updatedUserList);
		localStorage.setItem("user", JSON.stringify(updatedUserList));
	};

	const handleSearch = () => {
		const filteredList = userList.filter((item) =>
			item.data.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredUserList(filteredList);
	};

	return (
		<div className='flex flex-col space-y-4 mt-10 justify-center items-center'>
			<h2>Delete Record</h2>
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
									<TableCell>Remove Record</TableCell>
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
										<TableCell>
											<button
												onClick={() => deleteUser(item.data.name)}
												className='p-1 px-2 bg-red-500 rounded-md uppercase text-white'
											>
												Remove
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

export default DeleteRecord;
