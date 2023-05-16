import { axiosReq } from "../api/axiosDefaults";
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // if the profile id is the same as the one just clicked on, the followers count is increased by 1
      {
        ...profile, // spread the profile
        followers_count: profile.followers_count + 1, // and add one to the followers count
        following_id,
      }
    : profile.is_owner // check if the profile in the array we're iterating over is owner by the currently logged in user
    ? { ...profile, following_count: profile.following_count + 1 } // if so, increase that profile's following count by one
    : profile; // return the profile without changing it
};
