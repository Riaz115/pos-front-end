import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const RiazStore = createContext();

export const MyDataProvider = ({ children }) => {
  const [showForGuest, setShowForGuest] = useState(false);
  const [showForEditGuest, setShowForEditGuest] = useState(false);
  const [showForGuestAdd, setShowForGuestAdd] = useState(false);
  const [allOwnerUser, setAllOwnerUser] = useState([]);
  const [guestId, setGuestId] = useState(localStorage.getItem("guestid"));
  const [restId, setRestId] = useState(localStorage.getItem("restid"));

  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState("");
  const [userImage, setUserImage] = useState("");

  //this is my backend url
  const myUrl = "http://localhost:8000/api";

  //this is for check logged in
  let loggedIn = !!token;

  //this is for setToken to LocalStorage
  const setTokenToLocalStorage = (serverToken) => {
    const myToken = localStorage.setItem("token", serverToken);
    return myToken;
  };

  //this is for remove token
  const removeToken = () => {
    localStorage.removeItem("token");
  };

  //this for get user data
  const forGetUserData = async () => {
    const url = `${myUrl}/getUserData`;
    const userOptions = {
      method: "POST",
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await fetch(url, userOptions);
      const data = await response.json();

      if (response.ok) {
        setUserData(data.userData);
        setUserImage(data.image);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("error in userget function store file ", err);
    }
  };

  //this is for get userData
  useEffect(() => {
    forGetUserData();
  }, []);

  //this is for add guest change state
  const addGuestChangeState = () => {
    setShowForGuestAdd(!showForGuestAdd);
  };

  //this is for the edit guest
  const editGuestChangeState = () => {
    setShowForEditGuest(!showForEditGuest);
  };

  //this is for guest search
  const guestSearchChangeState = () => {
    setShowForGuest(!showForGuest);
  };

  //this is for get all owner users
  const allOwnerUserGet = async () => {
    try {
      const response = await fetch(`${myUrl}/allOwnerUser`);
      const data = await response.json();
      if (response.ok) {
        setAllOwnerUser(data.ownerUsers);
      } else {
        console.log("error data", data);
      }
    } catch (err) {
      console.log("there is error in get all owner user function", err);
    }
  };

  //this is for get all users data
  useEffect(() => {
    allOwnerUserGet();
  }, []);

  //this is for delete the guest
  const forDeleteGuest = async (id) => {
    const url = `${myUrl}/delete/${id}/guest`;
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the delete guest function", err);
    }
  };

  return (
    <>
      <RiazStore.Provider
        value={{
          showForGuest,
          guestSearchChangeState,
          showForEditGuest,
          editGuestChangeState,
          showForGuestAdd,
          addGuestChangeState,
          allOwnerUser,
          myUrl,
          allOwnerUserGet,
          setTokenToLocalStorage,
          removeToken,
          token,
          loggedIn,
          userData,
          userImage,
          restId,
          setRestId,
          guestId,
          setGuestId,
          forDeleteGuest,
        }}>
        {children}
      </RiazStore.Provider>
    </>
  );
};

export const UseRiazHook = () => {
  const myAllData = useContext(RiazStore);
  if (!myAllData) {
    console.log("store file error components not wrapped correctly");
    alert("store file error components not wrapped correctly");
  }

  return myAllData;
};
