import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Col, Layout, Row } from "antd";
import { USER } from "../../lib/graphql/queries";
import {
  User as UserData,
  UserVariables
} from "../../lib/graphql/queries/User/__generated__/User";
import { Viewer } from "../../lib/types";
import { UserProfile } from "./components";


interface Props {
  viewer: Viewer;
}


interface MatchParams {
  id: string;
}

const { Content } = Layout;

export const User = ({ viewer }: Props) => {
  const { id } = useParams<MatchParams>();

  const { data, loading, error, refetch } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id
    }
  });

  const user = data ? data.user : null;

  const userProfileElement = user ? <UserProfile user={user} /> : null;

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>

    // <Content className="user">
    //   <h2>{userProfileElement}</h2>
    // </Content>

  );
};