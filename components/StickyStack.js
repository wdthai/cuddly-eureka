import Image from "next/image";
import images from "@/components/images";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

export default function StickyReveal() {
  // bg-[#e0e1dd] text-[#0c4d1e] text-[#ffbf00]
  // bg-[#0c1129] text-[#e0e1dd] text-[#d1a877]
  // bg-[#212121] text-[#651612] text-[#e0e1dd]
  // mouse parallax + text fade in + image blur in/out
  const sections = [
    {
      titleFont: "font-serif",
      textFront: "font-custom",
      title: "TITLE 1",
      text: "",
      imageSrc: images[6].src,
      top: true,
    },
    {
      titleFont: "font-serif",
      textFront: "font-custom",
      title: "TITLE 1",
      text: "",
      imageSrc: images[13].src,
    },
    {
      titleFont: "font-serif",
      textFront: "font-custom",
      title: "TITLE 1",
      text: "",
      imageSrc: images[10].src,
    },
  ];

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.2, 0.24], [0, 0.4]); // border
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.24], [0, 0.4]); // darken
  const x = useTransform(scrollYProgress, [0.28, 0.32], ["-2.5rem", "-1.5rem"]);
  const x2 = useTransform(scrollYProgress, [0.28, 0.32], ["2.5rem", "1.5rem"]);
  const y = useTransform(scrollYProgress, [0.28, 0.32], ["-2.5rem", "-1.5rem"]);
  const y2 = useTransform(scrollYProgress, [0.28, 0.32], ["2.5rem", "1.5rem"]);
  const scale = useTransform(scrollYProgress, [0.18, 0.36], [1, 1]);

  return (
    <div
      className={`relative h-[370vh] w-full bg-background flow-root`}
      ref={scrollRef}
    >
      <motion.div
        className="sticky top-0 h-screen w-full mt-[10vh] border-y-[1rem border-[#fff0e0 bg-black  rounded-3xl overflow-hidden z-10"
        style={{ opacity }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black"
          style={{ opacity: opacity2 }}
        />
        {/* <motion.div
          className="absolute h-[40vh] w-[2vw] left-0 top-1/2 rounded-full bg-[#fff0e0]"
          style={{ x, y: "-50%" }}
        />
        <motion.div
          className="absolute h-[40vh] w-[2vw] right-0 top-1/2 rounded-full bg-[#fff0e0]"
          style={{ x: x2, y: "-50%" }}
        />
        <motion.div
          className="absolute h-[2vw] w-[40vw] top-0 left-1/2 trans rounded-full bg-[#fff0e0]"
          style={{ x: "-50%", y }}
        />
        <motion.div
          className="absolute h-[2vw] w-[40vw] bottom-0 left-1/2 rounded-full bg-[#fff0e0]"
          style={{ x: "-50%", y: y2 }}
        /> */}
      </motion.div>

      <div className=" absolute top-0 left-0 w-full h-full">
        {sections.map((section, index) => (
          <div
            className={`sticky top-0 mt-[10vh]  rounded-3xl overflow-hidden ${
              section.top ? "h-[100vh]" : "h-screen"
            }`}
            key={index}
          >
            <Image
              src={section.imageSrc}
              width={1600}
              height={900}
              alt="1"
              className=" h-screen w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
