import React, { ReactNode } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Divider,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu } from 'react-icons/fi';
import { IconType } from 'react-icons';
import SnippylyIcon from '../utils/SnipplyIcon';
import Toolbar from './Toolbar';

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Components', icon: FiTrendingUp },
  { name: 'Pages', icon: FiCompass },
  { name: 'Templates', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh'>
      <SidebarContent onClose={() => onClose} backgroundColor={'gray.800'} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box borderRight='1px' borderRightColor='gray.700' w={{ base: 'full', md: 60 }} pos='fixed' h='full' {...rest}>
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between' flexDirection='row'>
        <Icon as={SnippylyIcon} boxSize={5} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        <Text fontSize='md' fontFamily='sans-serif' fontStyle='italic' mt={-2}>
          builder
        </Text>
      </Flex>
      <Toolbar />
      <Divider my={5}/>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
        
      ))}

    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon?: IconType;
  children: any;

}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href='#' style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'gray.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
