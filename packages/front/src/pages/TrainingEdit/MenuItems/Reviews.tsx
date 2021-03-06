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
import { AlertContext } from "../../../hoc/Alert/AlertContext";

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
      date
      rate
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
  const trainingId: number = Number(
    useParams<{ trainingId: string }>().trainingId
  );
  const { feedbacksByTrainingId } = useLazyLoadQuery<ReviewsQuery>(query, {
    feedbackType: 2,
    trainingId,
  });
  const [commit, isInFlight] = useMutation<ReviewsMutation>(mutation);
  const { showAlert } = React.useContext(AlertContext);

  const changeStatusOfFeedback = (
    feedbackId: number,
    data: InputFeedback
  ): void => {
    commit({
      variables: { feedbackId, data },
      onCompleted: () => showAlert("Статус отзыва успешно изменён"),
      onError: () =>
        showAlert("При смене статуса отзыва произошла ошибка", "error"),
    });
  };

  return (
    <TrainingEditReviewsAndRecomendsTable
      feedbacks={feedbacksByTrainingId as any}
      onChangeFeedbackStatus={changeStatusOfFeedback}
      isRecomendations={false}
    />
  );
};
