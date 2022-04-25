import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import "./App.css"
import "./spacing.css"
import Sidebar from "./components/Sidebar"
import ListPage from "./page/ListPage"
import HomePage from "./page/HomePage"
import EditPage from "./page/EditPage"
import DemoPage from "./page/DemoPage"

function App() {
  return (
    <Router>
      <div className="App bg-[#f4f4f4]">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-10 overflow-y-scroll h-screen scroll-smooth">
            <Routes>
              <Route path="/app" element={<ListPage />} />
              <Route path="/edit/:id" element={<EditPage />} />
              <Route path="/" element={<ListPage />} />
              <Route path="/demo/:id" element={<DemoPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
