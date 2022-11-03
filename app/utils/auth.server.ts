import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

import { redirect, createCookieSessionStorage } from "@remix-run/node";

const userPoolId = process.env.CONGITO_USERPOOL_ID;
const clientId = process.env.CONGITO_CLIENT_ID;
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret || !userPoolId || !clientId) {
  throw new Error("Env missing configuration");
}

const poolData = {
  UserPoolId: `${userPoolId}`,
  ClientId: `${clientId}`,
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData);

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "EucronaCloud_Session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function isAuthenticated(request: Request) {
  const currentSession = await getSession(request);

  console.log(currentSession.data.UserId);

  if (currentSession.data.UserId) {
    return true;
  } else {
    return redirect("/login");
  }
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

export async function signIn(request: any, username: string, password: string) {
  return new Promise(async function (resolve, reject) {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const currentUser = getCognitoUser(username);

    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: async function (res: any) {
        const session = await getSession(request);
        session.set("UserId", res.idToken);

        resolve(
          redirect("/", {
            headers: {
              "Set-Cookie": await sessionStorage.commitSession(session, {
                maxAge: true
                  ? 60 * 60 * 24 * 7 // 7 days
                  : undefined,
              }),
            },
          })
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
  const session = await getSession(request);

  return redirect("/Login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
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
