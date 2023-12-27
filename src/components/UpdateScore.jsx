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

	useEffect(() => {
		const localStorageData = JSON.parse(localStorage.getItem("user"));
		setUserList(localStorageData);
		setEditNumList(new Array(localStorageData.length).fill(""));
	}, []);

	const updateScore = (id) => {
		const updatedUserList = userList.map((user, index) => {
			if (index === id) {
				return {
					...user,
					data: {
						...user.data,
						satScore: editNumList[index] || user.data.satScore,
					},
				};
			} else {
				return user;
			}
		});

		localStorage.setItem("user", JSON.stringify(updatedUserList));
		setUserList(updatedUserList);
		setEditNumList(new Array(updatedUserList.length).fill(""));
	};

	return (
		<div className='flex justify-center items-center flex-col mt-10'>
			<h2>Update Score</h2>

			<div>
				{!userList ? (
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
								{userList.map((item, index) => (
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
												value={editNumList[index] || ""}
												onChange={(e) => {
													const value = parseInt(e.target.value, 10);
													const updatedEditNumList = [...editNumList];
													updatedEditNumList[index] = value;
													setEditNumList(updatedEditNumList);
												}}
												placeholder='add...'
												className='w-16 pl-1 p-1 bg-gray-100  rounded-md'
											/>
										</TableCell>
										<TableCell>
											<button
												onClick={() => updateScore(index)}
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
