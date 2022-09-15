import { Box, Image, Badge, Icon, Grid, GridItem } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FaDiscord, FaTwitter } from "react-icons/fa";

const NAME_LIMIT: number = 20;

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
            {data.project_id.substring(0, NAME_LIMIT)}
            <Badge borderRadius="full" px="2" colorScheme="blue">
              <CheckIcon />
            </Badge>
            <Box>
              <Icon as={FaDiscord} />
              <Icon as={FaTwitter} />
            </Box>
          </Box>
        </Box>

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Box>
              <p>1D Volume</p>
              <h3>{data.volume_1day.toLocaleString()}</h3>
            </Box>
            <Box>
              <p>Listed</p>
              <h3>
                {data.num_of_token_listed.toLocaleString()} /{" "}
                {data.num_of_token_holders.toLocaleString()}
              </h3>
            </Box>
          </Box>
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
            Sol:
            {data.lowest_listing_mpa
              ? data.lowest_listing_mpa.price
              : data.price}
          </Box>
        </Box>

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Box>
              <button>Buy</button>
              <button>Details</button>
            </Box>
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
