import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Snippyly, User } from '@snippyly/sdk';
import { useEffect } from 'react';
import { SnippylyContext } from './context/SnippylyContext';
import { ChakraProvider, Box, HStack, VStack, Image, Text, Tag, Icon, Tooltip } from '@chakra-ui/react';
import Comment from './components/Comment';
import SideBar from './components/SideBar';
import PostHeader from './components/PostHeader';
import ImgCarousel from './components/ImgCarousel';
import BlogPost from './components/BlogPost';
import PageNav from './components/PageNav';
import Main from './components/Main';
import About from './components/About';

import { FaComments } from 'react-icons/fa';

const API_KEY = 'qVTAPxHqayTzfBfaev8r';

function App() {
  const [client, setClient] = useState<Snippyly>(null as any);

  useEffect(() => {
    initSnippyly();
  }, []);

  const initSnippyly = async () => {
    const client = await Snippyly.init(API_KEY); // Add your Api Key here
    setClient(client);

    // // To enable comments on text highlights
    const commentElement = client.getCommentElement();
    commentElement.enableTextComments(true);
    // // Enable attachment feature
    // commentElement.enableAttachment(true);

    // // To enable live selection feature
    const selectionElement = client.getSelectionElement();
    selectionElement.enableLiveSelection(false);

    // Set document id
    client.setDocumentId('turtle-power-123');
  };

  // const excludeSnippylyParamsFromUrl = (url: string) => {
  //   try {
  //     const tempUrl = new URL(url);
  //     ['review', 'sreviewId', 'snippyly-user', 'scommentId', 'stagId'].forEach((param) => {
  //       tempUrl.searchParams.delete(param);
  //     });
  //     return tempUrl.href;
  //   } catch (err) {
  //     return url;
  //   }
  // };

  return (
    <SnippylyContext.Provider value={{ client }}>
      <SideBar>
        <Box p={8} maxW='1000px' minW='320px' m='0 auto'>
          <PageNav />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Box>
      </SideBar>
      <snippyly-cursor></snippyly-cursor>
      <snippyly-comments></snippyly-comments>
      <snippyly-comment-tool>
        <Box style={{ position: 'fixed', right: '25px', bottom: '24px' }}>
          <Tooltip label='Click to place comment anywhere!' closeOnClick={true} fontSize='md' offset={[-170, -10]}>
            <span>
              <Icon
                as={FaComments}
                color='yellow.400'
                boxSize='2rem'
              />
            </span>
          </Tooltip>
        </Box>
      </snippyly-comment-tool>
    </SnippylyContext.Provider>
  );
}

export default App;
