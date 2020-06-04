import React from "react";
import { Select, Menu } from "antd";
import { constants } from "../../constants/constants";

export const UserMenuWithLinks: React.FC = () => (
  <Select defaultValue="Мальцева Полина" bordered={false}>
    <Select.Option value="1">{constants["MYPROFILE"]}</Select.Option>
    <Select.Option value="2">{constants["MYREQUESTS"]}</Select.Option>
    <Select.Option value="3">{constants["MYREVIEWS"]}</Select.Option>
    <Select.Option value="4">{constants["EXIT"]}</Select.Option>
  </Select>
);
