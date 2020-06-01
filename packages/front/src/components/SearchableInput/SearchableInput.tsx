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
        <Select.Option value="Zhejiang">Zhejiang</Select.Option>
        <Select.Option value="Jiangsu">Jiangsu</Select.Option>
      </Select>
    </Input.Group>
  );
};
