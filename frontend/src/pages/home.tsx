import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"
import Welcome from "../components/Welcome"
import WeeklyPlanner from "../components/WeeklyPlanner"
import styles from "../CSS/Typography.module.css"

function Home() {
    return (
        <>
          <NavBar />
          <WeeklyPlanner />
        </>
    )
}

export default Home;