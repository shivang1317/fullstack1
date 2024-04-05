import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function MyForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://localhost:4000";

  const navigate = useNavigate();
  const sendEmail = async () => {
    setLoading(true);
    let dataSend = {
      email: email,
    };
    const res = await fetch(`${baseUrl}/email/sendEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("OTP sent Succesfully");
          navigate("/verify");
        } else toast.error("Not a valid request");
      })
      .catch((err) => {
        toast.error(err);
      });
    setLoading(false);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Send OTP to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Receiver's Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                isLoading={loading}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => sendEmail()}
              >
                Send Email
              </Button>
            </Stack>
          </Stack>
          <Link to={"/verify"}>
            <Button
              colorScheme={"blue"}
              variant={"link"}
              w={"full"}
              justifyContent={"end"}
              isDisabled={loading}
              pr={3}
            >
              Verify
            </Button>
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
}
