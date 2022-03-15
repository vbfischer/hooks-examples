import React from "react";
import { Box, Button, Center, Stack } from "@chakra-ui/react";

interface CounterProps {

}

type CounterState = {
  count: number;
};

export class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * STATE
   *
   * Only place you should assign state directly is here.
   *
   * use `setState` everywhere else
   */
  state: CounterState = {
    count: 0,
  };

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  componentDidMount() {
      console.log('Component did mount!');
  }

  componentDidUpdate() {
    console.log('Component updated');
  }

  componentWillUnmount() {
      console.log('Component unmounted');
  }

  render() {
    return (
      <Center>
        <Stack spacing="16px">
          <Box>
            <Button onClick={this.handleClick}>Increment State</Button>
          </Box>
          <CounterDisplay count={this.state.count} />
        </Stack>
      </Center>
    );
  }
}

/**
 * DUMB/DISPLAY COMPONENT
 */
interface CounterDisplayProps {
  count: number;
}

const CounterDisplay = ({ count }: CounterDisplayProps) => {
  return <Box>Click Count: {count}</Box>;
};
