import React, { useCallback } from "react";
import { MotionScene, SharedElement, useMotion } from "react-motion-layout";
import { useHistory } from "react-router-dom";

export function MessageItemComponent({ item, id }) {
  const history = useHistory();
  const withTransition = useMotion(`message-${id}`);
  const callback = useCallback(() => history.push(`/dashboard/message/${id}/detail`), [
    history,
    id,
  ]);

  return (
    <MotionScene
      easing="cubic-bezier(0.22, 1, 0.36, 1)"
      name={`message-${id}`}
      onClick={withTransition(callback)}
    >
      <div className="flex p-4 cursor-pointer hover:bg-gray-100">
        <SharedElement.Image
          alt=""
          className="w-16 h-16 rounded-full"
          src={item.avatar}
          animationKey="avatar"
        />
        <div className="flex justify-between w-full ml-4 mt-2">
          <div className="flex flex-col">
            <SharedElement.Text className="font-semibold" animationKey="name">
              {item.name}
            </SharedElement.Text>
            <div
              className={`text-sm font-medium ${
                item.unread ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {item.text}
            </div>
          </div>
          <div className={`text-xs ${item.unread ? "" : "text-gray-500"}`}>
            {item.time}
          </div>
        </div>
      </div>
    </MotionScene>
  );
}
