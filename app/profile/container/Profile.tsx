"use client";

import { CircularProgress, Grid, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import get from "lodash.get";
import { ProfileStyle } from "./Profile.style";
import ProfileImage from "../assets/images/profile.png";
import CameraIcon from "../assets/images/CameraIcon";
import { Menus } from "../assets/constants/Menus";
import Settings from "../components/settings/Settings";
import { LayoutContext } from "@/layout/context";
import { ProfileContext } from "../context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { IUser } from "@/types/common";
import browserStorage from "@/services/storage/browserStorage";
import Leave from "./../assets/images/Leave";
import Orders from "../components/orders/container/Orders";
import Logout from "../components/Logout/Logout";
import Dashboard from "../components/dashboard/container/Dashboard";
import Order from "../components/Order/container/Order";
import { MAX_ALLOWED_FILE_SIZE } from "./Profile.constants";
import { toast } from "react-hot-toast";
import { ERROR_MESSAGES } from "@/contants/errors";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Loader } from "@/components";
import Image from "next/image";

type TTabStatus = "orders" | "settings" | "dashboard";

const Profile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<TTabStatus>("orders");
  const [open, setOpen] = React.useState<boolean>(false);

  const {
    state: {
      user,
      getProfileState: { getProfileStatus },
    },
    actions: { setUser },
  } = useContext(LayoutContext);

  const {
    state: {
      userUploadImageState: {
        userImageUploadResponse,
        userImageUploadStatus,
        userImageUploadError,
      },
    },
    actions: { userUploadImage, updateUserImage },
  } = useContext(ProfileContext);

  const [mounted, setMounted] = useState(false);

  const tabContent = React.useMemo(() => {
    return {
      orders: <Orders />,
      settings: <Settings />,
      dashboard: <Dashboard />,
    };
  }, []);

  const isLoadingProfile = React.useMemo(
    () => getProfileStatus === REQUEST_STATUS.loading,
    [getProfileStatus]
  );

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const uploadFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    if (get(event, "target.files")?.length > 0) {
      if (get(event, "target.files")[0]?.size > MAX_ALLOWED_FILE_SIZE) {
        toast.error(t(ERROR_MESSAGES["10"]));
        event.target.value = "";
      } else {
        let formData = new FormData();
        formData.append("type", "img");
        formData.append("file", get(event, "target.files")[0]);
        userUploadImage(formData);
      }
    }
  };

  const tabClick = (menuValue: string) => {
    if (menuValue !== "leave") {
      setStatus(menuValue as TTabStatus);
      if (pathname !== "/profile") router.push("/profile");
    } else {
      onOpen();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (userImageUploadStatus === REQUEST_STATUS.success) {
      updateUserImage({ imgUrl: userImageUploadResponse?.data });
      setUser((prev: IUser) => {
        browserStorage.set("user", {
          ...prev,
          imgUrl: get(userImageUploadResponse, "data"),
        });
        return {
          ...prev,
          imgUrl: get(userImageUploadResponse, "data"),
        };
      });
    }
  }, [userImageUploadStatus]);

  if (!mounted || !user) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Logout onClose={onClose} open={open} />
      <ProfileStyle className="mb-5">
        <Grid container columnSpacing={3}>
          <Grid item md={3} xs={12}>
            <Grid container className="card p-4">
              <Grid item md={12} sm={6} xs={12} className="header">
                <div>
                  {isLoadingProfile ? (
                    <>
                      <div className="d-flex justify-content-center">
                        <div className="photos">
                          <Skeleton
                            variant="circular"
                            width="100px"
                            height="100px"
                          />
                        </div>
                      </div>

                      <Skeleton
                        variant="text"
                        className="text-center font-700 mb-2 fullname"
                      />
                      <Skeleton
                        variant="text"
                        className="text-center mb-0 mt-0"
                      />
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-center">
                        <div className="photos">
                          {userImageUploadStatus === REQUEST_STATUS.loading && (
                            <div className="photos-loader">
                              <div className="photos-loader-background" />
                              <CircularProgress />
                            </div>
                          )}

                          <Image
                            src={
                              get(user, "imgUrl")
                                ? process.env.NEXT_PUBLIC_BASE_URL +
                                  get(user, "imgUrl")
                                : ProfileImage
                            }
                            className="profile-img"
                            alt="profile image"
                            // effect="blur"
                          />
                          <label
                            className="upload-content"
                            htmlFor="user-upload"
                          >
                            <div className="camera ">
                              <CameraIcon />
                            </div>
                          </label>
                          <input
                            type="file"
                            id="user-upload"
                            onChange={uploadFileInputChange}
                            accept=".png, .jpg, .jpeg, .pjpeg, .pjp, .svg, .webp"
                          />
                        </div>
                      </div>
                      <h3 className="text-center font-700 mb-2 fullname">
                        {get(user, "lastName") + " " + get(user, "firstName")}
                      </h3>
                      <p className="text-center mb-0 mt-0">
                        {get(user, "phoneNumber")}
                      </p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid xs={12} className="line-warpper">
                <div className="line" />
              </Grid>
              <Grid item md={12} sm={6} xs={12} className="footer">
                {isLoadingProfile ? (
                  <>
                    {Menus.map((menu) => (
                      <Skeleton
                        key={"profile-menu-skeleton" + menu.value}
                        className="list-item"
                        variant="text"
                      />
                    ))}
                  </>
                ) : (
                  Menus.map((menu) => {
                    return (
                      <div
                        className={`list-item d-flex align-items-center ${
                          status === menu.value ? "list-item-active" : ""
                        }`}
                        onClick={() => tabClick(menu.value)}
                        key={menu.value}
                      >
                        <div>{menu.image}</div>
                        <span>{t(`${menu.name}`)}</span>
                      </div>
                    );
                  })
                )}

                <hr className="my-3 line" />
                {isLoadingProfile ? (
                  <Skeleton className="list-item" variant="text" />
                ) : (
                  <div
                    className={`list-item d-flex align-items-center  leave`}
                    onClick={onOpen}
                  >
                    <div>
                      <Leave className="fill" />
                    </div>
                    <span>{t("PROFILE.LOG_OUT")}</span>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={9} xs={12}>
            <div className="tab-content">
              {pathname.includes("/order/") && id ? (
                <Order />
              ) : (
                <React.Suspense fallback={<></>}>
                  {tabContent[status]}
                </React.Suspense>
              )}
            </div>
          </Grid>
        </Grid>
      </ProfileStyle>
    </div>
  );
};

export default Profile;
