import { Grid, GridItem, Box, Image } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context";
import Card from "../components/Card";
import { Container } from "../components/Container";
import { StringInputOperationEnum } from "hyperspace-client-js";

const MAX_LIMIT: number = 5;

const Project = (props: any) => {
  const { hyperClient } = useContext(AppContext);

  // TODO: change this to be dynamic
  const id = "degods";

  const [projectInfo, setProjectInfo] = useState({});
  const [tokens, setTokens] = useState([]);

  enum StringInputOperationEnum {
    Exact = "EXACT",
  }

  enum SortOrderEnum {
    Asc = "ASC",
    Desc = "DESC",
  }

  const fetchProjectInfo = () => {
    hyperClient
      .searchProjectByName({
        condition: {
          meSlug: {
            operation: StringInputOperationEnum.Exact,
            value: id,
          },
        },
      })
      .then((res: any) => {
        console.log("PROJECT INFO: ", res);
        setProjectInfo(res.getProjectStatByName.project_stats[0]);
      });
  };

  const fetchProjectTokens = () => {
    hyperClient
      .getMarketplaceSnapshot({
        condition: {
          projects: [
            {
              project_id: id,
            },
          ],
        },
        orderBy: {
          field_name: "lowest_listing_price",
          sort_order: SortOrderEnum.Asc,
        },
      })
      .then((res: any) => {
        console.log("PROJECT TOKENS: ", res);
        setTokens(
          res.getMarketPlaceSnapshots.market_place_snapshots.slice(0, MAX_LIMIT)
        );
      });
  };

  useEffect(() => {
    fetchProjectInfo();
    fetchProjectTokens();
  }, []);

  const handleClick = (id: String) => {
    console.log("CLICKED: (token) ", id);
  };

  const renderTokens = () => {
    return tokens.map((token: any, index: number) => {
      return (
        <GridItem key={index} colSpan={1} bg="gray" h="100px">
          <Card
            data={token}
            type="token"
            onClick={() => handleClick(token.token_address)}
          />
        </GridItem>
      );
    });
  };

  if (!projectInfo || !projectInfo.project || !tokens) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box>
        <Image
          src={projectInfo.project.img_url}
          alt={projectInfo.project.display_name}
          style={{ width: "200px", height: "auto", borderRadius: "50%" }}
        />
        <h3>{projectInfo.project.display_name}</h3>
      </Box>
      <Box>
        <p>
          Listed: {projectInfo.num_of_token_listed.toLocaleString()} /{" "}
          {(
            projectInfo.num_of_token_listed /
            projectInfo.percentage_of_token_listed
          ).toLocaleString()}
        </p>
        <p>1 Day Volume: ${projectInfo.volume_1day.toLocaleString()}</p>
        <p>Floor Price: {projectInfo.floor_price} SOL</p>
        <p>Change: {projectInfo.floor_price_1day_change}</p>
        <p>Unique Owners: {projectInfo.num_of_token_holders}</p>
      </Box>
      <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`} gap={6}>
        {renderTokens()}
      </Grid>
    </Container>
  );
};

export default Project;
