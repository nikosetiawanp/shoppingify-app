import jwt from "jsonwebtoken";

export const userFromAccessToken = async (
  accessToken: string,
  secret: string
) => {
  try {
    const decodedToken = await jwt.verify(accessToken, secret);
    return decodedToken;
  } catch (error) {
    return undefined;
  }
};

// // Example usage:
// const accessToken = "your-access-token-here";
// const jwtSecret = "your-secret-key";

// const userId = getUserIdFromAccessToken(accessToken, jwtSecret);

// if (userId) {
//   console.log("User ID:", userId);
// } else {
//   console.log("Access token is invalid or has expired.");
// }
