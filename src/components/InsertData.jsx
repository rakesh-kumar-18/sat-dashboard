import InputForm from "./InputForm";

const InsertData = () => {
	return (
		<div className='w-full mt-10 flex flex-col justify-center items-center'>
			<div>
				<h2 className='text-2xl uppercase '>Insert Data</h2>
			</div>

			<div>
				<InputForm />
			</div>
		</div>
	);
};

export default InsertData;
