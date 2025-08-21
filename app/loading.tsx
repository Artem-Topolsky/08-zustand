'use client';

import { motion, Easing } from 'framer-motion';
import css from './loading.module.css';

export default function Loading() {
  const dotAnimation = {
    opacity: [0.3, 1, 0.3],
  };

  const ease: Easing = [0.42, 0, 0.58, 1];
  const transition = {
    repeat: Infinity,
    duration: 0.8,
    ease: ease,
  };

  return (
    <div className={css.wrapper}>
      <motion.div
        className={css.dot}
        animate={dotAnimation}
        transition={{ ...transition, delay: 0 }}
      />
      <motion.div
        className={css.dot}
        animate={dotAnimation}
        transition={{ ...transition, delay: 0.2 }}
      />
      <motion.div
        className={css.dot}
        animate={dotAnimation}
        transition={{ ...transition, delay: 0.4 }}
      />
    </div>
  );
}
