import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);
export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) => {
            return profile.id === clickedProfile.id
              ? // if the profile id is the same as the one just clicked on, the followers count is increased by 1
                {
                  ...profile, // spread the profile
                  followers_count: profile.followers_count + 1, // and add one to the followers count
                  following_id: data.id, // and set the following_id to data.id
                }
              : profile.is_owner // check if the profile in the array we're iterating over is owner by the currently logged in user
              ? { ...profile, following_count: profile.following_count + 1 } // if so, increase that profile's following count by one
              : profile; // return the profile without changing it
          }),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) => {
            return profile.id === clickedProfile.id
              ? // if the profile id is the same as the one just clicked on, the followers count is increased by 1
                {
                  ...profile, // spread the profile
                  followers_count: profile.followers_count + 1, // and add one to the followers count
                  following_id: data.id, // and set the following_id to data.id
                }
              : profile.is_owner // check if the profile in the array we're iterating over is owner by the currently logged in user
              ? { ...profile, following_count: profile.following_count + 1 } // if so, increase that profile's following count by one
              : profile; // return the profile without changing it
          }),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData, handleFollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
