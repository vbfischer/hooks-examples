import React from "react";
import {
  Box,
  Button,
  StackDivider,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export const JobsComponent = () => {
  const [currentJob, setCurrentJob] = React.useState<number>(1);
  const [comments, setComments] = React.useState<string>("Default Comments");

  const updateJob = () => {
    setCurrentJob((prev) => prev + 1);
    setComments("Default Comments");
  };

  const updateComment = (comment: string) => {
      setComments(comment)
  }

  return (
    <VStack divider={<StackDivider borderColor='gray.200' />} spacing="32px"
    >
      <Box>
        <Box>
          <Box>Job ID: {currentJob}</Box>
          <Box>Comment: {comments}</Box>
        </Box>
      </Box>
      <Box>
          <Button onClick={updateJob}>Go To Next Job</Button>
      </Box>
      <CommentView comment={comments} onUpdateComment={updateComment}/>
    </VStack>
  );
};

export const CommentView = (props: { comment: string, onUpdateComment?: ((comment: string) => void) }) => {
  const { comment, onUpdateComment } = props;
  const [commentText, setCommentText] = React.useState<string>(comment);

  const handleUpdateComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(e.target.value);
  }

  const handleSubmit = () => {
    onUpdateComment?.(commentText);
  }

  React.useEffect(() => {
      console.log(`Rerendered with props [${comment}]`);
  });

  return (
    <Box>
      <Textarea value={commentText} onChange={handleUpdateComment} />
      <Button onClick={handleSubmit}>Submit Comment</Button>
    </Box>
  );
};
