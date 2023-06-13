import { rest } from "msw";

const baseURL = "http://127.0.0.1:8000/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 2,
        username: "emily",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 2,
        profile_image:
          "https://res.cloudinary.com/djlm3llv5/image/upload/v1/media/images/pexels-tommaso-picone-10554019_1_ijri3q",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
