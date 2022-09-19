import {
  Grid,
  GridItem,
  Stack,
  Heading,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context";
import Card from "../components/Card";
import { Container } from "../components/Container";

const MAX_LIMIT: number = 5;

const Collection = () => {
  const { collections } = useContext(AppContext);
  const navigate = useNavigate();

  const [collection, setCollection] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const name = window.location.href.split("/")[4].replaceAll("%20", " ");

    const match = collections.find(
      (collection: any) => collection.name === name
    );
    setCollection(match);
  }, []);

  const handleClick = (address: string) => {
    navigate(`/token/${address}`);
  };

  const renderTokens = () => {
    return collection.tokens.map((token: any, index: number) => {
      return (
        <GridItem
          key={index}
          colSpan={1}
          bg="gray"
          h="100px"
          onClick={() => handleClick(token.token_address)}
        >
          <Card data={token} type="token" />
        </GridItem>
      );
    });
  };

  if (!collection || !collection.tokens) {
    return (
      <div className="center">
        <Heading as="h2" fontSize="xl">
          Nothing in this collection yet... Add a token!
        </Heading>
      </div>
    );
  }

  return (
    <Container>
      <Stack spacing={10} alignItems="center">
        <Stack direction="row" spacing={8}>
          <Heading as="h3" size="lg">
            {collection.name}
          </Heading>
          <Button onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? <CheckIcon /> : <EditIcon />}
          </Button>
        </Stack>

        {isEditMode && <Textarea placeholder="Add a description" w="500px" />}
        <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`} gap={6}>
          {renderTokens()}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Collection;
