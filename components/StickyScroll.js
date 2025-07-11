import Image from "next/image";
import images from "@/components/images";
import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function StickyScroll() {
  const [activeText, setActiveText] = useState("lorem.");

  const grid = gridData();
  const transform = transformData();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const handleMouseMove = (e) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
    setMousePos({ x, y });
  };

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    switch (true) {
      case latest < 0.075:
        if (activeText != "lorem.") {
          setActiveText("lorem.");
        }
        break;

      case latest >= 0.075 && latest < 0.325:
        if (activeText != "ipsum.") {
          setActiveText("ipsum.");
        }
        break;

      case latest >= 0.325 && latest < 0.575:
        if (activeText != "dolor.") {
          setActiveText("dolor.");
        }
        break;

      case latest >= 0.575 && latest < 1:
        if (activeText != "sit amet.") {
          setActiveText("sit amet.");
        }
        break;
    }
  });

  return (
    <div
      className="relative h-[400vh] w-full -mb-[10vh] overflow-clip grid grid-cols-6 gap-3 py-3"
      ref={scrollRef}
    >
      <div
        className="sticky top-0 h-screen w-full z-10"
        onMouseMove={handleMouseMove}
      >
        <div className="relative top-1/2 left-1/2 -translate-x-1/2">
          <div
            className="text-5xl text-white font-extrabold tracking-tighter text-center"
            style={{
              transform: `translate(${mousePos.x * -0.05}%, ${
                mousePos.y * -1
              }%)`,
            }}
          >
            {activeText}
          </div>
        </div>
      </div>

      <div className="row-start-7 row-span-2 col-start-8 -col-end-2 text-center font-custom text-white text-9xl overflow-hidden">
        TEST
      </div>
      <div
        className="row-start-13 row-span-7 col-start-2 col-span-1 text-center font-custom text-white text-9xl overflow-hidden"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
        }}
      >
        TEST2
      </div>
      <div className="row-start-[17] row-span-2 col-start-3 col-end-8 text-center font-custom text-white text-9xl overflow-hidden">
        TEST3
      </div>

      {grid.map(({ path, rowStart, colStart, rowSpan, colSpan }, index) => (
        <div
          key={index}
          className="relative"
          style={{
            // gridRowStart: rowStart,
            // gridRowEnd: `span ${rowSpan}`,
            gridColumnStart: colStart,
            gridColumnEnd: `span ${colSpan}`,
          }}
        >
          <div
            className={`h-full w-full border-blac border- overflow-hidden drop-shadow-[0_0px_10px_rgba(0,0,0,1)]`}
          >
            <Image
              src={path}
              width={1600}
              height={900}
              alt="1"
              className={`h-full w-full object-cover transition-transform duration-300`}
              style={{
                transform: `translate(${mousePos.x * 0.1}%, ${
                  mousePos.y * 0.1
                }%)`,
                scale: "120%",
              }}
            />
          </div>
        </div>
      ))}

      {/* <div className="row-start-2 row-end-6 col-start-2 -col-end-2 flex justify-center items-center flex-wrap">
        {transform.map(({ path, height, width, transX, transY }, index) => (
          <div
            key={index}
            className="relative h-full w-full"
            style={{
              height: `${height}vw`,
              width: `${width}vw`,
              transform: `translate(${transX}%, ${transY}%)`,
            }}
          >
            <div
              className={`h-full w-full border-blac border- overflow-hidden drop-shadow-[0_0px_10px_rgba(0,0,0,1)]`}
            >
              <Image
                src={path}
                width={1600}
                height={900}
                alt="1"
                className={`h-full w-full object-cover`}
                style={{
                  transform: `translate(${mousePos.x * 0.1}%, ${
                    mousePos.y * 0.1
                  }%)`,
                  scale: "120%",
                }}
              />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export function transformData() {
  return [
    // section 1
    {
      path: images[12].src,
      height: 40,
      width: 60,
      transX: -10,
      transY: 50,
      dirX: -1,
      dirY: 1,
    },
    {
      path: images[2].src,
      height: 40,
      width: 30,
      transX: 25,
      transY: -110,
      dirX: -1,
      dirY: -1,
    },
    {
      path: images[5].src,
      height: 25,
      width: 35,
      transX: 30,
      transY: 0,
      dirX: 1,
      dirY: -1,
    },
    {
      path: images[2].src,
      height: 30,
      width: 30,
      transX: 0,
      transY: 0,
      dirX: 1,
      dirY: 1,
    },
  ];
}

export function gridData() {
  return [
    // section 2
    {
      path: images[12].src,
      colStart: 1,
      colSpan: 6,
      rowStart: 7,
      rowSpan: 5,
    },
    {
      path: images[2].src,
      colStart: 7,
      colSpan: 4,
      rowStart: 9,
      rowSpan: 3,
    },
    {
      path: images[2].src,
      colStart: 3,
      colSpan: 4,
      rowStart: 12,
      rowSpan: 3,
    },
    {
      path: images[5].src,
      colStart: 7,
      colSpan: 6,
      rowStart: 12,
      rowSpan: 5,
    },
    {
      path: images[2].src,
      colStart: 9,
      colSpan: 4,
      rowStart: 17,
      rowSpan: 3,
    },
  ];
}
