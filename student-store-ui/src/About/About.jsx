import React from 'react'
import './About.css'

export const About = () => {
  return (
    <div className="about" id='about'>
        <div className="content">
            <h3>About</h3>
            <div className="summary">
                <div className="text">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis mollitia minus nemo, exercitationem quaerat expedita maiores architecto eaque, ad possimus beatae! At odit consectetur illo dicta, magni tempora quos incidunt?</p>
                </div>
                <div className="media">
                    <img src="../welcome.svg" alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
