import {
  useToast,
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  Pressable,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

function ToastAlert({status, variant, description}) {
  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      flexDirection="row"
      status={status}
      variant="solid">
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Text
              px="6"
              color={
                variant === 'solid'
                  ? 'lightText'
                  : variant !== 'outline'
                  ? 'darkText'
                  : null
              }>
              {description}
            </Text>
          </HStack>

          <Icon name="close" size={25} color="#fff" />
        </HStack>
      </VStack>
    </Alert>
  );
}

export default function showToast(toast, message, status) {
  let temp = toast.show({
    placement: 'bottom',
    render: () => {
      return (
        <Pressable onPress={() => toast.close(temp)}>
          <ToastAlert description={message} variant="solid" status={status} />
        </Pressable>
      );
    },
  });
  // setTimeout(() => {
  //   if (temp) {
  //     toast.close(temp);
  //   }
  // }, 2000);
}
