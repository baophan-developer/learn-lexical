import "./App.css";
import styled from "styled-components";
import Editor from "./components/Editor";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #9999;
`;

function App() {
	return (
		<Container>
			<Editor
				onChange={() => {
					// console.log(value);
				}}
			/>
		</Container>
	);
}

export default App;
