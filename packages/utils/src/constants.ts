export const APP_NAME = "MonoRepo App";

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
  },
  INTERNAL: {
    DASHBOARD: "/dashboard",
    USERS: "/users",
    SETTINGS: "/settings",
  },
  EXTERNAL: {
    HOME: "/",
    PROFILE: "/profile",
    SETTINGS: "/settings",
  },
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
