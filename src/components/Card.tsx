import {
  Box,
  Image,
  Badge,
  Icon,
  Grid,
  GridItem,
  Button,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FaDiscord, FaTwitter } from "react-icons/fa";

const NAME_LIMIT: number = 25;

const Card = (props: any) => {
  const { data, type } = props;

  const Project = () => {
    return (
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        style={{ cursor: "pointer" }}
      >
        <Image src={data.project.img_url} alt={data.project_id} />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Heading as="h5" size="md">
              {data.project.display_name.substring(0, NAME_LIMIT)}
            </Heading>
          </Box>

          <Stack direction="row" spacing={8} align="center">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              <CheckIcon />
            </Badge>
            <Stack direction="row" spacing={2} align="center">
              <Icon as={FaDiscord} />
              <Icon as={FaTwitter} />
            </Stack>
          </Stack>
        </Box>

        <Box p="6">
          <Stack direction="row" spacing={8} align="center">
            <Box>
              <Text fontSize="md">1D Volume</Text>
              <Heading as="h5" size="sm">
                {data.volume_1day.toLocaleString()}
              </Heading>
            </Box>
            <Box>
              <Text fontSize="md">Listed</Text>
              <Heading as="h5" size="sm">
                {data.num_of_token_listed.toLocaleString()} /{" "}
                {data.num_of_token_holders.toLocaleString()}
              </Heading>
            </Box>
          </Stack>
        </Box>
      </Box>
    );
  };

  const Token = () => {
    return (
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        style={{ cursor: "pointer" }}
      >
        <Image src={data.meta_data_img} alt={data.name} />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {data.name.substring(0, NAME_LIMIT)}
            <Badge borderRadius="full" px="2" colorScheme="blue">
              <CheckIcon />
            </Badge>
          </Box>
        </Box>

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            Sol:{" "}
            {data.lowest_listing_mpa
              ? data.lowest_listing_mpa.price
              : data.price}
          </Box>
        </Box>

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Stack direction="row" spacing={4} align="center">
              <Button colorScheme="blue">Buy</Button>
              <Button colorScheme="gray" variant="outline">
                Details
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    );
  };

  const Collection = () => {
    return (
      <Box
        maxW="lg"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        style={{ cursor: "pointer" }}
      >
        <h3>{data.name}</h3>

        <Grid gap={6}>
          {data.tokens.map((token: any, index: number) => {
            return (
              <GridItem key={index} colSpan={1} bg="gray" h="100px" w="100px">
                <Image src={token.meta_data_img} alt={token.name} />
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    );
  };

  if (type === "project") {
    return <Project />;
  } else if (type === "token") {
    return <Token />;
  } else if (type === "collection") {
    return <Collection />;
  }

  return null;
};

export default Card;
