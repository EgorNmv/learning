import React from "react";
import { Input, Select, AutoComplete } from "antd";
import { constants } from "../../constants/constants";
import "./SearchableInput.css";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { SearchableInputQuery } from "./__generated__/SearchableInputQuery.graphql";
import { useHistory } from "react-router-dom";

const query = graphql`
  query SearchableInputQuery($searchBy: String!, $searchText: String!) {
    searchableTrainings(searchBy: $searchBy, searchText: $searchText) {
      trainingId: id
      name
      # category {
      #   categoryId: id
      # }
    }
  }
`;

export const SearchableInput: React.FC = () => {
  const history = useHistory();
  const [text, setText] = React.useState<string>("");
  const { searchableTrainings } = useLazyLoadQuery<SearchableInputQuery>(
    query,
    {
      searchBy: "name",
      searchText: text,
    }
  );
  const [options, setOptions] = React.useState(() =>
    (searchableTrainings as any).map((training: any) => ({
      value: training.name,
      trainingId: training.trainingId,
    }))
  );
  const onSearch = (searchText: string) => {
    let timer: any = 0;
    clearTimeout(timer);
    timer = setTimeout(() => setText(searchText), 1000);
  };

  const onSelect = (data: string) => {
    // const currentTraining: any = searchableTrainings.filter(
    //   (training) => training.name === data
    // );
    // history.push(
    //   `/category/${currentTraining.categoryId}/training/${currentTraining.trainingId}`
    // );
  };

  React.useEffect(() => {
    setOptions(() =>
      (searchableTrainings as any).map((training: any) => ({
        value: training.name,
        trainingId: training.trainingId,
      }))
    );
  }, [searchableTrainings]);

  return (
    <Input.Group>
      {/* <Input
        className="searchable-input-form"
        placeholder={constants["SEARCHABLEINPUTPLACEHOLDER"]}
        prefix={<SearchOutlined />}
      /> */}
      <AutoComplete
        className="searchable-input-form"
        placeholder={constants["SEARCHABLEINPUTPLACEHOLDER"]}
        options={options}
        style={{ width: "50%" }}
        onSelect={onSelect}
        onSearch={onSearch}
      />
      <Select defaultValue="Поиск по: контексту" disabled>
        <Select.Option value="date">дате</Select.Option>
        <Select.Option value="format">формату</Select.Option>
        <Select.Option value="category">категории</Select.Option>
        <Select.Option value="audience">аудитории</Select.Option>
      </Select>
    </Input.Group>
  );
};
