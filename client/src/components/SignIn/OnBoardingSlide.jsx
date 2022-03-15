import React from 'react';
import SwiperCore, {
	Pagination,
	Autoplay,
	Parallax,
	EffectCoverflow
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

export default function OnBoardingSlide() {
	// Install Swiper modules
	SwiperCore.use([Pagination, Autoplay, EffectCoverflow, Parallax]);

	return (
		<div className='onboarding'>
			<Swiper
				pagination={{ clickable: true }}
				speed={1000}
				effect={'coverflow'}
				parallax={true}
				loop={true}
				autoplay={{ delay: 3500, disableOnInteraction: false }}
				grabCursor={true}
				onSwiper={() => console.log('Start slide')}
			>
				<SwiperSlide className='color-1'>
					<div className='slide-image'>
						<img
							src={require('assets/images/banner-logo.png').default}
							alt='Slide'
						/>
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
							src='https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/startup-launch.png'
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
	);
}
