import { Box, Image, Icon } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context";
import { Container } from "../components/Container";

const Token = (props: any) => {
  const { hyperClient } = useContext(AppContext);

  // TODO: make this dynamic
  const address = "9Wg9bjexNdbV9aT4k6xrLpMnwaRtCkMvHasE2rvdosEk";

  const [tokenInfo, setTokenInfo] = useState({});

  useEffect(() => {
    hyperClient
      .getTokenState({
        condition: {
          tokenAddresses: [address],
        },
      })
      .then((res: any) => {
        console.log("TOKEN: ", res);
        {
          /* just get the first token listing (if there are multiple) */
        }
        setTokenInfo(res.getTokenState[0].market_place_states[0]);
      });
  }, []);

  const handleLike = () => {
    // add to my likes: all token info
  };

  const handleAdd = () => {
    // add to collection: all token info
  };

  return (
    <Container>
      <Box>
        <Image
          src={tokenInfo.meta_data_img}
          alt={tokenInfo.name}
          style={{ width: "500px", height: "auto" }}
        />
        <h3>{tokenInfo.name}</h3>

        <button onClick={() => handleLike()}>
          <Icon as={FaRegHeart} />
        </button>
        <button onClick={() => handleAdd()}>
          <AddIcon />
        </button>

        <p>
          Price:{" "}
          {tokenInfo.market_place_state && tokenInfo.market_place_state.price}{" "}
          SOL
        </p>

        <button>Buy Now</button>
        <button>Make Offer</button>
      </Box>

      <Box>
        <p>Attributes</p>
        <p>Details</p>
        <p>Comments</p>
      </Box>
    </Container>
  );
};

export default Token;
