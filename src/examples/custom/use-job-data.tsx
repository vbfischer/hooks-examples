import React from "react";

export interface JobType {
  id: number;
  comments: string;
}

export interface JobState {
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
        jobs: state.jobs.map((j) =>
          j.id !== action.payload.id ? j : action.payload
        ),
      };
    case "nextJob":
      const nextJobId =
        state.currentJobId === state.jobs.length ? 1 : state.currentJobId + 1;
      return {
        ...state,
        currentJobId: nextJobId,
      };
    case "previousJob":
      const previousJobId =
        state.currentJobId === 1 ? state.jobs.length : state.currentJobId - 1;

      return {
        ...state,
        currentJobId: previousJobId,
      };
    default:
      throw new Error();
  }
};

export interface UseJobDataProps {
    initialJobId?: number;
    initialJobs: JobType[];
}

export const useJobData = (props: UseJobDataProps) => {
    const {initialJobId = 1, initialJobs} = props;

    const [jobState, dispatch] = React.useReducer(jobReducer, {
        currentJobId: initialJobId,
        jobs: initialJobs    
    });


    return {
        ...jobState,
        nextJob: () => dispatch({type: "nextJob"}),
        previousJob: () => dispatch({type: "previousJob"}),
        currentJob: jobState.jobs.find(j => j.id === jobState.currentJobId)!,
        updateComment: (comments: string) => dispatch({type: "updateComments", payload: {
            id: jobState.currentJobId,
            comments
        }})
    }
};
