import React from "react"
import {Section} from "../utils/type"

// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import {Navigation} from "swiper"

interface CardProductProp {
  item: Section
}

export default function CardProduct({item}: CardProductProp) {
  return (
    <div className="mt-6 w-full">
      {item.children.map((item, index) => (
        <div key={index}>
          {item.children.map((item, index) => {
            return (
              <Swiper
                key={index}
                slidesPerView={(item.content && Number(item.content[2])) || 3}
                spaceBetween={30}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                navigation={true}
                modules={[Navigation]}
                style={{
                  width: `${
                    (item.content && Number(item.content[2]) * 320) || 3 * 320
                  }px`,
                }}
                className="mySwiper"
              >
                {item.content &&
                  item.content.length > 0 &&
                  JSON.parse(item.content[3]).map((item: any, index: any) => (
                    <SwiperSlide className="w-[300px]" key={index}>
                      <div className="w-[300px] mx-4 bg-white shadow-lg">
                        <div className="w-[300px] h-[300px] object-contain">
                          <img src={item.img} alt="Product Img" />
                        </div>
                        <div className="mt-2 px-2">
                          <h3 className="font-semibold line-clamp-1 text-lg text-[#000000de]">
                            {item.name}
                          </h3>
                          <h3 className="font-semibold text-lg text-[#ee4d2d]">
                            {item.price}
                          </h3>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            )
          })}
        </div>
      ))}
    </div>
  )
}
