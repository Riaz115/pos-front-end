import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const RiazStore = createContext();

export const MyDataProvider = ({ children }) => {
  const [showForGuest, setShowForGuest] = useState(false);
  const [showForEditGuest, setShowForEditGuest] = useState(false);
  const [restData, setRestData] = useState({});
  const [showForGuestAdd, setShowForGuestAdd] = useState(false);
  const [allOwnerUser, setAllOwnerUser] = useState([]);
  const [guestData, setGuestData] = useState({});
  const [forTableData, setForTableData] = useState({});
  const [forTableId, setForTableId] = useState("");
  const [guestId, setGuestId] = useState(localStorage.getItem("guestid"));
  const [restId, setRestId] = useState(localStorage.getItem("restid"));
  const [showBtns, setShowBtns] = useState(false);
  const [persons, setPersons] = useState(localStorage.getItem("person"));
  const [counterAreaId, setCounterAreaId] = useState(
    localStorage.getItem("areaid")
  );
  const [counterId, setCounterId] = useState(localStorage.getItem("counterid"));
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState("");
  const [userImage, setUserImage] = useState("");
  const [allGuests, setAllGuests] = useState([]);
  const [filteredGuest, setFilterGuests] = useState([]);
  const [allHeadAccounts, setAllHeadAccounts] = useState([]);
  const [allAccNames, setAllAccNames] = useState([]);
  const [loading, setLoaing] = useState(false);
  const [dayId, setDayId] = useState(localStorage.getItem("dayid"));
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

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

  //this is for getting restaurent all data
  const forGettingRestAllData = async () => {
    const url = `${myUrl}/getRestDataforEdit/${restId}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRestData(data.myRest);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get rest data function", err);
    }
  };

  //this is for getting all head acccount of the restaurent
  const ForGettingAllHeadAccounts = async () => {
    const url = `${myUrl}/restaurent/${restId}/get/all/head/accounts`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setAllHeadAccounts(data);
      } else {
        console.log("err data", err);
      }
    } catch (err) {
      console.log(
        "there is error in the getting all head account funciton",
        err
      );
    }
  };

  //this is for controll rendering
  useEffect(() => {
    forGettingRestAllData();
  }, [restId]);

  //this is for getting table data
  const forGettingTableData = async () => {
    if (!forTableId) return;
    const url = `${myUrl}/getdata/${forTableId}/table`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setForTableData(data.tableData);
        setGuestData(data?.tableData?.currentOrder?.guest);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log("there is error in the get table data for edit", err);
    }
  };
  //this is for getting table data rendering
  useEffect(() => {
    forGettingTableData();
  }, [forTableId]);

  //this is for getting all guests data
  const forGettingAllGuests = async () => {
    const url = `${myUrl}/forgetall/${restId}/guests`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setAllGuests(data.guests);
        setFilterGuests(data.guests);
      } else {
        console.log("err data", data);
      }
    } catch (err) {
      console.log(
        "there is error in the get all restaurent guest function",
        err
      );
    }
  };

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
        forGettingAllGuests();
        setDeleteModal(false);
        setSuccessModal(true);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log("there is error in the delete guest function", err);
    }
  };

  //this is for controll rendering of all all guest getting data function
  useEffect(() => {
    forGettingAllGuests();
  }, [restId]);

  //this is for getting all cash book all account names
  const forGetAllAcountNames = async () => {
    setLoaing(true);
    const url = `${myUrl}/restaurent/${restId}/get/all/acount/names/cashbook`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setLoaing(false);
        setAllAccNames(data);
      } else {
        console.log("err data", data);
        setLoaing(false);
      }
    } catch (err) {
      console.log(
        "there is error in the getting all account names function",
        err
      );
    }
  };

  useEffect(() => {
    if (showForGuestAdd || showForEditGuest) {
      setShowForGuest(false);
    }
  }, [showForGuestAdd, showForEditGuest]);

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
          showBtns,
          setShowBtns,
          persons,
          setPersons,
          counterAreaId,
          setCounterAreaId,
          restData,
          setRestData,
          guestData,
          setGuestData,
          forTableData,
          setForTableData,
          forTableId,
          setForTableId,
          forGettingTableData,
          counterId,
          setCounterId,
          allGuests,
          setAllGuests,
          forGettingAllGuests,
          filteredGuest,
          setFilterGuests,
          allHeadAccounts,
          ForGettingAllHeadAccounts,
          forGetAllAcountNames,
          allAccNames,
          loading,
          dayId,
          setDayId,
          successModal,
          setSuccessModal,
          deleteModal,
          setDeleteModal,
        }}
      >
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
