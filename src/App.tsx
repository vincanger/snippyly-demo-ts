import '@fontsource/poppins';
import theme from './theme';
import logo from './logo.svg';
import { useState } from 'react';
import { Snippyly, User } from '@snippyly/sdk';
import { useEffect } from 'react';
import { SnippylyContext } from './context/SnippylyContext';
import Toolbar from './components/Toolbar';
import { ChakraProvider, Box, HStack, VStack, Image, Text, Link, Icon } from '@chakra-ui/react';
import Comment from './components/Comment';
import SideBar from './components/SideBar';
import PostHeader from './components/PostHeader';
import ImgCarousel from './components/ImgCarousel';
import BlogPost from './components/BlogPost';

import { FaRegComments } from 'react-icons/fa';

const API_KEY = 'qVTAPxHqayTzfBfaev8r';

function App() {
  const [count, setCount] = useState(0);
  const [client, setClient] = useState<Snippyly>(null as any);

  useEffect(() => {
    initSnippyly();
  }, []);

  const initSnippyly = async () => {
    const client = await Snippyly.init(API_KEY);
    setClient(client);

    // To enable text comment feature
    const commentElement = client.getCommentElement();
    commentElement.enableTextComments(true);
    // Enable attachment feature
    commentElement.enableAttachment(true);

    // To enable live selection feature
    const selectionElement = client.getSelectionElement();
    selectionElement.enableLiveSelection(true);
    client.setDocumentId(excludeSnippylyParamsFromUrl(window.location.href));
  };

  const excludeSnippylyParamsFromUrl = (url: string) => {
    try {
      const tempUrl = new URL(url);
      ['review', 'sreviewId', 'snippyly-user', 'scommentId', 'stagId'].forEach((param) => {
        tempUrl.searchParams.delete(param);
      });
      return tempUrl.href;
    } catch (err) {
      return url;
    }
  };

  return (
    <SnippylyContext.Provider value={{ client }}>
      <ChakraProvider theme={theme}>
        <SideBar>
          {/* <snippyly-presence></snippyly-presence> */}
          <snippyly-cursor></snippyly-cursor>
          <snippyly-comments></snippyly-comments>
          <snippyly-comment-tool>
            <Box style={{ position: 'fixed', right: '35px', bottom: '24px' }}>
              <Icon as={FaRegComments} color='white' boxSize='2rem' />
            </Box>
          </snippyly-comment-tool>
          <Box p={8} maxW='1000px' minW='320px' m='0 auto'>
            <Toolbar />
            <PostHeader />
            <ImgCarousel />
            <BlogPost />
            <VStack>
              <Comment />
            </VStack>
          </Box>
        </SideBar>
      </ChakraProvider>
    </SnippylyContext.Provider>
  );
}

export default App;
