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

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const signup = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const data = { email, password, name };
        const response = await axios.post("https://affworld-assignment.onrender.com/signup", data);
        setUser(response.data.user);
        toast({
          title: "Signup Success",
          status: "success",
          duration: 3000,
          isClosable: true
        })
        navigate("/");
      } else {
        toast({
          title: "Signup failed",
          description: "Password did not match",
          status: "error",
          duration: 3000,
          isClosable: true
        })
      }
    } catch (e) {
      console.error(e);
      console.log(e.response)
      toast({
        title: "Signup failed",
        description: e.response.data,
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
            <Heading size={{ base: "xs", md: "sm" }}>Create account</Heading>
            <Text color="fg.muted">
              {"Already have an account?"} <Link href="/login">Log in</Link>
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
          onSubmit={signup}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="signup_email">Email</FormLabel>
                <Input
                  id="signup_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="signup_name">Name</FormLabel>
                <Input
                  id="signup_name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="signup_password">Password</FormLabel>
                <Input
                  id="signup_password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="signup_confirm_password">
                  Password
                </FormLabel>
                <Input
                  id="signup_confirm_password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button type="submit">Sign Up</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
