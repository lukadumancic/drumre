import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import Login from "../components/Login";
import User from "../components/User";
import ShowData from "../components/ShowData";
import MovieData from "../components/MovieData";
import { useState } from "react";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  return (
    <Container height="100vh">
      <Hero />
      <Center>
        {user ? (
          <Box>
            <User user={user} setUser={setUser} />
            <Flex flexDir="row">
              <ShowData name={user.name} />
              <MovieData name={user.name} />
            </Flex>
          </Box>
        ) : (
          <Login setUser={setUser} />
        )}
      </Center>

      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
