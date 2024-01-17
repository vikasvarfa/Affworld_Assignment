import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Container,
  Spinner,
  Stack,
  Text,
  Button,
  useToast
} from "@chakra-ui/react";

function Home() {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [secrets, setSecrets] = useState([]);
  const { currentUser, setUser } = useAuth();
  const toast = useToast();
  const logout = () => {
    localStorage.removeItem('current_user');
    setUser(null);
    navigate('/login');
  }
  useEffect(() => {
    async function fetchSecrets() {
      try {
        const response = await axios.get("https://affworld-assignment.onrender.com/get_secrets", {
          headers: {
            "x-access-token": currentUser.token,
          },
        });
        const data = response.data;
        setSecrets(data.secrets);
        setIsFetching(false);
      } catch (e) {
        toast({
          title: "Error",
          description: "Failed to fetch secrets",
          status: "error",
          duration: 3000,
          isClosable: true
        })

      }
    }
    fetchSecrets();
  }, [currentUser]);
  return (
    <div>
      <div style={{ backgroundColor: "orange", padding: "1rem", color: "white" }}>
        <h1>AffWorld</h1>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Container marginTop={"1rem"} >
        {isFetching ? (
          <Spinner size={"lg"} />
        ) : (
          <>
            {secrets.length ? (
              <Stack spacing={"1rem"}>
                {secrets.map((secret, index) => (
                  <Card variant={"filled"} key={index}>
                    <CardBody>
                      <Text fontSize={"1.5rem"}>{secret.text}</Text>
                    </CardBody>
                    <CardFooter>
                      <Text as="i" fontSize={"0.8rem"} fontWeight={400}>
                        {new Date(secret.time_stamp).toLocaleTimeString() +
                          " " +
                          new Date(secret.time_stamp).toDateString()}
                      </Text>
                    </CardFooter>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Text>NO SECRETS</Text>
            )}
          </>
        )}
        <Stack>
          <Button marginTop={"1rem"} marginBottom={"1rem"} color={"orange"} onClick={() => navigate("/add_secret")}>ADD SECRET</Button>
        </Stack>
      </Container>
      <div style={{ backgroundColor: "orange", padding: "1rem", textAlign: "center", color: "white" }}>
        <p>© 2024 AffWorld Assignment</p>
      </div>

    </div>
  );
}

export default Home;
