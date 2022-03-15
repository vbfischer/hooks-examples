import React from "react";
import { Box, Button, Center, Stack } from "@chakra-ui/react";

export const Counter = () => {
  const [count, setCount] = React.useState<number>(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <Center>
      <Stack spacing="16px">
        <Box>
          <Button onClick={handleClick}>Increment State</Button>
        </Box>
        <Box>
          <CounterDisplay count={count}/>
        </Box>
      </Stack>
    </Center>
  );
};

const CounterDisplay = ({ count }: {count: number}) => {
  return <Box>Click Count: {count}</Box>;
};
