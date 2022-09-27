import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Draggable from 'react-draggable';
import sx from '../utils/styles';


// These are the images used in the slide
const cards = [
  'https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
];

export default function Carousel() {
  const [slider, setSlider] = React.useState<string>(cards[0]);
  const nodeRef = React.useRef(null);
  
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  // function that changes the state of the slider and makes sure its not out of bounds
  const changeSlider = (direction: string) => {
    const index = cards.indexOf(slider);
    if (direction === 'left') {
      if (index === 0) {
        setSlider(cards[cards.length - 1]);
      } else {
        setSlider(cards[index - 1]);
      }
    } else {
      if (index === cards.length - 1) {
        setSlider(cards[0]);
      } else {
        setSlider(cards[index + 1]);
      }
    }
  };

  return (
    <Draggable axis='y' nodeRef={nodeRef}>
      <Box
        height={'300px'}
        overflow={'hidden'}
        style={sx}
        ref={nodeRef}
      >
        {/* Left Icon */}
        <IconButton
          aria-label='left-arrow'
          colorScheme='purple'
          borderRadius='full'
          position='absolute'
          left={side}
          top={top}
          transform={'translate(20%, -50%)'}
          zIndex={2}
          onClick={() => changeSlider('left')}
        >
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label='right-arrow'
          colorScheme='purple'
          borderRadius='full'
          position='absolute'
          right={side}
          top={top}
          transform={'translate(-20%, -50%)'}
          zIndex={2}
          onClick={() => changeSlider('right')}
        >
          <BiRightArrowAlt />
        </IconButton>

        <Box
          height='md'
          position='relative'
          backgroundPosition='center'
          backgroundRepeat='no-repeat'
          backgroundSize='cover'
          backgroundImage={`url(${slider})`}
        />
      </Box>
    </Draggable>
  );
}
