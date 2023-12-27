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

	useEffect(() => {
		const localStorageData = JSON.parse(localStorage.getItem("user"));
		setUserList(localStorageData);
		console.log(userList);
	}, []);

	const deleteUser = (id) => {
		const updatedUserList = userList.filter((user, ind) => {
			return ind !== id;
		});

		setUserList(updatedUserList);
		localStorage.setItem("user", JSON.stringify(updatedUserList));
	};

	return (
		<div className='flex flex-col space-y-4 mt-10 justify-center items-center '>
			<h2>Delete Record</h2>
			<div>
				{!userList ? (
					<div>No data</div>
				) : (
					<TableContainer component={Paper}>
						{console.log(userList)}
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Remove Record</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{userList?.map((item, ind) => (
									<TableRow
										key={item.data.name}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component='th' scope='row'>
											{item.data.name}
										</TableCell>
										<TableCell>
											<button
												onClick={() => deleteUser(ind)}
												className='p-1 px-2 bg-red-500 rounded-md uppercase  text-white'
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
