import React from 'react';
import { VStack, Textarea, Button } from '@chakra-ui/react';
import Draggable from 'react-draggable';
import sx from '../utils/styles';

function Comment() {
  const nodeRef = React.useRef(null);

  return (
    <Draggable axis='y' nodeRef={nodeRef}>
      <VStack style={sx} width='100%' ref={nodeRef} >
        <Textarea placeholder='Write your comment here' />
        <Button>Submit</Button>
      </VStack>
    </Draggable>
  );
}

export default Comment;