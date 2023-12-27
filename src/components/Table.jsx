import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable() {
	const [userList, setUserList] = useState(null);

	useEffect(() => {
		const localStorageData = JSON.parse(localStorage.getItem("user"));
		setUserList(localStorageData);
		console.log(userList);
	}, [userList]);

	return !userList ? (
		<div>No data</div>
	) : (
		<TableContainer component={Paper}>
			{console.log(userList)}
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align='right'>Address</TableCell>
						<TableCell align='right'>City</TableCell>
						<TableCell align='right'>Country</TableCell>
						<TableCell align='right'>Pin</TableCell>
						<TableCell align='right'>SatScore</TableCell>
						<TableCell align='right'>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{userList?.map((item) => (
						<TableRow
							key={item.data.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								{item.data.name}
							</TableCell>
							<TableCell align='right'>{item.data.address}</TableCell>
							<TableCell align='right'>{item.data.city}</TableCell>
							<TableCell align='right'>{item.data.country}</TableCell>
							<TableCell align='right'>{item.data.pin}</TableCell>
							<TableCell align='right'>{item.data.satScore}</TableCell>
							<TableCell align='right'>
								{item.data.satScore < 30 ? (
									<div className='text-red-500 font-bold'>Failed</div>
								) : (
									<div className='text-green-500 font-bold'>Passed</div>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
