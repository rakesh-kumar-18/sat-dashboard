import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const GetRank = () => {
	const [userList, setUserList] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUserList, setFilteredUserList] = useState(null);

	useEffect(() => {
		const localStorageData = JSON.parse(localStorage.getItem("user"));
		const sortedUserList = localStorageData.sort(
			(a, b) => b.data.satScore - a.data.satScore
		);

		const rankedUserList = sortedUserList.map((item, index) => ({
			...item,
			rank: index + 1,
		}));

		setUserList(rankedUserList);
		setFilteredUserList(rankedUserList);
	}, []);

	const handleSearch = () => {
		const filteredList = userList.filter((item) =>
			item.data.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setFilteredUserList(filteredList);
	};

	return (
		<div className='flex flex-col justify-center items-center mt-10'>
			<h2 className='text-2xl uppercase'>Get Rank</h2>

			<div>
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

				{!filteredUserList ? (
					<div>No data</div>
				) : (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Rank</TableCell>
									<TableCell>Name</TableCell>
									<TableCell align='right'>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredUserList.map((item) => (
									<TableRow
										key={item.data.name}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component='th' scope='row'>
											{item.rank}
										</TableCell>
										<TableCell>{item.data.name}</TableCell>
										<TableCell align='right'>{item.data.satScore}</TableCell>
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

export default GetRank;
