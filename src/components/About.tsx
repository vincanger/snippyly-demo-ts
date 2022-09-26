import React, { useEffect } from 'react';
import { Routes, Router } from 'react-router-dom';
import { Box, HStack, Heading, Text, Link } from '@chakra-ui/react';
import { useSnippylyClient } from '../context/SnippylyContext';

export default function PostHeader() {
  const { client } = useSnippylyClient();
  const location = { key: 'about' }; // set your custom object here
  const locationJson = JSON.stringify(location);
  
  // useEffect( () => {
  //   if (client) {
  //     client.setLocation(location);
  //   }
  // }, [client]);

  return (
    <Box m={3}>
      {/* <snippyly-presence location={locationJson}></snippyly-presence> */}
      <Heading>About</Heading>
      <Text>We are are super cool blog builder with multiplayer support for the 21st century remote team!</Text>
    </Box>
  );
}
