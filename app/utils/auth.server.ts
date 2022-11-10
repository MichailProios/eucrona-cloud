import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

import { createCookie, redirect, json } from "@remix-run/node";

import { createArcTableSessionStorage } from "@remix-run/architect";

const userPoolId = process.env.COGNITO_USERPOOL_ID;
const clientId = process.env.COGNITO_CLIENT_ID;
const sessionSecret = process.env.COGNITO_SESSION_SECRET;

if (!sessionSecret || !userPoolId || !clientId) {
  throw new Error("Env missing configuration");
}

const poolData = {
  UserPoolId: `${userPoolId}`,
  ClientId: `${clientId}`,
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData);

const sessionCookie = createCookie("__session", {
  secrets: [sessionSecret],
  httpOnly: true,
  sameSite: true,
  secure: process.env.NODE_ENV === "production",
});

export const { getSession, commitSession, destroySession } =
  createArcTableSessionStorage({
    table: "sessions",
    idx: "_idx",
    ttl: "_ttl",
    cookie: sessionCookie,
  });

export async function isAuthenticated(request: Request) {
  const currentSession = await getSession(request.headers.get("Cookie"));

  return currentSession.has("UserId") ? true : false;
}

export async function protectedRoute(request: Request) {
  const currentSession = await getSession(request.headers.get("Cookie"));

  return currentSession.has("UserId") ? currentSession : redirect("/login");
}

export async function unprotectedRoute(request: Request) {
  const currentSession = await getSession(request.headers.get("Cookie"));

  return currentSession.has("UserId") ? redirect("/") : false;
}

function getCognitoUser(username: string) {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return cognitoUser;
}

export async function signUp(username: string, name: string, password: string) {
  return new Promise(function (resolve, reject) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: username,
      }),
      new CognitoUserAttribute({
        Name: "name",
        Value: name,
      }),
    ];

    userPool.signUp(username, password, attributeList, [], function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function signIn(
  request: any,
  username: string,
  password: string,
  remember: boolean
) {
  return new Promise(async function (resolve, reject) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const currentUser = getCognitoUser(username);

    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: async function (res: any) {
        const session = await getSession(request.headers.get("Cookie"));
        session.set("UserId", res.idToken);

        resolve(
          json(
            { status: "Authenticated" },
            {
              headers: {
                "Set-Cookie": await commitSession(session, {
                  maxAge: remember
                    ? 60 * 60 * 24 * 7 // 7 days
                    : undefined,
                }),
              },
            }
          )
        );
      },
      onFailure: function (err: any) {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export async function verifyAccount(username: string, code: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function sendCode(username: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.forgotPassword({
      onSuccess: function (res) {
        resolve(res);
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export async function forgotPassword(
  username: string,
  code: string,
  password: string
) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.confirmPassword(code, password, {
      onSuccess: function () {
        resolve("password updated");
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
}

export async function signOut(request: any) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

// export async function getAttributes() {
//   return new Promise(function (resolve, reject) {
//     currentUser.getUserAttributes(function (err: any, attributes: any) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(attributes);
//       }
//     });
//   }).catch((err) => {
//     throw err;
//   });
// }

// export async function setAttribute(attribute: any) {
//   return new Promise(function (resolve, reject) {
//     const attributeList = [];
//     const res = new CognitoUserAttribute(attribute);
//     attributeList.push(res);

//     currentUser.updateAttributes(attributeList, (err: any, res: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(res);
//       }
//     });
//   }).catch((err) => {
//     throw err;
//   });
// }
