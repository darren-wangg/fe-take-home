import { Flex, useColorMode } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import HypeLogo from "../components/HypeLogo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HyperspaceClient } from "hyperspace-client-js";

import Home from "./Home";
import Project from "./Project";
import Token from "./Token";
import Likes from "./Likes";
import Discover from "./Discover";
import Collection from "./Collection";

import { AppContext } from "../context";

const Index = () => {
  const { colorMode } = useColorMode();

  // API client for accessing Hyperspace data
  const hyperClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRSBJbnRlcnZpZXciLCJuYW1lIjoiSHlwZXJzcGFjZSIsImlhdCI6MTUxNjIzOTAyMn0.HDfB97Y1pgQqQ6GshXsh5nz7fA1_ban9MTZDAbgobJk"
  );

  return (
    <Container height="100vh">
      <AppContext.Provider
        value={{
          hyperClient,
        }}
      >
        <Flex w={"100%"} h={"80px"} alignItems={"center"} px={4}>
          <HypeLogo
            fillColor={colorMode === "dark" ? "white" : "black"}
            height={30}
          />
        </Flex>

        <BrowserRouter>
          <div>
            <nav>
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
            </nav>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/token/:id" element={<Token />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/collection/:name" element={<Collection />} />
          </Routes>
        </BrowserRouter>
        <DarkModeSwitch />
      </AppContext.Provider>
    </Container>
  );
};

export default Index;
