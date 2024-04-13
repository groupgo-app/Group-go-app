import { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import InputField from "./InputField";
import { BiTrash } from "react-icons/bi";
import isUrl from "../utils/isUrl";
import { toast } from "react-toastify";
import { IEventData } from "../types/Event";

const SocialLinkInput = ({
  eventData,
  setEventData,
}: {
  eventData: IEventData;
  setEventData: React.Dispatch<React.SetStateAction<IEventData>>;
}) => {
  const [userInput, setUserInput] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  // const inputRef = useRef<any>(null);

  const handleInputChange = (event: any) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "," && userInput.trim() !== "") {
      if (isUrl(e.target.value)) {
        const newLink: string = userInput.trim().split(",")[0];
        const newData = {
          ...eventData,
          eventInfo: {
            ...eventData.eventInfo,
            socialLinks: [...links, newLink],
          },
        };
        setLinks([...links, newLink]);
        setEventData(newData);
      } else {
        toast("That is not a url");
      }
      setUserInput("");
    }
    if (e.key === "Escape") {
      setUserInput("");
    }
  };

  const handleBlur = (e: any) => {
    if (isUrl(e.target.value)) {
      const newData = {
        ...eventData,
        eventInfo: {
          ...eventData.eventInfo,
          socialLinks: [...eventData.eventInfo.socialLinks, e.target.value],
        },
      };
      setLinks([...eventData.eventInfo.socialLinks, e.target.value]);
      setEventData(newData);
      setUserInput("");
    } else {
      if (userInput.length) toast("That is not a url");
    }
  };

  const handleDelete = (index: number) => {
    const newLinks = links.filter((item, i) => i !== index);
    const newData = {
      ...eventData,
      eventInfo: {
        ...eventData.eventInfo,
        socialLinks: [...newLinks],
      },
    };
    setEventData(newData);
    setLinks(newLinks);
  };

  useEffect(() => {
    if (Array.isArray(eventData.eventInfo.socialLinks)) {
      setLinks(eventData.eventInfo.socialLinks);
    }
  }, [eventData.eventInfo.socialLinks]);

  const renderLink = (link: string, i: number) => {
    // Identify and return the appropriate icon based on the link

    return (
      <div
        key={link}
        className="flex gap-2 justify-between items-center px-2 py-1 m-1 bg-gray-300 rounded-full"
      >
        <div className="flex gap-2 items-center">
          <SocialIcon url={link} style={{ width: "15px", height: "15px" }} />
          <a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm"
          >
            {link}
          </a>
        </div>
        <div
          className="text-xs text-red-500 cursor-pointer"
          onClick={() => {
            handleDelete(i);
          }}
        >
          <BiTrash />
        </div>
      </div>
    );
  };

  return (
    <div className="social-links">
      <InputField
        name={"socialLinks"}
        label="Social Links (separated by comas)"
        id="socialLinks"
        type="text"
        placeholder="https://twitter.com/username, https://instagram.com/username"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoFocus={false}
        required
        // ref={inputRef}
      />

      <div className="flex flex-wrap items-center">{links.map(renderLink)}</div>
    </div>
  );
};

export default SocialLinkInput;
