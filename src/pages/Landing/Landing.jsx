import React from 'react';
import './Landing.css'
import CardArea from './CardArea/CardArea'

const Landing = () => {
	return (
		<div className="landing-page">
			<div className="landing-area">
				<div className="landing-intro">at RedTale you can...</div>
				<CardArea />
			</div>
			<div className="intro-area">
				<img src="https://via.placeholder.com/500x300"/>
				<div className="intro-text">
					TEXT HERE ABOUT HOW THE SITE IS/WHY IT WAS MADE
				</div>
			</div>
			<div className="video-area">
				<div className="learn-more-text">
					Want to learn more? Check this video out!
				</div>
				<img src="https://via.placeholder.com/640x385"/>
				<div className="join-us">
					Click Login to join us!
				</div>
			</div>
		</div>
	)
}

export default Landing;