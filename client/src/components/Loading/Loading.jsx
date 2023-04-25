import React from 'react'
import logo from "../../assets/notimiser-logo.png";
import {motion} from "framer-motion";

const LoadingDot = {
    display: "block",
    width: "10px",
    height: "10px",
    backgroundColor: "white",
    borderRadius: "50%"
  };
  
  const LoadingContainer = {
    width: "45px",
    height: "20px",
    display: "flex",
    justifyContent: "space-around"
  };
  
  const ContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2
      }
    },
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const DotVariants = {
    initial: {
      y: "0%"
    },
    animate: {
      y: "100%"
    }
  };
  
  const DotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut"
  };

function Loading() {
  return (
    <div className='w-full h-screen bg-[#2abfff]'>
        
        <img className='relative m-auto top-[40%] md:w-[6%] sm:w-[20%] w-[35%]' src={logo} alt=""/>
        <motion.div className="flex justify-center mx-auto relative top-[40%]"
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  )
}

export default Loading