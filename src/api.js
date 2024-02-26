import { createServer, Model, Response } from "miragejs";
import data from "./data.json";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC42MqadchnTtj5izJHuSOjMNzr-Abg9dw",
  authDomain: "vanlife-webapp.firebaseapp.com",
  projectId: "vanlife-webapp",
  storageBucket: "vanlife-webapp.appspot.com",
  messagingSenderId: "807663985427",
  appId: "1:807663985427:web:7c5d30ea579492ccc530e6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollection = collection(db, "vans");

export default async function getVans() {
  try {
    const vansSnapshot = await getDocs(vansCollection);
    const vansArr = vansSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    localStorage.setItem("vans", JSON.stringify(vansArr));
    return vansArr;
  } catch (error) {
    throw {
      status: " ",
      message:
        "unable to fetch the data, please check your internet connection!",
    };
  }
}

export async function getVan(id) {
  const vansArrInLocalStorage = JSON.parse(localStorage.getItem("vans")) || [];
  const vansArr = vansArrInLocalStorage.length
    ? vansArrInLocalStorage
    : await getVans();
  const selectedVan = vansArr.find((van) => van.id === id);
  return selectedVan;
}

export async function getHostVans(hostID) {
  const q = query(vansCollection, where("hostID", "==", hostID));
  const querySnapshot = await getDocs(q);
  const hostVans = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  localStorage.setItem("hostVans", JSON.stringify(hostVans));

  return hostVans;
}

export async function getHostVan(id) {
  const hostVansInLocalStorage =
    JSON.parse(localStorage.getItem("hostVans")) || [];
  const vansArr = hostVansInLocalStorage.length
    ? JSON.parse(localStorage.getItem("hostVans"))
    : await getHostVans(localStorage.getItem("userID"));

  console.log(vansArr);
  const selectedVan = vansArr.find((van) => van.id === id);
  if (!selectedVan) {
    throw {
      message: "This host doesn't own this particular van",
    };
  }
  return selectedVan;
}

export async function loginUser(user) {
  const q = query(
    collection(db, "users"),
    where("Email", "==", user.Email),
    where("Password", "==", user.Password)
  );
  const querySnapshot = await getDocs(q);
  const userData = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), userID: doc.id };
  });
  if (!userData.length) {
    throw {
      message: "wrong Email or password!",
    };
  }

  return userData[0].userID;
}

/* export async function getHostVans(id) {
      const res = await fetch(`/api/host/vans/${id ? id : ""}`);
    
      if (!res.ok) {
        throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status,
        };
      }
      const data = await res.json();
    
      return data.vans;
    } */

/* export async function loginUser(user) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
} */

/* createServer({
  models: {
    vans: Model,
    user: Model,
  },

  seeds(server) {
    data.map((van) => server.create("van", van));
    server.create("user", {
      id: 123,
      Email: "h055am@outlook.com",
      Password: "123",
    });
    server.create("user", {
      id: 456,
      Email: "1807603@eng.asu.edu.eg",
      Password: "Asu123",
    });
  },

  routes() {
    this.namespace = "api";
    this.logging = false;
    //this.timing = 2000

    this.get("/vans", (schema, request) => {
      // return new Response(400, {}, {error: "Error fetching data"})
      return schema.vans.all();
    });

    this.get("/vans/:id", (schema, request) => {
      const id = request.params.id;
      return schema.vans.find(id);
    });

    this.get("/host/vans", (schema, request) => {
      console.log(schema);
      return schema.vans.where({ hostID: 123 });
    });

    this.get("/host/vans/:id", (schema, request) => {
      // Hard-code the hostId for now
      const id = request.params.id;
      return schema.vans.findBy({ id, hostID: 123 });
    });

    this.post("/login", (schema, request) => {
      const { Email, Password } = JSON.parse(request.requestBody);
      // This is an extremely naive version of authentication. Please don't
      // do this in the real world, and never save raw text passwords
      // in your database 😇
      const foundUser = schema.users.findBy({ Email, Password });
      if (!foundUser) {
        return new Response(401, {}, { message: "wrong email or password" });
      }

      // At the very least, don't send the password back to the client 😅
      foundUser.Password = undefined;
      return {
        user: foundUser,
        token: "Enjoy your pizza, here's your tokens.",
      };
    });
  },
}) */
