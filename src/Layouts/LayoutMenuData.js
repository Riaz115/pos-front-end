import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseRiazHook } from "../RiazStore/RiazStore";

const Navdata = () => {
  const history = useNavigate();
  //this is for getting data from my hook
  const { counterId, restId } = UseRiazHook();

  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [owner, setOwner] = useState(false);
  const [show, setShow] = useState(false);

  //Calender
  const [isCalender, setCalender] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },

    {
      id: "User",
      label: "User",
      icon: "lar la-user-circle ",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setEmail(!isEmail);
        setIscurrentState("Email");
        updateIconSidebar(e);
      },
      stateVariables: isEmail,
      subItems: [
        {
          id: "users",
          label: "Start Restaurent Day",
          link: `/restaurent/${restId}/start/day`,
          parentId: "User",
        },
        {
          id: "users",
          label: "Close Restaurent Day",
          link: `/restaurent/${restId}/close/day`,
          parentId: "User",
        },
        {
          id: "users",
          label: "Account Head",
          link: `/restaurent/${restId}/create/new/account/head`,
          parentId: "User",
        },
        {
          id: "users",
          label: "Account Name",
          link: `/restaurent/${restId}/new/name/account`,
          parentId: "User",
        },
        {
          id: "setting",
          label: "Rest Settings",
          link: "/add-restaurent",
          parentId: "User",
        },
        {
          id: "all-rests",
          label: "All Resturents",
          link: "/all-restaurents",
          parentId: "User",
        },

        {
          id: "Cashier",
          label: "Cashier",
          link: "/area/tables/testing",
          parentId: "User",
        },
      ],
    },

    {
      id: "authentication",
      label: "Authentication",
      icon: "lar la-user-circle",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAuth(!isAuth);
        setIscurrentState("Auth");
        updateIconSidebar(e);
      },
      stateVariables: isAuth,
      subItems: [
        {
          id: "signIn",
          label: "Login",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsSignIn(!isSignIn);
          },
          parentId: "authentication",
          stateVariables: isSignIn,
          childItems: [{ id: 1, label: "Login", link: "/auth-signin-basic" }],
        },
        {
          id: "signUp",
          label: "Sign Up",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsSignUp(!isSignUp);
          },
          parentId: "authentication",
          stateVariables: isSignUp,
          childItems: [{ id: 2, label: "Sign up", link: "/auth-signup-cover" }],
        },
      ],
    },

    {
      id: "dashboard",
      label: "Dashboards",
      icon: "las la-tachometer-alt",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "dashboard",
          label: "dashboard",
          link: "/my-dashboard",
          parentId: "dashboard",
        },
        {
          id: "dashboard",
          label: "CounterAreas",
          link: `/counter/${counterId}/counterareas`,
          parentId: "dashboard",
        },
      ],
    },

    {
      label: "Items",
      isHeader: true,
    },

    {
      id: "items",
      label: "items",
      icon: "las la-pager",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },
      stateVariables: isPages,
      subItems: [
        {
          id: "All Catagories",
          label: "All Catagories",
          link: `/all-catagories/${restId}`,
          parentId: "items",
        },
        {
          id: "All Catagories",
          label: "All Deals",
          link: `/all-deals/${restId}`,
          parentId: "items",
        },
        {
          id: "All Items",
          label: "All Menu Items",
          link: `/items/${restId}`,
          parentId: "items",
          stateVariables: isProfile,
        },
      ],
    },
    {
      id: "kots",
      label: "KOTs",
      icon: "ri-rocket-line",
      link: "/#",
      stateVariables: isLanding,
      click: function (e) {
        e.preventDefault();
        setIsLanding(!isLanding);
        setIscurrentState("Landing");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "kot",
          label: "KOT",
          link: "/restaurent/kots",
          parentId: "kots",
        },
        {
          id: "manage-kot",
          label: "Manage Kot",
          link: "/restuarent/manage/kot",
          parentId: "kots",
        },
      ],
    },

    {
      id: "KDS",
      label: "KDS",
      icon: "ri-stack-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAdvanceUi(!isAdvanceUi);
        setIscurrentState("AdvanceUi");
        updateIconSidebar(e);
      },
      stateVariables: isAdvanceUi,
      subItems: [
        {
          id: "KDS",
          label: "Restaurent KDS",
          link: "/for-kds/for/allrestaurent",
          parentId: "KDS",
        },
      ],
    },

    {
      label: "Invoice",
      isHeader: true,
    },
    {
      id: "invoice",
      label: "Invoice",
      icon: "las la-pencil-ruler",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsBaseUi(!isBaseUi);
        setIscurrentState("BaseUi");
        updateIconSidebar(e);
      },
      stateVariables: isBaseUi,
      subItems: [
        {
          id: "invoice",
          label: "Invoice",
          link: "/restaurent/invoice",
          parentId: "invoice",
        },
        {
          id: "edit-invoice",
          label: "Edit Invoice",
          link: "/restaurent/settlements",
          parentId: "invoice",
        },
      ],
    },
    {
      id: "Counter",
      label: "Counter",
      icon: "las la-briefcase",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAdvanceUi(!isAdvanceUi);
        setIscurrentState("AdvanceUi");
        updateIconSidebar(e);
      },
      stateVariables: isAdvanceUi,
      subItems: [
        {
          id: "Counter-Sale",
          label: "Counter-Sale",
          link: `/counter/${counterId}/dashboard`,
          parentId: "Counter",
        },
        {
          id: "Settlements",
          label: "Settlements",
          link: "/restaurent/counter/settlements",
          parentId: "Counter",
        },
      ],
    },
    {
      id: "books",
      label: "Books",
      icon: "ri-pencil-ruler-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMaps(!isMaps);
        setIscurrentState("Maps");
        updateIconSidebar(e);
      },
      stateVariables: isMaps,
      subItems: [
        {
          id: "Cash Book",
          label: "Cash Book",
          link: `/restaurent/${restId}/cash-book`,
          parentId: "books",
        },
        {
          id: "Credit Book",
          label: "Credit Book",
          link: `/restaurent/${restId}/credit-book`,
          parentId: "books",
        },
      ],
    },

    {
      id: "guest",
      label: "guest",
      icon: "ri-compasses-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsIcons(!isIcons);
        setIscurrentState("Icons");
        updateIconSidebar(e);
      },
      stateVariables: isIcons,
      subItems: [
        {
          id: "guest",
          label: "guest",
          link: `/guest/${restId}`,
          parentId: "guest",
        },
      ],
    },

    {
      id: "reports",
      label: "Reports",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMultiLevel(!isMultiLevel);
        setIscurrentState("MuliLevel");
        updateIconSidebar(e);
      },
      stateVariables: isMultiLevel,
      subItems: [
        {
          id: "Collection Report",
          label: "Collection Report",
          link: "/collection-report",
          parentId: "reports",
        },
        {
          id: "Counter with collection report",
          label: "Counter with collection report",
          link: "/#",
          parentId: "reports",
        },
        {
          id: "item wise sale report",
          label: "item wise sale report",
          link: "/#",
          parentId: "reports",
        },
        {
          id: "table wise sale report",
          label: "table wise sale report",
          link: "/#",
          parentId: "reports",
        },
        {
          id: "date wise sale report",
          label: "date wise sale report",
          link: "/#",
          parentId: "reports",
        },
        {
          id: "top selling items",
          label: "top selling items",
          link: "/#",
          parentId: "reports",
        },
        {
          id: "total customer report",
          label: "total customer report",
          link: "/#",
          parentId: "reports",
        },
        {
          id: "table wise customer report",
          label: "table wise customer report",
          link: "/#",
          parentId: "reports",
        },
      ],
    },
    {
      id: "Settings",
      label: "Settings",
      icon: "mdi mdi-cog-outline ",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMaps(!isMaps);
        setIscurrentState("Maps");
        updateIconSidebar(e);
      },
      stateVariables: isMaps,
      subItems: [
        {
          id: "Roles",
          label: "All Roles",
          link: "/roles",
          parentId: "maps",
        },
        {
          id: "Permissions",
          label: "All Permissions",
          link: "/permissions",
          parentId: "maps",
        },
      ],
    },
    {
      id: "owner",
      label: "Owner Data",
      icon: "fa-regular fa-head-side-virus",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsCharts(!isCharts);
        setIscurrentState("Charts");
        updateIconSidebar(e);
      },
      stateVariables: isCharts,
      subItems: [
        {
          id: "myusers",
          label: "My All Users",
          link: "/for-owner",
          parentId: "charts",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
