import { http, HttpResponse } from "msw";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [
  http.get(`${API_BASE_URL}/user`, () => {
    return HttpResponse.json({
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];
