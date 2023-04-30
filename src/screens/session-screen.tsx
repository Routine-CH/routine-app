import React, { useContext, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import ScreenWrapper from "../components/common/screen-wrapper";
import AuthContext from "../contexts/auth-context";

const SessionScreen: React.FC = () => {
  const { signIn } = useContext(AuthContext)!;
  const [parentHeight, setParentHeight] = useState(0);

  const handleLogin = async () => {
    const token = "your_jwt_token";
    await signIn(token);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setParentHeight(height);
  };

  const marginTopPercentage = 0.079;
  const marginBottomPercentage = 0.2;

  return (
    <ScreenWrapper backgroundColor='#296879' onLayout={onLayout}>
      {/* <Box bg='#296879' height='100%'>
        <Box
          flex={1}
          px={30}
          mt={`${marginTopPercentage * 100}%`}
          //   mb={`${marginBottomPercentage * 100}%`}
          bgColor='#fff'
          borderRadius={20}
          alignItems='center'
        >
          <Text
            fontSize='5xl'
            fontWeight='bold'
            color='#296879'
            borderColor='black'
            borderWidth={1}
          >
            ROUTINE
          </Text>
          <Text
            fontSize={25}
            fontWeight='medium'
            color='#296879'
            mt={70}
            borderColor='black'
            borderWidth={1}
          >
            WILKOMMEN ZURÜCK
          </Text>
          <Box
            backgroundColor='rgba(185, 209, 217, 0.2);'
            borderRadius={10}
            w='100%'
            flexDir='row'
            alignItems='center'
            mt='30px'
          >
            <Icon as={Ionicons} name='person' size={22} ml='18px' mr='5px' />
            <Input
              placeholder='Benutzername'
              flex={1}
              borderColor='transparent'
              py='16px'
              fontSize='18px'
              color='rgba(0,0,0,0.7))'
              mr='20px'
              placeholderTextColor='rgba(0,0,0,0.7)'
            />
          </Box>
          <Box
            backgroundColor='rgba(185, 209, 217, 0.2);'
            borderRadius={10}
            w='100%'
            flexDir='row'
            alignItems='center'
            mt='30px'
          >
            <Icon
              as={Ionicons}
              name='lock-closed'
              size={22}
              ml='18px'
              mr='5px'
            />
            <Input
              placeholder='Passwort'
              flex={1}
              borderColor='transparent'
              py='16px'
              fontSize='18px'
              color='rgba(0,0,0,0.7))'
              mr='20px'
              placeholderTextColor='rgba(0,0,0,0.7)'
            />
          </Box>
          <Button
            w='100%'
            backgroundColor='#296879'
            mt='60px'
            borderRadius={13}
          >
            <Text color='#fff' fontWeight='bold' fontSize='18px'>
              LOGIN
            </Text>
          </Button>
          <Button variant='ghost' mt={13}>
            <Text color='#296879' fontWeight='medium' fontSize='18px'>
              Passwort vergessen?
            </Text>
          </Button>
        </Box>
        <Box
          mt={30}
          mb={20}
          flexDir='row'
          alignItems='center'
          justifyContent='center'
        >
          <Text color='#fff' fontSize='18px'>
            Noch kein Account?
          </Text>
          <Button variant='ghost'>
            <Text color='#fff' fontSize='18px' fontWeight='bold' ml='-5px'>
              Registriere dich!
            </Text>
          </Button>
        </Box>
      </Box> */}
    </ScreenWrapper>
  );
};

export default SessionScreen;
