import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
 

import state from '../store';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <img 
              src='./threejs.png'
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className="head-text">Carry <br className="xl:block hidden" /> It Chic </h1>
              <motion.div>
                <p className="max-w-md font-normal text-gray-600 text-base">
                Carry it chic with the perfect mini bag for all your essentials! <strong>Unleash your Sophisticated Style</strong>{" "}
                and Rock your Bag.
                </p>
              </motion.div>
              </motion.div>
            </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home;