import React from "react"
import {Section} from "../utils/type"

interface CouponProp {
  item: Section
}
export default function Coupon({item}: CouponProp) {
  return (
    <div className="flex">
      {item.children.map((item, index) => (
        <div key={index}>
          {item.children.map((item, index) => {
            if (item.content.length > 0) {
              return (
                <div key={index} className="m-4">
                  <img
                    src={item.content && item.content[0]}
                    alt={(item.content && item.content[1]) || "Coupon"}
                  />
                </div>
              )
            }
            return <div key={index}></div>
          })}
        </div>
      ))}
    </div>
  )
}
