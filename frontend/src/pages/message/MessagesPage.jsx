import React from "react";
import { MotionLayoutProvider } from "react-motion-layout";
import { Route, Switch } from "react-router-dom";
import ListMessagesComponent from "./ListMessagesComponent";
import MessageComponent from "./MessageComponent";

export default function MessagesPage(props) {
  const path = props.match.path;
  return (
    <div className="w-50">
      <MotionLayoutProvider>
        <Switch>
          <Route exact path={`${path}/list`}>
            <ListMessagesComponent />
          </Route>
          <Route exact path={`${path}/:messageId/detail`}>
            <MessageComponent />
          </Route>
        </Switch>
      </MotionLayoutProvider>
    </div>
  );
}
