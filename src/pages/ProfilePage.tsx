import { request } from "http";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByUser } from "../api/postApi";
import { getServicePackageByUser } from "../api/servicePackage";
import { getUserByIdpApi } from "../api/userApi";

import Post from "../components/Post";
import ServicePackage from "../container/servicePackageContainer";
import "../assets/css/ProfilePage.css"




const ProfilePage = () => {
  const { id }: any = useParams();
  const initialUser = {
    username: "",
    urlAvatar: "",
    userType: ""
  }

  const [user, setUser] = useState(initialUser);
  const [posts, setPosts] = useState([]);
  const [servicePackages, setPServicePackages] = useState([]);
  
   useEffect(() => {
     async function fetchData() {
       const response = await getUserByIdpApi(id);
       if (response.data.data) {
         setUser(response.data.data);
       }
     }
     fetchData();

     return () => {
       setUser(initialUser);
     };
   }, []);
  
  useEffect(() => {
    async function fetchData() {
      const response = await getPostByUser(id);
      if (response.data.data) {
        setPosts(response.data.data);
      }
    }
    fetchData();

    return () => {
      setPosts([]);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getServicePackageByUser(id);
      if (response.data.data) {
        setPServicePackages(response.data.data);
      }
    }
    fetchData();
    return () => {
      setPServicePackages([]);
    };
  }, []);


  return (
    <div className="profile-page">
      {!user.userType || user.userType === "" ? (
        <div className="">User not found</div>
      ) : (
        <div className="">
          <h1>ProfilePage</h1>
          <div className="info">
            <h2 className="">name: {user.username}</h2>
            <h2 className="">userType: {user.userType}</h2>
          </div>
          <div>
            {posts &&
              posts.map((post, index) => <Post post={post} key={index} />)}
          </div>
        </div>
      )}
      <h1>package</h1>
      <div>
        {servicePackages &&
          servicePackages.map((servicePackage, index) => (
            <ServicePackage servicePackage={servicePackage} key={index} />
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
