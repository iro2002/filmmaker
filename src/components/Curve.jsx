import CurvedLoop from './CurvedLoop';

export default function Example() {
  return (
    // FIX 1: Removed min-h-screen and reduced py-20 to py-12 to kill the huge empty space
    <div className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden py-12">
      
      {/* Background layer: Slower, dimmer, large curve */}
      {/* FIX 2: Moved closer to the top to reduce inner spacing */}
      <div className="absolute top-8 w-full opacity-20 pointer-events-none">
        <CurvedLoop 
          marqueeText="ENDLESS POSSIBILITIES ✦ " 
          speed={0.8} 
          curveAmount={150} // Reduced from 250 to make it slightly tighter
          // FIX 3: Scaled down text sizes for mobile and desktop
          className="text-[12rem] md:text-[8rem] lg:text-[6rem]"
        />
      </div>

      {/* Middle layer: Main interactive text */}
      <div className="relative z-10 w-full mt-10 md:mt-16">
        <CurvedLoop 
          marqueeText="DRAG TO EXPLORE ✦ "
          speed={2.5}
          curveAmount={100} // Reduced from 150 
          direction="right"
          interactive={true}
          // FIX 4: Scaled down text sizes for mobile and desktop
          className="text-[9rem] md:text-[6rem] lg:text-[4.5rem]"
        />
      </div>

      {/* Optional: Add a subtle glowing orb in the center to tie it together */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      
    </div>
  );
}