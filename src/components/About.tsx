import React, { useEffect } from 'react';
import { Routes, Router } from 'react-router-dom';
import { Box, HStack, Heading, Text, Link } from '@chakra-ui/react';
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
