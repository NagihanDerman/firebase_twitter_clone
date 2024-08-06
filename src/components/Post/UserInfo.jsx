import moment from "moment";
import "moment/locale/tr";
import { MdEdit } from "react-icons/md";

const UserInfo = ({ tweet }) => {
  let date = tweet.createdAt?.toDate();

  date = moment(date).fromNow();

  const userName = tweet?.user?.name || "Nur";
  const userNameFormatted =
    userName !== "Nur"
      ? userName.toLowerCase().split(" ").join("_")
      : "nur_nur";

  return (
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p>{userName}</p>

      <p className="text-gray-400 text-sm">@{userNameFormatted}</p>

      <p className="text-gray-400 text-sm">{date}</p>

      {tweet?.isEdited && (
        <p className="text-gray-400 text-xs">
          <span className="max-md:hidden">*edited</span>
          <span className="md:hidden">
            <MdEdit />
          </span>
        </p>
      )}
    </div>
  );
};

export default UserInfo;
