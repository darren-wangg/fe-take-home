import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context";

import Card from "../components/Card";
import { Container } from "../components/Container";

const MAX_LIMIT: number = 5;

const Likes = () => {
  const { likes } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (address: String) => {
    navigate(`/token/${address}`);
  };

  const renderLikes = () => {
    return likes.map((like: any, index: number) => {
      return (
        <GridItem
          key={index}
          colSpan={1}
          bg="gray"
          h="100px"
          onClick={() => handleClick(like.token_address)}
        >
          <Card data={like} type="token" />
        </GridItem>
      );
    });
  };

  if (!likes || likes.length == 0) {
    return (
      <div className="center">
        <Heading as="h2" fontSize="xl">
          No Likes... Heart a token to save it to your likes!
        </Heading>
      </div>
    );
  }

  return (
    <Container>
      <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`} gap={6}>
        {renderLikes()}
      </Grid>
    </Container>
  );
};

export default Likes;
