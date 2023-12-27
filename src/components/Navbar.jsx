/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen((prevValue) => !prevValue);
	};

	const navItems = [
		{
			id: 1,
			slug: "insertdata",
			name: "Insert Data",
		},
		{
			id: 2,
			slug: "viewdata",
			name: "View All Data",
		},
		{
			id: 3,
			slug: "getrank",
			name: "Get Rank",
		},
		{
			id: 4,
			slug: "updatescore",
			name: "Update Score",
		},
		{
			id: 5,
			slug: "deleterecord",
			name: "Delete Record",
		},
	];

	return (
		<>
			<nav id='nav' className='flex w-full justify-between p-4 bg-blue-300 '>
				<div>
					<p className='cursor-pointer font-bold'>
						<Link to='/'>SAT Dashboard</Link>
					</p>
				</div>

				<div className='z-20'>
					{isOpen ? (
						<img
							src={close}
							alt='close menu'
							className='cursor-pointer'
							onClick={handleClick}
						/>
					) : (
						<img
							src={menu}
							alt='open menu'
							className='cursor-pointer'
							onClick={handleClick}
						/>
					)}
				</div>
			</nav>
			{isOpen &&
				createPortal(
					<div
						onClick={handleClick}
						className='w-full h-full block bg-white absolute bg-opacity-60  top-0'
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className='w-60  flex justify-center pt-10 h-full bg-blue-500 p-4'
						>
							<ul className='space-y-10  w-full'>
								{navItems.map(({ id, slug, name }) => {
									return (
										<li
											onClick={handleClick}
											key={id}
											className='p-2 w-full bg-blue-300 cursor-pointer rounded-md font-bold text-center'
										>
											<Link className='w-full h-full' to={slug}>
												{name}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					</div>,
					document.body
				)}
		</>
	);
};

export default Navbar;
