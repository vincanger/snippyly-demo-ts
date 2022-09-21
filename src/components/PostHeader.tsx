import React from 'react';
import { Box, Button, HStack, Heading, Flex, Text } from '@chakra-ui/react';
import Draggable from 'react-draggable';
import sx from '../utils/styles';

export default function PostHeader() {
  const nodeRef = React.useRef(null);

  return (
    <Box m={3}>
      <Heading>Page Header</Heading>
      <HStack justifyContent='space-evenly'>
        <Draggable axis='x' nodeRef={nodeRef}>
          <Text style={sx} ref={nodeRef}>
            Author
          </Text>
        </Draggable>
        <Draggable axis='x' nodeRef={nodeRef}>
          <Text style={sx} ref={nodeRef}>
            Date
          </Text>
        </Draggable>
      </HStack>
    </Box>
  );
}
