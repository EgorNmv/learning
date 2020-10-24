import React from "react";
import { useRouteMatch, Route } from "react-router";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/routes";
import { useBreadCrumbContext } from "../BreadcrumbsContext";
import BreadcrumbSeparator from "antd/lib/breadcrumb/BreadcrumbSeparator";

export const BreadcrumbsItem: React.FC = () => {
  const match = useRouteMatch();
  const { state } = useBreadCrumbContext();
  const label = (() => {
    let routeLabel = "";
    routes.forEach((route) => {
      const isMatch = match.url.match(route.link);
      if (isMatch) {
        if (route.label) {
          routeLabel = route.label;
        } else if (state[match.url]) {
          routeLabel = state[match.url];
        }
      }
    });
    return routeLabel;
  })();
  return (
    <>
      {label.length > 0 && (
        <Breadcrumb.Item>
          <Link to={match.url || ""}>{label}</Link>
          <BreadcrumbSeparator />
        </Breadcrumb.Item>
      )}
      <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
    </>
  );
};
