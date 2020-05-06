import React from "react";
import { MotionScreen } from "react-motion-layout";
import itemsDb from "./fake-db/items";
import { MessageItemComponent } from "./MessageItemComponent";

export default function ListMessagesComponent() {
  return (
    <MotionScreen>
      <div className="mt-4">
        <h1 className="p-4 text-3x1 font-bold">Messages</h1>
        {itemsDb.map((item, id) => (
          <MessageItemComponent key={id} id={id} item={item} />
        ))}
      </div>
    </MotionScreen>
  );
}
