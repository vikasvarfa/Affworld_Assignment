import {
  Box,
  Button,
  Container,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import {useNavigate} from 'react-router-dom';
function AddSecret() {
  const [text, setText] = useState("");
  const toast = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate()
  const addSecret = async (e) => {
    e.preventDefault();
    try {
      setText(text.trim());
      const response = await axios.post(
        "https://affworld-assignment.onrender.com/add_secret",
        { text },
        {
          headers: {
            "x-access-token": currentUser.token,
          },
        }
      );
      const data = response.data;
      toast({
        title: "SUCCESS",
        description: "Your secret has been posted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (e) {
      toast({
        title: "FAILURE",
        description: e.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Container marginTop={"5rem"}>
        <Text fontSize={"20px"}>Add Secret</Text>
        <Box as="form" onSubmit={addSecret}>
          <Textarea
            placeholder="Your secret is safe with me"
            resize={"vertical"}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <Button mt={"1rem"} type="submit" color={"orange"}>
            Post Secret
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default AddSecret;
