import { Flex, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

const GoogleWrapper = styled(Flex)`
  background-color: white;
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black !important;
    font-weight: bold !important;
  }
`;

const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `http://localhost:3001/${url}`,
    data: body,
  });

const Login = ({ setUser }: any) => {
  const router = useRouter();

  const onSuccess = (response) => {
    const access_token = response.accessToken;
    axios.get(
      `https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${access_token}`
    );
    axiosApiCall("oauth/google", "post", { access_token }).then((res) => {
      const { user, token } = res.data;
      Cookie.set("token", token);
      setUser(user);
    });
  };

  return (
    <Flex flexDir="column" align="center" justify="center">
      <GoogleWrapper w="300px" mt="3rem">
        <GoogleLogin
          clientId={
            "669754824751-23v37esc2lmg0h85jg5i3q5dao4rpijg.apps.googleusercontent.com"
          }
          buttonText="Sign up with Google"
          onSuccess={onSuccess}
          onFailure={() => {}}
          scope={"https://www.googleapis.com/auth/calendar.readonly"}
        />
      </GoogleWrapper>
    </Flex>
  );
};

export default Login;
