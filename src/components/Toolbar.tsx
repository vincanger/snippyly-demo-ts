import React, { useEffect, useState } from 'react';
import { useSnippylyClient } from '../context/SnippylyContext';
import { Box, Button, HStack, VStack, Divider, Flex, Text } from '@chakra-ui/react';

function Toolbar() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const users = [
    {
      userId: '1',
      name: 'John Smith',
      photoUrl: '',
      email: 'john@trysnippyly.com',
      plan: 'free',
      groupId: '',
      contacts: [
        {
          userId: '2',
          name: 'Maria Garcia',
          email: 'maria@trysnippyly.com',
        },
      ],
    },
    {
      userId: '2',
      name: 'Maria Garcia',
      photoUrl: '',
      email: 'maria@trysnippyly.com',
      plan: 'paid',
      groupId: '',
      contacts: [
        {
          userId: '1',
          name: 'John Smith',
          email: 'john@trysnippyly.com',
        },
      ],
    },
  ];

  const { client } = useSnippylyClient();

  useEffect(() => {
    console.log('selectedUser', selectedUser);
    if (localStorage.getItem('user')) {
      setSelectedUser(JSON.parse(localStorage.getItem('user')!));
    }
  }, []);

  useEffect(() => {
    console.log('2nd useeffect', selectedUser);
    
    if (selectedUser && client) {
      console.log('selected user', selectedUser);
      console.log('client', client);
      identifySnippyly();
    }
  }, [selectedUser && client]);

  const identifySnippyly = async () => {
    if (client) {
      client
        .identify(selectedUser)
        .then((res) => {
          // User login successful
          console.log('login success', selectedUser);
        })
        .catch((err) => {
          // User login failure
          console.log('login error', err);
        });
    }
  };

  const signIn = (user: any): void => {
    // Add custom logic here to login user
    // Once user is available call identifySnippyly
    localStorage.setItem('user', JSON.stringify(user));
    setSelectedUser(user);
  };

  const signOut = async () => {
    if (client) {
      await client.signOutUser();
    }
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <>
      <snippyly-presence></snippyly-presence>
      <Flex mb={3} direction='column' alignItems='center'>
        <HStack>
          {selectedUser ? (
            <VStack>
              <Text>Hi, {selectedUser?.name}</Text>
              <Button className='custom-btn' onClick={() => signOut()}>
                Sign Out
              </Button>
            </VStack>
          ) : (
            <VStack>
              <Text>Sign In with:</Text>
              {users.map((user: any) => {
                return (
                  <Button key={user.userId} onClick={() => signIn(user)}>
                    {user?.name}
                  </Button>
                );
              })}
            </VStack>
          )}
        </HStack>
      </Flex>
    </>
  );
}

export default Toolbar;
