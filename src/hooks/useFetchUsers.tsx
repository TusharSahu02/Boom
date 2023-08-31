import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { getDocs, query, where } from "firebase/firestore";
import { userRef } from "../utils/FirebaseConfig";
import { Usertype } from "../utils/Types";

function useFetchUsers() {
  const [users, setUsers] = useState<Array<Usertype>>([]);
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getUsers = async () => {
        const firestoreQuery = query(userRef, where("uid", "!=", uid));
        const data = await getDocs(firestoreQuery);
        const firebaseUsers:Array<Usertype> = [];
        data.forEach((user) => {
          const userData = user.data() as Usertype;
          firebaseUsers.push({ ...userData, label: userData.name });
        });
        setUsers(firebaseUsers);
      };
      getUsers();
    }
  }, [uid]);
  return [users];
}

export default useFetchUsers;
