import { LuMessageCircle } from "react-icons/lu";
import { FaRetweet, FaRegHeart, FaHeart } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

const Buttons = ({ tweet }) => {
  // oturumu acik olan kullanici bu tweet'i like ladi mi?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // like durumunu tersine çevirir
  const toggleLike = () => {
    // guncellencek dokumanin referansini alma
    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      likes: isLiked
        ? // eger kullanici like'lamissa likes dizisinden kullanicinin id'sini kaldir
          arrayRemove(auth.currentUser.uid)
        : // yoksa likes dizisine  kullanicinin id'sini ekle
          arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#00a6ff43]">
        <LuMessageCircle />
      </div>

      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#04ff0031]">
        <FaRetweet />
      </div>

      <div
        onClick={toggleLike}
        className="flex items-center gap-2 p-3 rounded-full cursor-pointer transition hover:bg-[#f200ff64]"
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}

        {tweet.likes.length}
      </div>

      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#83898d43]">
        <CiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
