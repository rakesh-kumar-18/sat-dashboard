import { Outlet } from "react-router-dom";
import { Navbar } from "./components/index.js";

const App = () => {
	return (
		<div>
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
