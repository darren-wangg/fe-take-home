import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context";
import Card from "../components/Card";
import { Container } from "../components/Container";

const MAX_LIMIT: number = 5;

const Discover = () => {
  const { collections } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (name: String) => {
    navigate(`/collection/${name}`);
  };

  const renderCollections = () => {
    return collections.map((collection: any, index: number) => {
      return (
        <GridItem
          key={index}
          colSpan={1}
          h="300px"
          onClick={() => handleClick(collection.name)}
        >
          <Card data={collection} type="collection" />
        </GridItem>
      );
    });
  };

  if (!collections || collections.length == 0) {
    return (
      <div className="center">
        <Heading as="h2" fontSize="xl">
          No Collections... Create a new collection and start adding tokens!
        </Heading>
      </div>
    );
  }

  return (
    <Container>
      <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`} gap={4}>
        {renderCollections()}
      </Grid>
    </Container>
  );
};

export default Discover;
