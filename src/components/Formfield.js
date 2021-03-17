import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from '@chakra-ui/react';

const FormfieldComponent = ({
  error,
  label,
  type,
  placeholder,
  value,
  handleChange,
  isTextField = false,
}) => (
  <Box m={5}>
    <FormControl isRequired isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      {!isTextField ? (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          variant='filled'
        />
      ) : (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          variant='filled'
        />
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  </Box>
);

export default FormfieldComponent;
