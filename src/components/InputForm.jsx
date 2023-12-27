/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect } from "react";
import { useState } from "react";

const InputForm = () => {
	const [userList, setUserList] = useState(
		JSON.parse(localStorage.getItem("user")) || []
	);
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		city: "",
		country: "",
		pin: "",
		satScore: "",
	});

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(userList));
	}, [userList]);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const addUser = (e) => {
		e.preventDefault();
		if (!formData) {
			console.log("no data");
		} else {
			setUserList([...userList, { data: formData }]);
			setFormData({
				name: "",
				address: "",
				city: "",
				country: "",
				pin: "",
				satScore: "",
			});
		}
	};

	return (
		<>
			<form
				onSubmit={addUser}
				className='bg-blue-500 mt-6  rounded-lg p-4 grid grid-cols-2 gap-2'
			>
				<div className='flex flex-col space-y-2'>
					<label htmlFor='name'>Name</label>
					<input
						className='rounded-md'
						type='text'
						name='name'
						required
						id='name'
						min='2'
						value={formData.name}
						onChange={changeHandler}
					/>
				</div>

				<div className='flex flex-col space-y-2'>
					<label htmlFor='address'>Address</label>
					<input
						className='rounded-md'
						type='text'
						name='address'
						required
						min='2'
						id='address'
						value={formData.address}
						onChange={changeHandler}
					/>
				</div>

				<div className='flex flex-col space-y-2'>
					<label htmlFor='city'>City</label>
					<input
						className='rounded-md'
						type='text'
						name='city'
						required
						id='city'
						value={formData.city}
						onChange={changeHandler}
					/>
				</div>

				<div className='flex flex-col space-y-2'>
					<label htmlFor='country'>Country</label>
					<input
						className='rounded-md'
						type='country'
						name='country'
						required
						id='country'
						value={formData.country}
						onChange={changeHandler}
					/>
				</div>
				<div className='flex flex-col space-y-2'>
					<label htmlFor='pin'>Pincode</label>
					<input
						type='number'
						name='pin'
						required
						id='pincode'
						className='rounded-md'
						value={formData.pin}
						onChange={changeHandler}
					/>
				</div>
				<div className='flex flex-col space-y-2'>
					<label htmlFor='satScore'>SAT Score</label>
					<input
						className='rounded-md'
						type='text'
						name='satScore'
						required
						id='satScore'
						value={formData.satScore}
						onChange={changeHandler}
					/>
				</div>

				<div className='col-span-2 mt-4 bg-blue-100 text-center rounded-md'>
					<button
						type='submit'
						className='text-lg cursor-pointer w-full font-semibold uppercase'
					>
						Add
					</button>
				</div>
			</form>
		</>
	);
};

export default InputForm;
