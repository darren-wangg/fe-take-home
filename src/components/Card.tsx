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
  Spacer,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FaDiscord, FaTwitter } from "react-icons/fa";

const NAME_LIMIT: number = 25;
const MAX_LIMIT: number = 5;

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

        <Box p="4">
          <Stack spacing={4}>
            <Stack direction="row" spacing={2} align="center">
              <Heading as="h5" size="md">
                {data.project.display_name.substring(0, NAME_LIMIT)}
              </Heading>
              <Badge borderRadius="full" px="2" colorScheme="blue">
                <CheckIcon />
              </Badge>
            </Stack>
            <Stack direction="row" spacing={2} align="center">
              <Icon as={FaDiscord} />
              <Icon as={FaTwitter} />
            </Stack>
          </Stack>
        </Box>

        <Box p="4">
          <Stack direction="row" spacing={4} align="center">
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
          <Stack direction="row" spacing={4}>
            <Heading as="h5" size="md">
              {data.name.substring(0, NAME_LIMIT)}
            </Heading>
            <Badge borderRadius="full" px="2" colorScheme="blue">
              <CheckIcon />
            </Badge>
          </Stack>
        </Box>

        <Box p="6">
          <Text fontSize="lg">
            Sol:{" "}
            <b>
              {data.lowest_listing_mpa
                ? data.lowest_listing_mpa.price
                : data.market_place_state.price}
            </b>
          </Text>
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
        style={{ cursor: "pointer" }}
      >
        <Spacer />
        <Box h="70px" bg="lightGray" className="center">
          <Heading as="h3" size="lg">
            {data.name}
          </Heading>
        </Box>

        <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`}>
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
