import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Reg from "./pages/reg"

function App() {
  return (
		<BrowserRouter>
			<div className="app-layout">
				<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/reg" element={<Reg />} />
				</Routes>
			</div>
    </BrowserRouter>
  )
}

export default App
