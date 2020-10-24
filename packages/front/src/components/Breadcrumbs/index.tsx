import React from "react";
import { Route } from "react-router";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "./BreadcrumbsItem";

export * from "./BreadcrumbsContext";
export const Breadcrumbs: React.FC = () => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Link to="/">Главная</Link>
    </Breadcrumb.Item>
    <Route path="/:path" component={BreadcrumbsItem} />
  </Breadcrumb>
);
