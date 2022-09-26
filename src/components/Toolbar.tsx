import { useEffect, useState } from 'react';
import { useSnippylyClient } from '../context/SnippylyContext';
import { Button, HStack, VStack, Flex, Text } from '@chakra-ui/react';
import { Users } from '../utils/users';
import { PresenceUser } from '@snippyly/sdk/types';

function Toolbar() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [presenceUsers, setPresenceUsers] = useState<any>([]);
  const { client } = useSnippylyClient();
  const users = Users;

  const identifySnippyly = async () => {
    if (client) {
      client
        .identify(selectedUser)
        .then(() => {
          console.log('logged in to snippyly client: ', selectedUser);
        })
        .catch((err) => {
          console.log('snippyly client error: ', err);
        });
    }
  };

  const getOnlineUsersOnCurrentDocument = () => {
    const presenceElement = client.getPresenceElement();
    presenceElement.getOnlineUsersOnCurrentDocument().subscribe((_presenceUsers: PresenceUser[] | null) => {
      setPresenceUsers(_presenceUsers || []);
    });
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setSelectedUser(JSON.parse(localStorage.getItem('user')!));
    }
  }, []);

  useEffect(() => {
    if (selectedUser && client) {
      identifySnippyly();
      getOnlineUsersOnCurrentDocument();
    }
  }, [selectedUser && client]);

  const signIn = (user: any): void => {
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
    <Flex mb={3} direction='column'>
      <Flex justifyContent={'center'} mb={3}>
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
      </Flex>
      {presenceUsers.length > 0 && (
        <HStack mx={4} px={4} justifyContent={'flex-start'}>
          <Text fontSize={'2xl'}>🤝 </Text>
          <snippyly-presence></snippyly-presence>
        </HStack>
      )}
    </Flex>
  );
}

export default Toolbar;
