import React from "react"
import {Link} from "react-router-dom"
import {useLocation} from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="w-full h-screen relative top-0 bottom-0 bg-white pl-5 pr-2 overflow-hidden">
      <Link to="/" className="text-lg block font-bold text-[#7366ef] py-8">
        Admin
      </Link>
      <div className="w-full h-[2px] bg-[#a1a4ab]"></div>
      <ul>
        <li className="w-full cursor-pointer h-full px-4 py-2 my-2">
          <span className="text-[#a1a4ab] text-base font-semibold">
            Dashboard
          </span>
        </li>
        <Link to="/app">
          <li className="w-full cursor-pointer h-full px-4 py-2 my-2 bg-[#978ef4] rounded-[5px]">
            <span className="text-white text-base font-semibold">
              Page List
            </span>
          </li>
        </Link>
      </ul>
    </div>
  )
}
