import React from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const SearchableInput: React.FC = () => {
  return (
    <Input.Group>
      <Input
        placeholder="Я хочу найти..."
        prefix={<SearchOutlined />}
        style={{ width: "50%" }}
      />
      <Select defaultValue="Поиск по: контексту">
        <Select.Option value="date">дате</Select.Option>
        <Select.Option value="format">формату</Select.Option>
        <Select.Option value="category">категории</Select.Option>
        <Select.Option value="audience">аудитории</Select.Option>
      </Select>
    </Input.Group>
  );
};
