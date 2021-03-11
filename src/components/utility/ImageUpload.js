import { Flex, Button, Image } from '@chakra-ui/react';
import { useRef, useState } from 'react';

const ImageUploadComponent = ({ defaultImage, onUpload }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const inputFile = useRef();

  const onImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Flex align='flex-end' p={5} justify='flex-start' direction='row'>
      <Image
        src={imageUrl}
        borderRadius='full'
        boxSize='150px'
        fallbackSrc={
          defaultImage ? defaultImage : 'https://via.placeholder.com/150'
        }
      />
      <input
        type='file'
        ref={inputFile}
        onChange={onImageSelect}
        style={{ display: 'none' }}
      ></input>
      <Button
        m={3}
        onClick={() => inputFile.current.click()}
        colorScheme='teal'
      >
        Select Image
      </Button>
      <Button
        m={3}
        onClick={async () => await onUpload(image)}
        colorScheme='teal'
      >
        Upload Image
      </Button>
    </Flex>
  );
};

export default ImageUploadComponent;
