import React from 'react'
import { Box, Button, Center, Stack } from "@chakra-ui/react";

export const Counter = () => {
    const counter = React.useRef(0);

    // Just a state so we can trigger a rerender.
    const [state, setState] = React.useState<number>(0);

    const handleRefButtonClick = () => {
        counter.current = counter.current + 1;
    }

    console.log("count", counter.current);
    const handleStateButtonClick = () => {
        setState(prev => prev + 1);
    }

    return (
        <Center>
          <Stack spacing="16px">
            <Box>
              <Button onClick={handleRefButtonClick}>Increment Ref</Button>
            </Box>
            <Box>
              <Button onClick={handleStateButtonClick}>Trigger State</Button>
            </Box>
            <Box>
              <Box>
                  Ref: {counter.current}
              </Box>
              <Box>
                  State: {state}
              </Box>
            </Box>
          </Stack>
        </Center>
      );
}