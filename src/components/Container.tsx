import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    bgColor="siteBackground"
    color="black"
    _dark={{
      color: "white",
    }}
    transition="all 0.15s ease-out"
    {...props}
    style={{ width: "90vw", margin: "auto" }}
  />
);
