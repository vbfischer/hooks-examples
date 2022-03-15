import React from "react";
import { Box, Button, HStack, StackDivider, Textarea, VStack } from "@chakra-ui/react";

interface JobType {
  id: number;
  comments: string;
}

interface JobState {
  currentJobId: number;
  jobs: JobType[];
}

type Actions =
  | {
      type: "updateComments";
      payload: JobType;
    }
  | {
      type: "nextJob";
    }
  | {
      type: "previousJob";
    };

const jobReducer = (state: JobState, action: Actions) => {
  switch (action.type) {
    case "updateComments":
        return {
            ...state,
            jobs: state.jobs.map(j => j.id !== action.payload.id ? j : action.payload)
        }
    case "nextJob":
        const nextJobId = state.currentJobId === (state.jobs.length ) ? 1 : state.currentJobId + 1;
        return {
            ...state,
            currentJobId: nextJobId
        }
    case "previousJob":
        const previousJobId = state.currentJobId === 1 ? state.jobs.length : state.currentJobId - 1;

        return {
            ...state,
            currentJobId: previousJobId
        }
    default:
      throw new Error();
  }
};

const initialJobState: JobState = {
  currentJobId: 1,
  jobs: [
    {
      id: 1,
      comments: "Comments for Job 1",
    },
    {
      id: 2,
      comments: "Comments for Job 2",
    },
    {
      id: 3,
      comments: "Comments for Job 3",
    },
    {
      id: 4,
      comments: "Comments for Job 4",
    },
    {
      id: 5,
      comments: "Comments for Job 5",
    },
  ],
};

export const JobComponent = () => {
  const [jobState, dispatch] = React.useReducer(jobReducer, initialJobState);

  const currentJob = jobState.jobs.find((j) => j.id === jobState.currentJobId)!;

  const updateComment = (comment: string) => {
    dispatch({
      type: "updateComments",
      payload: {
        ...currentJob,
        comments: comment,
      },
    });
  };

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing="32px">
      <Box>
        <Box>
          <Box>Job ID: {currentJob.id}</Box>
          <Box>Comment: {currentJob.comments}</Box>
        </Box>
      </Box>
      <HStack spacing="16px">
        <Button onClick={() => dispatch({type: "previousJob"})}>Previous</Button>
        <Button onClick={() => dispatch({type: "nextJob"})}>Next</Button>
      </HStack>
      <CommentView
        comment={currentJob.comments}
        onUpdateComment={updateComment}
      />
    </VStack>
  );
};

export const CommentView = (props: {
  comment: string;
  onUpdateComment?: (comment: string) => void;
}) => {
  const { comment, onUpdateComment } = props;
  const [commentText, setCommentText] = React.useState<string>(comment);

  const handleUpdateComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    onUpdateComment?.(commentText);
  };

  React.useEffect(() => {
    console.log(`Rerendered with props [${comment}]`);
  });

  React.useEffect(() => {
    setCommentText(comment);
  }, [comment]);

  return (
    <Box>
      <Textarea value={commentText} onChange={handleUpdateComment} />
      <Button onClick={handleSubmit}>Submit Comment</Button>
    </Box>
  );
};
