import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTg4MDkyN2M4M2RkZmRlMzFlMWMzYyIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNzE1MzQ5MDE2LCJleHAiOjE3MTU2MDgyMTZ9.5jg3X1qzNKwix4DtOIgPbdBWqFGqmG4YAIzpcmLT980";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
