import { Grid, GridItem, Stack, Image, Heading, Text } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context";
import Card from "../components/Card";
import { Container } from "../components/Container";

const MAX_LIMIT: number = 5;

const Project = (props: any) => {
  const { hyperClient } = useContext(AppContext);
  const navigate = useNavigate();

  // TODO: set this in Context?
  let id: String;
  useEffect(() => {
    id = window.location.href.split("/")[4];

    fetchProjectInfo();
  }, []);

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
        setProjectInfo(res.getProjectStatByName.project_stats[0]);
        fetchProjectTokens(
          res.getProjectStatByName.project_stats[0].project_id
        );
      });
  };

  const fetchProjectTokens = (project_id) => {
    hyperClient
      .getMarketplaceSnapshot({
        condition: {
          projects: [
            {
              project_id,
            },
          ],
        },
        orderBy: {
          field_name: "lowest_listing_price",
          sort_order: SortOrderEnum.Asc,
        },
      })
      .then((res: any) => {
        setTokens(
          res.getMarketPlaceSnapshots.market_place_snapshots.slice(0, MAX_LIMIT)
        );
      });
  };

  const handleClick = (address: String) => {
    navigate(`/token/${address}`);
  };

  const renderTokens = () => {
    return tokens.map((token: any, index: number) => {
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

  if (!projectInfo || !projectInfo.project || !tokens) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Stack spacing={10}>
        <Stack spacing={4} align="center">
          <Image
            src={projectInfo.project.img_url}
            alt={projectInfo.project.display_name}
            style={{ width: "200px", height: "auto", borderRadius: "50%" }}
          />
          <Heading as="h3" size="lg">
            {projectInfo.project.display_name}
          </Heading>
          <Stack direction="row" spacing={8} align="center">
            <Text fontSize="lg">
              Listed:{" "}
              <b>
                {projectInfo.num_of_token_listed.toLocaleString()} /{" "}
                {(
                  projectInfo.num_of_token_listed /
                  projectInfo.percentage_of_token_listed
                ).toLocaleString()}
              </b>
            </Text>
            <Text fontSize="lg">
              1 Day Volume: <b>${projectInfo.volume_1day.toLocaleString()}</b>
            </Text>
            <Text fontSize="lg">
              Floor Price: <b>{projectInfo.floor_price} SOL</b>
            </Text>
            <Text fontSize="lg">
              Change:{" "}
              <span
                style={{
                  color:
                    projectInfo.floor_price_1day_change > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {projectInfo.floor_price_1day_change}
              </span>
            </Text>
            <Text fontSize="lg">
              Unique Owners: <b>{projectInfo.num_of_token_holders}</b>
            </Text>
          </Stack>
        </Stack>

        <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`} gap={6}>
          {renderTokens()}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Project;
