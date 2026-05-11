import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  useEffect,
} from "react";

const AnimatedScore = ({
  value,
}) => {

  const motionValue =
    useMotionValue(0);

  const rounded =
    useTransform(
      motionValue,
      (latest) =>
        Math.round(latest)
    );

  useEffect(() => {

    const controls =
      animate(
        motionValue,
        value,
        {
          duration: 0.4,
          ease: "easeOut",
        }
      );

    return () =>
      controls.stop();

  }, [value]);

  return (

    <motion.span>
      {rounded}
    </motion.span>
  );
};

export default AnimatedScore;