import React, { useEffect } from "react";
import { Button, Rate } from "antd";
import { TrainingMaterials } from "../../components/TrainingMaterials/TrainingMaterials";
import { TrainingRecommendations } from "../../components/TrainingRecommendations/TrainingRecommendations";
import { TrainingReviews } from "../../components/TrainingReviews/TrainingReviews";
import { Redirect, useParams, useRouteMatch } from "react-router-dom";
import { graphql } from "react-relay";
import { useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { TrainingMutation } from "./__generated__/TrainingMutation.graphql";
import { TrainingQuery } from "./__generated__/TrainingQuery.graphql";
import { formatDate } from "../../utils/utils";
import { UploadedPicture } from "../../components/UploadedPicture/UploadedPicture";
import { UserContext } from "../../hoc/UserContext/UserContext";
import "./training.css";
import {
  addRoute,
  Breadcrumbs,
  useBreadCrumbContext,
} from "../../components/Breadcrumbs";
import RecomendSvg from "../../static/ico/recomend.svg";

const mutation = graphql`
  mutation TrainingMutation($data: InputRequest!) {
    createRequest(data: $data) {
      requestId: id
      date
      training {
        trainingId: id
        listOfRequestsReviewsAndRecomends
      }
    }
  }
`;
const query = graphql`
  query TrainingQuery($trainingId: Float!, $userId: String!) {
    training(id: $trainingId) {
      trainingId: id
      label
      name
      description
      cost
      duration
      speaker
      numberOfParticipants
      category {
        description
      }
      format {
        description
      }
      organizer {
        name
        address
        contactInfo
      }
      start
      end
      isDateSet
      site
      audience {
        description
      }
      listOfRequestsReviewsAndRecomends
      averageRating
      format {
        description
      }
    }
    isRequestExist(userId: $userId, trainingId: $trainingId)
  }
`;

const Training: React.FC = () => {
  const params = useParams<{ trainingId: string }>();
  const { url } = useRouteMatch();
  const { dispatch } = useBreadCrumbContext();
  const id: number = Number(params.trainingId);
  const user = React.useContext(UserContext);
  const [commit, isInFlight] = useMutation<TrainingMutation>(mutation);
  const { training, isRequestExist } = useLazyLoadQuery<TrainingQuery>(query, {
    trainingId: id,
    userId: user ? user.sub : "",
  });
  const [isClickedButton, setIsClickedButton] = React.useState<boolean>(false);

  const clickHandler = () => {
    user &&
      commit({
        variables: {
          data: {
            trainingId: id,
            userId: user.sub,
            date: formatDate(new Date()),
          },
        },
        onCompleted: () => {
          setIsClickedButton(true);
        },
        updater: (store) => {
          const createdRequest = store.getRootField("createRequest");
          const training = store.getRoot().getLinkedRecord("training", { id });
          if (training && createdRequest) {
            const updatedTraining = createdRequest.getLinkedRecord("training");
            if (updatedTraining) {
              const newListOfRequestsReviewsAndRecomends = updatedTraining.getValue(
                "listOfRequestsReviewsAndRecomends"
              );
              training.setValue(
                newListOfRequestsReviewsAndRecomends,
                "listOfRequestsReviewsAndRecomends"
              );
            }
          }
        },
      });
  };

  useEffect(() => {
    dispatch(
      addRoute(
        url.slice(0, url.lastIndexOf("training") - 1),
        training ? training.category.description : ""
      )
    );
    dispatch(addRoute(url, training ? training.name : ""));
  }, [training]);

  if (!id || !training) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <section className="training">
        <Breadcrumbs />
        <h2>{training?.name}</h2>
        <div className="training__main-info">
          <div className="training-card__img__plaques">
            {training?.format?.description && (
              <div>{training?.format?.description}</div>
            )}
          </div>
          <UploadedPicture
            className="training__main-info__label"
            filename={training?.label || null}
            imgType="training"
          />
          <div className="training__main-info__info">
            <div>
              <span className="bold-title">Организатор: </span>
              <span>{training?.organizer.name}</span>
            </div>
            <div>
              <span className="bold-title">Место проведения: </span>
              <span>{training?.organizer.address}</span>
            </div>
            {training?.organizer.contactInfo && (
              <div>
                <span className="bold-title">Контактная информация: </span>
                <span>{training?.organizer.contactInfo}</span>
              </div>
            )}
            <div>
              <span className="bold-title">Дата: </span>
              <span>
                {training?.isDateSet
                  ? `${training?.start} - ${training?.end}`
                  : "Не определена"}
              </span>
            </div>
            <div>
              <span className="bold-title">Аудитория: </span>
              <span>{training?.audience.description}</span>
            </div>
            <div>
              <span className="bold-title">Формат обучения: </span>
              <span>{training?.format.description}</span>
            </div>
            {training.cost && (
              <div>
                <span className="bold-title">Стоимость: </span>
                <span>{training.cost}</span>
              </div>
            )}
            {training.duration && (
              <div>
                <span className="bold-title">Продолжительность: </span>
                <span>{training.duration}</span>
              </div>
            )}
            {training.speaker && (
              <div>
                <span className="bold-title">Спикер: </span>
                <span>{training.speaker}</span>
              </div>
            )}
            {training?.site && (
              <div>
                <span className="bold-title">Сайт: </span>
                <a className="training__main-info__site">{training?.site}</a>
              </div>
            )}
            <div>
              <span className="bold-title">Заявок: </span>
              <span>
                {training?.listOfRequestsReviewsAndRecomends &&
                  training.listOfRequestsReviewsAndRecomends[0]}
              </span>
            </div>
            <div className="training__main-info__info_recomends">
              <img src={RecomendSvg} alt="рекомендация " />
              <span className="training__main-info__info_count-of-recomends">
                {" "}
                {training?.listOfRequestsReviewsAndRecomends
                  ? training.listOfRequestsReviewsAndRecomends[2]
                  : 0}{" "}
                рекомендаций
              </span>
            </div>
            <div>
              <Rate
                disabled
                value={
                  training?.averageRating
                    ? Math.round(training.averageRating)
                    : 0
                }
              />
              <span className="training__main-info__info__average-rating">
                {training?.averageRating || 0}
              </span>
              {training?.listOfRequestsReviewsAndRecomends && (
                <span className="training__main-info__info__count-of-reviews">
                  {`(${training.listOfRequestsReviewsAndRecomends[1]} оценок)`}
                </span>
              )}
            </div>
            <div>
              <Button
                type="primary"
                onClick={clickHandler}
                disabled={isClickedButton || isRequestExist}
                className="training__main-info__request-btn"
              >
                Подать заявку на участие
              </Button>
              {training.numberOfParticipants &&
                training.listOfRequestsReviewsAndRecomends && (
                  <span className="training__main-info__free-seats">
                    Осталось мест:{" "}
                    {training.numberOfParticipants -
                      training.listOfRequestsReviewsAndRecomends[0]}
                  </span>
                )}
            </div>
          </div>
        </div>
        <div className="training-description-section">
          {training?.description}
        </div>
      </section>
      <section>
        <TrainingMaterials />
      </section>
      <section>
        <TrainingRecommendations trainingId={id} />
      </section>
      <section>
        <TrainingReviews trainingId={id} />
      </section>
    </>
  );
};

export default Training;
