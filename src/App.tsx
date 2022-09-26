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

function App() {
  return (
    <>
      <SideBar>
        <Box p={8} maxW='1000px' minW='320px' m='0 auto'>
          <PageNav />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Box>
      </SideBar>

    </>
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

    // Set document id
    client.setDocumentId('tutorials-are-fun-999');
  };
 */
