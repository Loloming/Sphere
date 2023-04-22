import { Audio, Image } from "cloudinary-react";
import React from "react";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../../redux/reducers/userReducer";

export default function Messages({ messages, chat, myRef }) {
  const { VITE_CLOUD_NAME } = import.meta.env;

  const userLogged = useSelector(getUserLogged);

  return (
    <div
      ref={myRef}
      className="bg-sixty-percent-variant flex flex-col justify-between p-6 overflow-y-auto max-h-96"
    >
      {(userLogged[0] &&
        messages &&
        messages
          .sort((a, b) => a.id - b.id)
          .map((m, index) => {
            return (
              <div
                key={index}
                className={
                  m.user == userLogged[0].id
                    ? "self-end text-right bg-thirty-percent w-96 m-2 p-2 flex flex-col h-auto rounded"
                    : "text-left bg-sixty-percent w-96 m-2 p-2 rounded"
                }
              >
                <p className="text-slate-500 break-words">
                  {chat.Users.filter((u) => m.user === u.id)[0].username}
                </p>
                {m.images && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {m.images.map((image, index) => {
                      return (
                        <Image
                          cloudName={VITE_CLOUD_NAME}
                          publicId={image.url}
                          className="w-full object-cover"
                          key={index}
                        />
                      );
                    })}
                  </div>
                )}
                {m.content && (
                  <p className="text-white break-words">{m.content}</p>
                )}
                {m.audio && (
                  <Audio
                    cloudName={VITE_CLOUD_NAME}
                    publicId={m.audio}
                    controls
                  />
                )}
              </div>
            );
          })) || <h3>No hay mensajes</h3>}
    </div>
  );
}
