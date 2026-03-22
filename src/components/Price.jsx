import React, { useRef, useState, useEffect, createRef } from 'react';
import Matter from 'matter-js';

// ==========================================
// 1. THE FALLING TEXT COMPONENT
// ==========================================
const FallingText = ({
  text = '',
  highlightWords = [],
  trigger = 'scroll', // Kept this as scroll so it waits for the section to appear!
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = 'clamp(2rem, 6vw, 5rem)' 
}) => {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);
  
  const words = text.split(' ');
  const wordRefs = useRef(words.map(() => createRef()));

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted || !containerRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Events } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: { width, height, background: backgroundColor, wireframes }
    });

    const boundaryOptions = { isStatic: true, render: { visible: wireframes } };
    const floor = Bodies.rectangle(width / 2, height + 25, width + 100, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -50, width + 100, 50, boundaryOptions);

    const wordBodies = words.map((word, index) => {
      const elem = wordRefs.current[index].current;
      if (!elem) return null;

      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { visible: wireframes },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2
      });

      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      return { elem, body };
    }).filter(Boolean);

    const mouse = Mouse.create(containerRef.current);
    
    // The Scroll Fix
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    mouse.element.removeEventListener("wheel", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    wordBodies.forEach(({ elem }) => {
      elem.style.position = 'absolute';
      elem.style.left = `0px`; 
      elem.style.top = `0px`;
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    if (wireframes) Render.run(render);

    Events.on(engine, 'afterUpdate', () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.transform = `translate(${x - elem.offsetWidth / 2}px, ${y - elem.offsetHeight / 2}px) rotate(${body.angle}rad)`;
      });
    });

    return () => {
      Runner.stop(runner);
      if (wireframes) Render.stop(render);
      if (render.canvas && canvasContainerRef.current) canvasContainerRef.current.innerHTML = ''; 
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, words]);

  const handleManualTrigger = () => {
    if (!effectStarted) setEffectStarted(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-pointer text-center overflow-hidden"
      onClick={trigger === 'click' ? handleManualTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleManualTrigger : undefined}
    >
      <div className="inline-block relative w-full h-full font-serif tracking-tight" style={{ fontSize, lineHeight: 1.1 }}>
        {words.map((word, index) => {
          const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
          return (
            <span
              key={index}
              ref={wordRefs.current[index]}
              className={`inline-block mx-[2px] md:mx-[6px] select-none will-change-transform ${
                isHighlighted 
                  ? 'italic text-zinc-500 font-light' 
                  : 'text-white font-normal'
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>
      <div className="absolute top-0 left-0 z-0 pointer-events-none" ref={canvasContainerRef} />
    </div>
  );
};

// ==========================================
// 2. YOUR MAIN APP COMPONENT
// ==========================================
export default function App() {
  return (
    <div className="w-full bg-[#050505] flex flex-col items-center overflow-hidden">
      
      {/* The giant spacer is completely gone! 
        It's now just a nice, clean, tightly wrapped container.
      */}
      <div className="w-full h-[50vh] min-h-[400px] relative max-w-5xl px-4 flex flex-col justify-center py-12">
        <FallingText 
          text="Premium Cinematic Arts. Your vision, effortlessly captured." 
          highlightWords={['Premium', 'effortlessly', 'captured.']}
          trigger="scroll" 
          gravity={1}
        />
      </div>

    </div>
  );
}