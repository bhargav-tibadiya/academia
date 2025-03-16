
export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    SEND_OTP: "/auth/sendotp",
  },
  USER: {
    GET: "/user",
    GET_BY_ID: "/user/:userId",
    UPDATE: "/user/:userId",
    DELETE: "/user/:userId"
  },
  UPDATE: {
    GET: "/update",
    GET_BY_ID: "/update/:updateId",
    CREATE: "/update",
    UPDATE: "/update/:updateId",
    DELETE: "/update/:updateId"
  },
  INSTITUTE: {
    GET: "/institute",
    GET_BY_ID: "/institute/:instituteId",
    CREATE: "/institute",
    UPDATE: "/institute/:instituteId",
    DELETE: "/institute/:instituteId"
  },
  DEPARTMENT: {
    GET: "/department",
    GET_BY_ID: "/department/:departmentId",
    CREATE: "/department",
    UPDATE: "/department/:departmentId",
    DELETE: "/department/:departmentId"
  },
  CLASS: {
    GET: "/class",
    GET_BY_ID: "/class/:classId",
    CREATE: "/class",
    UPDATE: "/class/:classId",
    DELETE: "/class/:classId"
  }
};