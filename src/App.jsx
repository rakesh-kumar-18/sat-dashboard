import { Outlet } from "react-router-dom";
import { Navbar } from "./components/index.js";

const App = () => {
	return (
		<div className=' h-screen mx-auto bg-white'>
			<div>
				<Navbar />
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default App;
