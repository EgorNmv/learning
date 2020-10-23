import React from "react";
import { Card, Spin, Rate } from "antd";
import "./user-card.css";
import { useOktaFetchedUser } from "../../utils/utils";

type UserCardProps = {
  feedback: {
    userId: string;
    text: string;
    date: string;
    rate?: number | null;
  };
  className?: string;
};

export const UserCard: React.FC<UserCardProps> = React.memo(
  ({ feedback: { text, date, userId, rate }, className }) => {
    const [oktaUser, setOktauser] = React.useState<any>(null);
    const getOktaUserBySub = React.useMemo(() => useOktaFetchedUser(userId), [
      userId,
    ]);

    React.useEffect(() => {
      (async () => {
        setOktauser(await getOktaUserBySub);
      })();
    }, [userId]);

    return (
      <Card
        className={`user-card__loading${className ? ` ${className}` : ""}`}
        loading={!oktaUser}
      >
        <div className="user-card-body">
          <div className="user-card-body-user">
            {/* <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "grey",
              }}
            /> */}
            <div>
              {oktaUser && oktaUser.profile && (
                <p>{`${oktaUser.profile.firstName} ${oktaUser.profile.lastName}`}</p>
              )}
              <p>
                {rate ? (
                  <Rate value={rate} disabled />
                ) : (
                  <Rate value={0} disabled />
                )}
              </p>
              <p className="user-card-body-user__date">{date}</p>
            </div>
          </div>
          <div className="user-card__text">{text}</div>
        </div>
      </Card>
    );
  }
);
