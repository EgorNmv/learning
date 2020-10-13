import React, { Dispatch, SetStateAction } from "react";
import { Input } from "antd";
import { graphql } from "react-relay";
import { fetchQuery, useRelayEnvironment } from "react-relay/hooks";
import { UserProfileEventsSearchableInputQuery } from "./__generated__/UserProfileEventsSearchableInputQuery.graphql";
import { UserProfileEventsQueryResponse } from "../__generated__/UserProfileEventsQuery.graphql";

type Training = UserProfileEventsQueryResponse["trainings"][number];
type UserProfileEventsSearchableInputProps = {
  onFetched: Dispatch<SetStateAction<Training[]>>;
};

const query = graphql`
  query UserProfileEventsSearchableInputQuery($searchText: String!) {
    searchableTrainingsByContext(searchText: $searchText) {
      trainingId: id
      name
      start
      end
      isDateSet
      listOfRequestsReviewsAndRecomends
    }
  }
`;

export const UserProfileEventsSearchableInput: React.FC<UserProfileEventsSearchableInputProps> = ({
  onFetched,
}) => {
  const environment = useRelayEnvironment();
  const [searchTrainingText, setSearchTrainingText] = React.useState<string>(
    ""
  );

  React.useEffect(() => {
    if (searchTrainingText) {
      const disposable = fetchQuery<UserProfileEventsSearchableInputQuery>(
        environment,
        query,
        {
          searchText: searchTrainingText,
        }
      ).toPromise();

      disposable.then((data) => {
        if (data?.searchableTrainingsByContext.length) {
          onFetched(data.searchableTrainingsByContext as any);
        }
      });
    }
  }, [searchTrainingText]);

  return (
    <Input.Search
      className="events-table__card-input"
      enterButton="Искать"
      size="large"
      placeholder="Поиск событий по контексту"
      onSearch={setSearchTrainingText}
    />
  );
};
