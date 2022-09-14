import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { AppContext } from "../context";
import Card from "../components/Card";
import { Container } from "../components/Container";

const MAX_LIMIT:number = 5;

const Project = (props: any) => {
  const { hyperClient } = useContext(AppContext);
  const navigate = useNavigate();

  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    console.log("PROJECT PAGE: ", props);
    hyperClient.searchProjectByName({
      condition: {
        name: ""
      }
    })
    .then((res: any) => {
      console.log("PROJECT: ", res);
      setTokens(res);
    });
  }, []);

  const handleClick = (id: String) => {
    navigate(`/token/${id}`);
  };

  const renderTokens = () => {
    return tokens.map((token: any, index: number) => {
      return (
        <GridItem key={index} colSpan={1} bg="gray" h="100px">
          {/* <Card data={project} type="project" onClick={handleClick(project.project_id)} /> */}
        </GridItem>
      );
    });
  };

  return (
    <Container>
        <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`} gap={6}>
            {/* {renderTokens()} */}
        </Grid>
    </Container>
  );
};

export default Project;
