import React from "react";
import { Box, HStack, StackDivider, VStack, Button, Textarea } from "@chakra-ui/react";

import { JobType, useJobData } from "./use-job-data";

const initialJobs: JobType[] = [
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
];

export const JobComponent = () => {
  const { currentJob, updateComment, nextJob, previousJob } = useJobData({
    initialJobs,
  });

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing="32px">
      <Box>
        <Box>
          <Box>Job ID: {currentJob.id}</Box>
          <Box>Comment: {currentJob.comments}</Box>
        </Box>
      </Box>
      <HStack spacing="16px">
        <Button onClick={previousJob}>Previous</Button>
        <Button onClick={nextJob}>Next</Button>
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
