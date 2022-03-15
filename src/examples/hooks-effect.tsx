import React from "react";
import { Box, Button, Center, Stack } from "@chakra-ui/react";

export const Counter = () => {
  const [count, setCount] = React.useState<number>(() =>
    {
      console.log('Inside lazy initializer');
      return parseInt(window.localStorage.getItem("count") ?? "0")}
  );

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  React.useEffect(() => {
      window.localStorage.setItem("count", count.toString());
  }, [count]);

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