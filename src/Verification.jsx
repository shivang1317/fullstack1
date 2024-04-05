import React, { useState } from "react";
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
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Verification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://localhost:4000";
  const navigate = useNavigate();
  const verifyEmail = async () => {
    setLoading(true);
    let dataSend = {
      email: email,
      otp: otp,
    };

    const res = await fetch(`${baseUrl}/email/verifyEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("User verified successfully.");
          navigate("/");
        } else {
          toast.error("Check the data you have filled.");
        }
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
          <Heading fontSize={"4xl"}>Enter OTP to verify account</Heading>
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
            <FormControl id="otp">
              <FormLabel>OTP</FormLabel>
              <Input
                type="number"
                placeholder="Enter OTP you received"
                onChange={(e) => setOtp(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={loading}
                onClick={() => verifyEmail()}
              >
                Verify Email
              </Button>
            </Stack>
          </Stack>
          <Link to={"/"}>
            <Button
              isDisabled={loading}
              colorScheme={"blue"}
              variant={"link"}
              w={"full"}
              justifyContent={"end"}
              pr={3}
            >
              Resend OTP
            </Button>
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Verification;
