import React from "react";
import { TrainingEditReviewsAndRecomendsTable } from "../../../components/TrainingEditReviewsAndRecomendsTable/TrainingEditReviewsAndRecomendsTable";
import { graphql } from "react-relay";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { RecomendationsQuery } from "./__generated__/RecomendationsQuery.graphql";
import { RecomendationsMutation } from "./__generated__/RecomendationsMutation.graphql";
import { useParams } from "react-router-dom";
import { InputFeedback } from "../../../components/TrainingRecommendations/__generated__/TrainingRecommendationsMutation.graphql";
import { AlertContext } from "../../../hoc/Alert/AlertContext";

const query = graphql`
  query RecomendationsQuery($trainingId: Float!, $feedbackType: Float!) {
    feedbacksByTrainingId(
      trainingId: $trainingId
      feedbackType: $feedbackType
    ) {
      feedbackId: id
      text
      userId
      status
      date
    }
  }
`;

const mutation = graphql`
  mutation RecomendationsMutation($feedbackId: Float!, $data: InputFeedback!) {
    updateFeedbackById(id: $feedbackId, data: $data) {
      feedbackId: id
      text
      userId
      status
    }
  }
`;

export const Recomendations: React.FC = () => {
  const trainingId: number = Number(
    useParams<{ trainingId: string }>().trainingId
  );
  const { feedbacksByTrainingId } = useLazyLoadQuery<RecomendationsQuery>(
    query,
    {
      feedbackType: 1,
      trainingId,
    },
    { fetchPolicy: "store-and-network" }
  );
  const [commit, isInFlight] = useMutation<RecomendationsMutation>(mutation);
  const { showAlert } = React.useContext(AlertContext);

  const changeStatusOfFeedback = (
    feedbackId: number,
    data: InputFeedback
  ): void => {
    commit({
      variables: { feedbackId, data },
      onCompleted: () => {
        showAlert("Статус рекомендации успешно изменён");
      },
      onError: () => {
        showAlert(
          "При изменении статуса рекомендации произошла ошибка",
          "error"
        );
      },
    });
  };

  return (
    <div>
      <TrainingEditReviewsAndRecomendsTable
        feedbacks={feedbacksByTrainingId as any}
        onChangeFeedbackStatus={changeStatusOfFeedback}
        isRecomendations={true}
      />
    </div>
  );
};
