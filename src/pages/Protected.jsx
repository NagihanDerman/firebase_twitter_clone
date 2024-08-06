import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const Protected = () => {
  // kullanicinin yetkisi var mi state'i
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    // onAuthStateChanged > kullanici oturumundaki degisimi izler
    onAuthStateChanged(auth, (user) => {
      // kullanici varsa yetkisini true'ya cek
      // oturumu kapaliysa yetkisini false'a cek
      setIsAuth(user ? true : false);
    });
  }, []);

  // eger yetkisi yoksa
  if (isAuth === false) {
    return <Navigate to={"/"} />;
  }

  // yetkisi varsa alt route'daki sayfayi göster
  return <Outlet />;
};

export default Protected;
