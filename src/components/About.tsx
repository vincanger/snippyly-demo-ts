import { Box, Heading, Text } from '@chakra-ui/react';
import { useSnippylyClient } from '../context/SnippylyContext';

export default function PostHeader() {
  const { client } = useSnippylyClient();

  return (
    <Box m={3}>
      <Heading>About</Heading>
      <Text>We are are super cool blog builder with multiplayer support for the 21st century remote team!</Text>
    </Box>
  );
}
