import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapShot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';

import { fadeAnimation, slideAnimation } from  '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapShot(state);
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          Costumizer
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer