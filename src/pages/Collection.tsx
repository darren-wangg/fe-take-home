import { Grid, GridItem, Box, Image } from "@chakra-ui/react";
import { useContext } from "react";

import { AppContext } from "../context";
import Card from "../components/Card";
import { Container } from "../components/Container";

const MAX_LIMIT: number = 5;

const Collection = (props: any) => {
  const { hyperClient } = useContext(AppContext);

  // TODO: change this to be dynamic
  const collection = {
    name: "My Favorite NFTs",
    tokens: [
      {
        token_address: "9Wg9bjexNdbV9aT4k6xrLpMnwaRtCkMvHasE2rvdosEk",
        project_id: "degods",
        name: "DeGod #6960",
        rank_est: 9316,
        full_img: null,
        meta_data_img: "https://metadata.degods.com/g/6959-dead.png",
        attributes: {
          eyes: "None",
          head: "Bleached Curls",
          neck: "None",
          skin: "Lavender Stripe",
          mouth: "None",
          clothes: "Peasant Blouse",
          version: "DeGod",
          specialty: "None",
          background: "Red",
          "Attributes Count": "5",
        },
        market_place_state: {
          block_timestamp: 1663183997,
          escrow_address: "4r4mSSWC7X3dEAr3cRGzqDM2guP77GZv2V1V1oJmg9rD",
          signature:
            "4cb9Cbs7Wf1bfxbkniJ41FJsZsazoZY11j7JnY3ZeeVVEiGbLtBr3nWM6fQ59jcpQfp6EJdmEPA6GAt5WLUii5Qj",
          seller_address: "4Ez9bVwuiRU9PHRhoRWgLxtQNQGpsF9bBgUC72UG32nJ",
          buyer_address: null,
          type: "LISTING",
          marketplace_program_id:
            "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN",
          marketplace_instance_id: null,
          fee: 0,
          amount: 1,
          seller_referral_fee: null,
          seller_referral_address: null,
          buyer_referral_address: null,
          buyer_referral_fee: null,
          metadata: {
            escrow_ta: "6PQmsSfHTYmug9NJAJZkNu4ChkeqBjRzX8NohFnX5p1X",
            escrow_owner: "DdDRVC78xjZe4Aa4dJhGQfAXsrpDeyQ4bCWGJdWtJbA",
            charity_wallet: "5z1vT6R1HcgvzDpto63rrhgVF4CjA4Sho6DbN58Pwzw3",
            charity_fee_basis_points: 0,
            creator_fee_basis_points: 0,
          },
          price: 339.99,
        },
      },
      {
        token_address: "9Wg9bjexNdbV9aT4k6xrLpMnwaRtCkMvHasE2rvdosEk",
        project_id: "degods",
        name: "DeGod #6960",
        rank_est: 9316,
        full_img: null,
        meta_data_img: "https://metadata.degods.com/g/6959-dead.png",
        attributes: {
          eyes: "None",
          head: "Bleached Curls",
          neck: "None",
          skin: "Lavender Stripe",
          mouth: "None",
          clothes: "Peasant Blouse",
          version: "DeGod",
          specialty: "None",
          background: "Red",
          "Attributes Count": "5",
        },
        market_place_state: {
          block_timestamp: 1663183997,
          escrow_address: "4r4mSSWC7X3dEAr3cRGzqDM2guP77GZv2V1V1oJmg9rD",
          signature:
            "4cb9Cbs7Wf1bfxbkniJ41FJsZsazoZY11j7JnY3ZeeVVEiGbLtBr3nWM6fQ59jcpQfp6EJdmEPA6GAt5WLUii5Qj",
          seller_address: "4Ez9bVwuiRU9PHRhoRWgLxtQNQGpsF9bBgUC72UG32nJ",
          buyer_address: null,
          type: "LISTING",
          marketplace_program_id:
            "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN",
          marketplace_instance_id: null,
          fee: 0,
          amount: 1,
          seller_referral_fee: null,
          seller_referral_address: null,
          buyer_referral_address: null,
          buyer_referral_fee: null,
          metadata: {
            escrow_ta: "6PQmsSfHTYmug9NJAJZkNu4ChkeqBjRzX8NohFnX5p1X",
            escrow_owner: "DdDRVC78xjZe4Aa4dJhGQfAXsrpDeyQ4bCWGJdWtJbA",
            charity_wallet: "5z1vT6R1HcgvzDpto63rrhgVF4CjA4Sho6DbN58Pwzw3",
            charity_fee_basis_points: 0,
            creator_fee_basis_points: 0,
          },
          price: 339.99,
        },
      },
    ],
  };

  const renderTokens = () => {
    return collection.tokens.map((token: any, index: number) => {
      return (
        <GridItem key={index} colSpan={1} bg="gray" h="100px">
          <Card
            data={token}
            type="token"
          />
        </GridItem>
      );
    });
  };

  if (!collection || !collection.tokens) {
    return <div>Nothing in this collection yet... Add a token!</div>;
  }

  return (
    <Container>
      <Box>
        <h3>{collection.name}</h3>
      </Box>
      <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`} gap={6}>
        {renderTokens()}
      </Grid>
    </Container>
  );
};

export default Collection;
