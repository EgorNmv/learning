import React from "react";
import { Input, Select, AutoComplete, Card } from "antd";
import { constants } from "../../constants/constants";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { SearchableInputQuery } from "./__generated__/SearchableInputQuery.graphql";
import "./SearchableInput.css";
import { SelectValue } from "antd/lib/select";
import { Link } from "react-router-dom";

type TrainingType = {
  trainingId: number;
  name: string;
  description: string;
  category: { categoryId: number; description: string };
  start: string;
  end: string;
  format: {
    description: string;
  };
  audience: {
    description: string;
  };
};

type SearchByType = "name" | "date" | "format" | "audience" | "category";

const query = graphql`
  query SearchableInputQuery($searchBy: String!, $searchText: String) {
    searchableTrainings(searchBy: $searchBy, searchText: $searchText) {
      trainingId: id
      name
      description
      category {
        categoryId: id
        description
      }
      start
      end
      format {
        description
      }
      audience {
        description
      }
    }
  }
`;

export const SearchableInput: React.FC = () => {
  const searchableInput = React.useRef<Select<SelectValue> | null>(null);
  const [text, setText] = React.useState<string | null>(null);
  const [countOfRender, setCountOfRender] = React.useState<number>(0);
  const [timer, setTimer] = React.useState<NodeJS.Timeout>();
  const [resultOfSearch, setResultOfSearch] = React.useState<TrainingType[]>(
    []
  );
  const [
    isSearchableInputFocused,
    setIsSearchableInputFocused,
  ] = React.useState<boolean>(false);
  const [searchBy, setSearchBy] = React.useState<SearchByType>("name");
  const { searchableTrainings } = useLazyLoadQuery<SearchableInputQuery>(
    query,
    {
      searchBy,
      searchText: text,
    }
  );

  const searchByMap: { [key in SearchByType]: string } = {
    name: "контексту",
    date: "дате",
    format: "формату",
    category: "категории",
    audience: "аудитории",
  };

  const onSearch = (searchText: string) => {
    if (text !== searchText) {
      if (timer) {
        clearTimeout(timer);
      }

      setTimer(
        setTimeout(() => {
          setIsSearchableInputFocused(false);
          setText(searchText.trim());
        }, 1000)
      );
    }
  };

  const onChangeSelect = (value: SelectValue) => {
    setSearchBy(value as SearchByType);
  };

  React.useEffect(() => {
    searchableTrainings &&
      setResultOfSearch(() =>
        (searchableTrainings as TrainingType[]).map(
          ({
            name,
            trainingId,
            description,
            category,
            audience,
            format,
            end,
            start,
          }: TrainingType) => ({
            name,
            trainingId,
            description,
            category,
            audience,
            format,
            end,
            start,
          })
        )
      );

    if (countOfRender !== 0) {
      searchableInput.current?.focus();
    }

    setCountOfRender((prev) => prev + 1);
  }, [searchableTrainings]);

  return (
    <Input.Group>
      <AutoComplete
        allowClear
        className="searchable-input-form"
        placeholder={constants["SEARCHABLEINPUTPLACEHOLDER"]}
        style={{ width: "50%" }}
        onSearch={onSearch}
        ref={searchableInput}
        open={isSearchableInputFocused}
        onFocus={() => setIsSearchableInputFocused(true)}
        onBlur={() => setIsSearchableInputFocused(false)}
        notFoundContent="Таких курсов нет"
        onSelect={() => {
          setIsSearchableInputFocused(false);
          searchableInput.current?.blur();
        }}
      >
        {isSearchableInputFocused &&
          resultOfSearch &&
          resultOfSearch.map((training) => (
            <AutoComplete.Option
              key={`${training.name}-${training.trainingId}`}
              value={training.name}
            >
              <Link
                to={`/category/${training.category.categoryId}/training/${training.trainingId}`}
              >
                <Card
                  title={training.name}
                  style={{
                    lineHeight: "0.5rem",
                    fontSize: "small",
                    textOverflow: "ellipsis",
                  }}
                >
                  <p>{training.description}</p>
                  <p>Категория: {training.category.description}</p>
                  <p>Дата: {`${training.start} - ${training.end}`}</p>
                  <p>Аудитория: {training.audience.description}</p>
                  <p>Формат обучения: {training.format.description}</p>
                </Card>
              </Link>
            </AutoComplete.Option>
          ))}
      </AutoComplete>
      <Select
        onChange={onChangeSelect}
        value={`Поиск по: ${searchByMap[searchBy]}`}
      >
        <Select.Option value="name">{searchByMap["name"]}</Select.Option>
        <Select.Option value="date">{searchByMap["date"]}</Select.Option>
        <Select.Option value="format">{searchByMap["format"]}</Select.Option>
        <Select.Option value="category">
          {searchByMap["category"]}
        </Select.Option>
        <Select.Option value="audience">
          {searchByMap["audience"]}
        </Select.Option>
      </Select>
    </Input.Group>
  );
};
