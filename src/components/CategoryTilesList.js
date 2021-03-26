import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { ReactSmartScroller } from 'react-smart-scroller';
import categories from '../constants/categories';

const CategoryTilesListComponent = () => {
  return (
    <Box mx={25}>
      <Heading my={5}>Categories of questions</Heading>
      <ReactSmartScroller spacing={10}>
        {categories.map((category) => (
          <Link href={`/categories/${category.key}`} key={category.key}>
            <Box key={category.key} position='relative' textAlign='center'>
              <Image objectFit='cover' boxSize='3xs' src={category.img} />
              <Flex
                align='center'
                justify='center'
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                bgColor='black'
                w='100%'
                h='100%'
                opacity='0.7'
              >
                <Text color='white'>{category.title}</Text>
              </Flex>
            </Box>
          </Link>
        ))}
      </ReactSmartScroller>
    </Box>
  );
};

export default CategoryTilesListComponent;
