import { Center, Box } from "@chakra-ui/react";
import {JobsComponent as Component} from './examples/hooks-state-effects';

function App() {
  return (
    <Box p={16} bg={"grey"} h={"100vh"}>
      <Center bg={"white"} borderRadius={16} p={16}>
        <Component />
      </Center>
    </Box>
  );
}

export default App;
