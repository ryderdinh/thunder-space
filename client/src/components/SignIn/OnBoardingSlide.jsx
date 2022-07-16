import BannerSlide from 'assets/images/banner-logo.png'
import { Autoplay, Pagination, Parallax } from 'swiper'
// swiper core styles
import 'swiper/css'
// import 'swiper/swiper-bundle.min.css'
// import 'swiper/swiper.min.css'
// swiper bundle styles
import 'swiper/css/bundle'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function OnBoardingSlide() {
  return (
    <div className='onboarding'>
      <Swiper
        modules={[Pagination, Autoplay, Parallax]}
        pagination={{ clickable: true }}
        speed={1000}
        effect={'coverflow'}
        parallax={true}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        grabCursor={true}
      >
        <SwiperSlide className='color-1'>
          <div className='slide-image'>
            <img src={BannerSlide} alt='Slide' />
          </div>
          <div className='slide-content'>
            <h2>Thunder Space</h2>
            <p>
              Consistent quality and eperience across all platform and devices
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='color-1'>
          <div className='slide-image'>
            <img
              src='https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/cloud-storage.png'
              loading='lazy'
              alt='Slide'
            />
          </div>
          <div className='slide-content'>
            <h2>Turn your ideas into reality.</h2>
            <p>
              Consistent quality and eperience across all platform and devices
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
