import {
  Box,
  Image,
  Icon,
  Button,
  Stack,
  Spacer,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context";
import { Container } from "../components/Container";

const Token = () => {
  const { hyperClient, likes, setLikes, collections, setCollections } =
    useContext(AppContext);

  // TODO: set this in Context?
  let address: string;

  const [tokenInfo, setTokenInfo] = useState({});
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);

  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [name, setName] = useState("");

  const isLiked: boolean = likes.some(
    (like) => like.token_address === tokenInfo.token_address
  );

  useEffect(() => {
    address = window.location.href.split("/")[4];

    hyperClient
      .getTokenState({
        condition: {
          tokenAddresses: [address],
        },
      })
      .then((res: any) => {
        {
          /* just get the first token listing (if there are multiple) */
        }
        setTokenInfo(res.getTokenState[0].market_place_states[0]);
      });
  }, []);

  const handleLike = () => {
    // add to my likes: all token info
    if (isLiked) return;
    setLikes([...likes, tokenInfo]);
  };

  const handleCreateNewCollection = () => {
    const newCollection = {
      name,
      tokens: [tokenInfo],
    };

    setCollections([...collections, newCollection]);
    setShowCollectionModal(false);
  };

  const handleAdd = (name: string) => {
    // add to existing collection: all token info
    if (!collections) return;

    collections
      .find((collection) => collection.name === name)
      .tokens.push(tokenInfo);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePost = () => {
    setComments([...comments, value]);
    setValue("");
  };

  return (
    <Container>
      <Stack spacing={4} w="500px" align="justify-content">
        <Image
          src={tokenInfo.meta_data_img}
          alt={tokenInfo.name}
          style={{ width: "400px", height: "auto", margin: "auto" }}
        />
        <Stack direction="row" spacing={4} align="center">
          <Heading as="h3" size="lg">
            {tokenInfo.name}
          </Heading>
          <Spacer />
          <button onClick={() => handleLike()}>
            {isLiked ? (
              <Icon as={FaHeart} style={{ color: "red" }} />
            ) : (
              <Icon as={FaRegHeart} />
            )}
          </button>
          <Menu>
            <MenuButton as={Button} rightIcon={<AddIcon />}>
              Collection
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => setShowCollectionModal(!showCollectionModal)}
              >
                Create a New Collection
              </MenuItem>
              <MenuDivider />
              {collections.map((collection) => (
                <MenuItem onClick={() => handleAdd(collection.name)}>
                  Add to {collection.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Modal
            isOpen={showCollectionModal}
            onClose={() => setShowCollectionModal(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a New Collection</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <Box>
                    <Text mb="8px">Name</Text>
                    <Textarea
                      placeholder="Collection Name"
                      w="200px"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </Box>
                  <Box>
                    <Text mb="8px">Description</Text>
                    <Textarea placeholder="Add a Description" w="400px" />
                  </Box>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost">Cancel</Button>
                <Button
                  colorScheme="blue"
                  onClick={() => handleCreateNewCollection()}
                >
                  Create
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>

        <Text fontSize="lg">
          Price:{" "}
          <b>
            {tokenInfo.market_place_state && tokenInfo.market_place_state.price}{" "}
            SOL
          </b>
        </Text>

        <Stack direction="row" spacing={4} align="center">
          <Button colorScheme="blue">Buy Now</Button>
          <Button colorScheme="gray">Make Offer</Button>
        </Stack>

        <Tabs>
          <TabList>
            <Tab>Attributes</Tab>
            <Tab>Details</Tab>
            <Tab>Comments</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text fontSize="md">
                <pre>{JSON.stringify(tokenInfo.attributes, null, 4)}</pre>
              </Text>
            </TabPanel>
            <TabPanel>
              <Text fontSize="md">
                <pre style={{ width: "500px", overflow: "hidden" }}>
                  {JSON.stringify(tokenInfo.market_place_state, null, 2)}
                </pre>
              </Text>
            </TabPanel>
            <TabPanel>
              <Stack spacing={4}>
                {comments.map((comment) => (
                  <Stack direction="row" spacing={4} align="center">
                    <Avatar
                      name="Default User"
                      src="https://bit.ly/dan-abramov"
                    />
                    <Text fontSize="md">Username: </Text>
                    <Text fontSize="md">{comment}</Text>
                  </Stack>
                ))}
                <Textarea
                  placeholder="Add a comment"
                  value={value}
                  onChange={handleInputChange}
                />
                <Button colorScheme="blue" onClick={() => handlePost()}>
                  Post
                </Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default Token;
