import { Flex, useColorMode, Box, Spacer, Stack } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import HypeLogo from "../components/HypeLogo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HyperspaceClient } from "hyperspace-client-js";
import { useState } from "react";

import Home from "./Home";
import Project from "./Project";
import Token from "./Token";
import Likes from "./Likes";
import Discover from "./Discover";
import Collection from "./Collection";

import { AppContext } from "../context";
import { render } from "react-dom";

const Index = () => {
  const { colorMode } = useColorMode();

  // API client for accessing Hyperspace data
  const hyperClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRSBJbnRlcnZpZXciLCJuYW1lIjoiSHlwZXJzcGFjZSIsImlhdCI6MTUxNjIzOTAyMn0.HDfB97Y1pgQqQ6GshXsh5nz7fA1_ban9MTZDAbgobJk"
  );

  // TODO: create types for like and collection
  const [likes, setLikes] = useState([]);
  const [collections, setCollections] = useState([]);

  if (typeof window === "object") {
    document.addEventListener("DOMContentLoaded", function () {});
  }

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Container>
      <AppContext.Provider
        value={{
          hyperClient,
          likes,
          setLikes,
          collections,
          setCollections,
        }}
      >
        <BrowserRouter>
          <Flex w={"100%"} h={"80px"} alignItems={"center"} px={4}>
            <Box>
              <HypeLogo
                fillColor={colorMode === "dark" ? "white" : "black"}
                height={30}
              />
            </Box>
            <Spacer />
            <Box>
              <Stack direction="row" spacing={8} align="center">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/likes">My Likes</Link>
                  </li>
                  <li>
                    <Link to="/discover">My Collections</Link>
                  </li>
                  <li>
                    <Link to="/discover">Discover</Link>
                  </li>
                </ul>
              </Stack>
            </Box>
            <Spacer />
            <DarkModeSwitch />
          </Flex>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/token/:id" element={<Token />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/collection/:name" element={<Collection />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </Container>
  );
};

export default Index;
