import React, { FC, useState } from 'react';
import Lottie, { LottieComponentProps } from 'lottie-react';
import { motion } from 'framer-motion';

interface Props extends Omit<LottieComponentProps, 'loop' | 'autoplay'> {
}

const LottieScrollTrigger: FC<Props> = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setIsPlaying(true)}
      viewport={{ once: true, margin: '-140px' }}
    >
      <Lottie {...props} loop={false} autoplay={isPlaying} />
    </motion.div>
  );
};

export default LottieScrollTrigger;
