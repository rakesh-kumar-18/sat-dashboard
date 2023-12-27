import { BasicTable } from "./index";

const ViewAllData = () => {
	return (
		<div className='flex flex-col justify-center items-center mt-10'>
			<h2 className='text-2xl uppercase my-10'>All Users</h2>

			<div>
				<BasicTable />
			</div>
		</div>
	);
};

export default ViewAllData;
