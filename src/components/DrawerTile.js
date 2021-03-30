import { Box, Divider, Flex, Text } from '@chakra-ui/layout';

const DrawerTileComponent = ({ onClick, icon, text }) => {
  return (
    <>
      <Box
        m={3}
        as={Flex}
        direction='row'
        justify='space-between'
        align='center'
        px={10}
        cursor='pointer'
        onClick={onClick}
      >
        {icon}
        <Text>{text}</Text>
      </Box>
      <Divider />
    </>
  );
};

export default DrawerTileComponent;
