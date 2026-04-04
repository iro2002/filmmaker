import React from 'react';
import introVideo from '../images/intro.mp4';

const Showreels = () => {
    return (
        <div className="w-full h-screen bg-black relative flex items-center justify-center overflow-hidden z-50">
            <video
                src={introVideo}
                controls
                playsInline
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Showreels;
