import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const response = await axios.post("https://affworld-assignment.onrender.com/signin", data);
      setUser(response.data.user);
      toast({
        title: "Login Success",
        status: "success",
        duration: 3000,
        isClosable: true
      })

      navigate("/");
    } catch (e) {
      toast({
        title: "Login Failed",
        description: e.response.message,
        status: "error",
        duration: 3000,
        isClosable: true
      })
    }
  };
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              {"Don't have an account?"} <Link href="/signup">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          as="form"
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
          onSubmit={login}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="login_email">Email</FormLabel>
                <Input
                  id="login_email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="login_password">Password</FormLabel>
                <Input
                  id="login_password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button type="submit">Sign in</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
