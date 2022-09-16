import { Grid, GridItem, Stack, Box, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context";
import Card from "../components/Card";
import { Container } from "../components/Container";

const Discover = (props: any) => {
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

  if (!collections) {
    return (
      <div>
        No Collections... Create a new collection and start adding tokens!
      </div>
    );
  }

  return (
    <Container>
      <Grid gap={6}>{renderCollections()}</Grid>
    </Container>
  );
};

export default Discover;
