import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Icon, Tooltip } from '@chakra-ui/react';
import { FaComments } from 'react-icons/fa';
import SideBar from './components/SideBar';
import PageNav from './components/PageNav';
import Main from './components/Main';
import About from './components/About';
/**
 *  🤝 💬 📍 SNIPPYLY FUN
 */
import { Snippyly } from '@snippyly/sdk';
import { SnippylyContext } from './context/SnippylyContext';
import { API_KEY } from './utils/constants';

function App() {
  const [client, setClient] = useState<Snippyly>(null as any);

  useEffect(() => {
    initSnippyly();
  }, []);

  const initSnippyly = async () => {
    // add your own API KEY -- go to snippyly.com
    const client = await Snippyly.init(API_KEY);
    setClient(client);

    // highlight any text and comment on it !!!
    const commentElement = client.getCommentElement();
    commentElement.enableTextComments(true);

    // To enable live selection feature
    const selectionElement = client.getSelectionElement();
    selectionElement.enableLiveSelection(false);

    client.setDocumentId('tutorials-are-fun-999');
  };

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
              <Icon as={FaComments} color='yellow.400' boxSize='2rem' />
            </span>
          </Tooltip>
        </Box>
      </snippyly-comment-tool>
    </SnippylyContext.Provider>
  );
}

export default App;














/**
 *   const initSnippyly = async () => {
    const client = await Snippyly.init(API_KEY); // Add your Api Key here
    setClient(client);

    // // To enable comments on text highlight
    const commentElement = client.getCommentElement();
    commentElement.enableTextComments(true);

    // // To enable live selection feature
    const selectionElement = client.getSelectionElement();
    selectionElement.enableLiveSelection(false);
  };
 */

/**
 *       <snippyly-cursor></snippyly-cursor>
      <snippyly-comments></snippyly-comments>
      <snippyly-comment-tool>
        <Box style={{ position: 'fixed', right: '25px', bottom: '24px' }}>
          <Tooltip label='Click to place comment anywhere!' closeOnClick={true} fontSize='md' offset={[-170, -10]}>
            <span>
              <Icon as={FaComments} color='yellow.400' boxSize='2rem' />
            </span>
          </Tooltip>
        </Box>
      </snippyly-comment-tool>
 */
