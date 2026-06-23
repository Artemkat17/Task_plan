import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"
import Welcome from "../components/Welcome"
import styles from "../CSS/Typography.module.css"

function Home() {
    return (
        <>
          <NavBar />
          <Welcome />
        </>
    )
}

export default Home;