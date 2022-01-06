import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `http://localhost:3001/${url}`,
    data: body,
    headers: {
      Authorization:
        "bearer eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNjFhZGFkYjlkN2Q5ZmNkZjA4NzJiNjEyIn19",
    },
  });

const User = ({ user, setUser }: any) => {
  const responseFacebook = async (response) => {
    const access_token = response.accessToken;
    const likeResponse = await axios.get(
      `https://graph.facebook.com/me/likes?access_token=${access_token}`
    );
    axiosApiCall("oauth/facebook", "post", {
      ...response,
      likeResponseData: likeResponse.data,
    }).then((res) => {
      if (res.data.user) {
        setUser(res.data.user);
      }
    });
  };

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${user.image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={user.image}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Google {user.facebookID ? "Facebook" : ""}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {user.name} {user.surname}
          </Heading>
        </Stack>
      </Box>
      <br />
      {!user.facebookID && (
        <FacebookLogin
          appId="1109679779571144"
          autoLoad={true}
          fields="name,email,picture"
          scope="user_likes"
          callback={responseFacebook}
        />
      )}
    </Center>
  );
};
export default User;
