import { Box, VStack } from '@chakra-ui/react';
import ImgCarousel from './ImgCarousel';
import PostHeader from './PostHeader';
import BlogPost from './BlogPost';
import Comment from './Comment';

export default function Main() {
  return (
    <Box >
      <PostHeader />
      <ImgCarousel />
      <BlogPost />
      <VStack>
        <Comment />
      </VStack>
    </Box>
  );
}
