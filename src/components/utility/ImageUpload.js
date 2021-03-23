import { Flex, Button, Image } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import Bugsnag from '@bugsnag/js';

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
    <Flex
      align={{ base: 'center', lg: 'flex-end' }}
      justify={{ base: 'center', lg: 'flex-start' }}
      direction={{ base: 'column', lg: 'row' }}
    >
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
        onClick={async () => {
          try {
            await onUpload(image);
          } catch (error) {
            Bugsnag.notify(error);
          }
        }}
        colorScheme='teal'
      >
        Upload Image
      </Button>
    </Flex>
  );
};

export default ImageUploadComponent;
