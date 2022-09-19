import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context";
import { Container } from "../components/Container";
import Card from "../components/Card";

const MAX_LIMIT: number = 5;

const Home = () => {
  const { hyperClient } = useContext(AppContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  enum SortOrderEnum {
    Asc = "ASC",
    Desc = "DESC",
  }

  useEffect(() => {
    hyperClient
      .getProjects({
        orderBy: {
          field_name: "market_cap",
          sort_order: SortOrderEnum.Desc,
        },
      })
      .then((res: any) => {
        setProjects(res.getProjectStats.project_stats.slice(0, MAX_LIMIT));
      });
  }, []);

  const handleClick = (id: String) => {
    navigate(`/project/${id}`);
  };

  const renderProjects = () => {
    return projects.map((project: any, index: number) => {
      return (
        <GridItem
          key={index}
          colSpan={1}
          bg="gray"
          h="100px"
          onClick={() =>
            handleClick(project.project.me_slug || project.project_id)
          }
        >
          <Card data={project} type="project" />
        </GridItem>
      );
    });
  };

  return (
    <Container>
      <Grid templateColumns={`repeat(${MAX_LIMIT}, 1fr)`} gap={6}>
        {renderProjects()}
      </Grid>
    </Container>
  );
};

export default Home;
