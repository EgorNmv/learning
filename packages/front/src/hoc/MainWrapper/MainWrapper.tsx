import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { UserContext } from "../UserContext/UserContext";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { MainWrapperQuery } from "./__generated__/MainWrapperQuery.graphql";

const query = graphql`
  query MainWrapperQuery($email: String!) {
    getUserGroups(sub: $email)
  }
`;

export const MainWrapper: React.FC = (props) => {
  const { authState, authService } = useOktaAuth();
  const [user, setUser] = React.useState<any | null>(null);
  const { getUserGroups } = useLazyLoadQuery<MainWrapperQuery>(query, {
    email: user ? user.email : "",
  });

  React.useEffect(() => {
    if (!authState.isAuthenticated) {
      setUser(null);
    } else {
      if (user) {
        setUser((prevState: any) => ({ ...prevState, group: getUserGroups }));
      } else {
        authService.getUser().then((info: any) => {
          setUser({ ...info, group: getUserGroups });
        });
      }
    }
  }, [authState, authService, getUserGroups]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
