import { Box, HStack, Link, FlexProps, Flex, Icon, Divider } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiEye, FiHome } from 'react-icons/fi';

const LinkItems = [
  { name: 'Home', href: '/', icon: FiHome },
  { name: 'About', href: 'about', icon: FiEye },
];

export default function PageNav() {
  return (
    <>
      <HStack justifyContent={'flex-end'} mt={-3}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} href={link.href} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </HStack>
      <Divider mb={5} />
    </>
  );
}

interface NavItemProps extends FlexProps {
  icon?: IconType;
  href: string;
  children: any;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <Link href={href.toLocaleLowerCase()} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'orange.400',
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
