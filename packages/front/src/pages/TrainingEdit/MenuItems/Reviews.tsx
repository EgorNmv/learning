import React from "react";
import { TrainingEditReviewsAndRecomendsTable } from "../../../components/TrainingEditReviewsAndRecomendsTable/TrainingEditReviewsAndRecomendsTable";
import { graphql } from "react-relay";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import {
  InputFeedback,
  ReviewsMutation,
} from "./__generated__/ReviewsMutation.graphql";
import { ReviewsQuery } from "./__generated__/ReviewsQuery.graphql";

const query = graphql`
  query ReviewsQuery($trainingId: Float!, $feedbackType: Float!) {
    feedbacksByTrainingId(
      trainingId: $trainingId
      feedbackType: $feedbackType
    ) {
      feedbackId: id
      text
      userId
      status
    }
  }
`;

const mutation = graphql`
  mutation ReviewsMutation($feedbackId: Float!, $data: InputFeedback!) {
    updateFeedbackById(id: $feedbackId, data: $data) {
      feedbackId: id
      text
      userId
      status
    }
  }
`;

export const Reviews: React.FC = () => {
  const params = useParams<{ id: string }>();
  const trainingId = Number(params.id);
  const { feedbacksByTrainingId } = useLazyLoadQuery<ReviewsQuery>(query, {
    feedbackType: 2,
    trainingId,
  });
  const [commit, isInFlight] = useMutation<ReviewsMutation>(mutation);

  const changeStatusOfFeedback = (
    feedbackId: number,
    data: InputFeedback
  ): void => {
    commit({
      variables: { feedbackId, data },
      onCompleted: () => window.location.reload(),
    });
  };

  return (
    <div>
      <TrainingEditReviewsAndRecomendsTable
        feedbacks={feedbacksByTrainingId as any}
        onChangeFeedbackStatus={changeStatusOfFeedback}
        isRecomendations={false}
      />
    </div>
  );
};
