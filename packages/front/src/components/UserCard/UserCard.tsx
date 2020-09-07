import React from "react";
import { Card, Spin, Rate } from "antd";
import "./UserCard.css";
import { useOktaFetchedUser } from "../../utils/utils";

type UserCardProps = {
  feedback: {
    userId: string;
    text: string;
    date: string;
    rate?: number | null;
  };
};

export const UserCard: React.FC<UserCardProps> = React.memo(
  ({ feedback: { text, date, userId, rate } }) => {
    const [oktaUser, setOktauser] = React.useState<any>(null);
    const getOktaUserBySub = React.useMemo(() => useOktaFetchedUser(userId), [
      userId,
    ]);

    React.useEffect(() => console.info(oktaUser), [oktaUser]);

    React.useEffect(() => {
      (async () => {
        setOktauser(await getOktaUserBySub);
      })();
    }, [userId]);

    return (
      <Card loading={!oktaUser}>
        <div className="user-card-body">
          <div className="user-card-body-user">
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "grey",
              }}
            />
            <div style={{ padding: "0 1rem" }}>
              {oktaUser && oktaUser.profile && (
                <p>{`${oktaUser.profile.firstName} ${oktaUser.profile.lastName}`}</p>
              )}
              {rate && (
                <p>
                  <Rate value={rate} disabled />
                </p>
              )}
              <p>{date}</p>
            </div>
          </div>
          <div>{text}</div>
        </div>
      </Card>
    );
  }
);
