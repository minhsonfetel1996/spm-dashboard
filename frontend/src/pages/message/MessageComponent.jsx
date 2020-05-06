import React from "react";
import { useParams } from "react-router-dom";
import itemsDB from "./fake-db/items";
import { MotionScene, MotionScreen, SharedElement } from "react-motion-layout";

export default function MessageComponent() {
  const { messageId } = useParams();

  if (!messageId) {
    return null;
  }

  const item = itemsDB[messageId || 0];

  return (
    <MotionScreen>
      <MotionScene
        name={`message-${messageId}`}
        easing="cubic-bezier(0.22, 1, 0.36, 1)"
      >
        <div className="flex flex-col">
          <div className="flex p-4 cursor-pointer hover:bg-gray-100">
            <SharedElement.Image
              alt=""
              className="w-16 h-16 rounded-full"
              src={item.avatar}
              animationKey="avatar"
            />
            <div className="flex justify-between w-full ml-4 mt-2">
              <div className="flex flex-col">
                <SharedElement.Text
                  className="font-semibold text-xl"
                  animationKey="name"
                >
                  {item.name}
                </SharedElement.Text>
                <div className={`text-sm font-medium text-green-500`}>
                  Active now
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex w-full justify-start">
              <div
                className="p-4 w-1/2 bg-gray-400 rounded-lg m-4"
                style={{ borderRadius: 40 }}
              >
                {item.messages[1].text}
              </div>
            </div>
            <div className="flex w-full justify-end items-center">
              <div
                className="flex p-4 w-1/2 bg-blue-600 text-white rounded-lg m-4"
                style={{ borderRadius: 40 }}
              >
                {item.messages[0].text}
              </div>
              <img
                alt=""
                className="w-5 h-5 rounded-full border-white mr-4"
                src={item.avatar}
              />
            </div>
          </div>
        </div>
      </MotionScene>
    </MotionScreen>
  );
}
