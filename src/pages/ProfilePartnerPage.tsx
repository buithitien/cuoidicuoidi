import React, { useEffect, useState } from "react";
import { getPostByUser } from "../api/postApi";
import { getServicePackageByUser } from "../api/servicePackage";
import CreatePost from "../components/CreatePost";
import CreateServicePackage from "../components/CreateServicePackage";
import Post from "../components/Post";
import ServicePackage from "../container/servicePackageContainer";

interface IProp {
  user: {
    userId: string;
    name: string;
    email: string;
    userType: string;
  };
}
const ProfilePage = (props: IProp) => {
  const { user } = props;

  const [posts, setPosts] = useState([]);
  const [servicePackages, setPServicePackages] = useState([]);
  console.log(servicePackages);
  useEffect(() => {
    async function fetchData() {
      const response = await getPostByUser(user.userId);
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
      const response = await getServicePackageByUser(user.userId);
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
    <div className="profile-container">
      <div className="profile-page">
        <div className="info">
          <h2 className="">name: {user.name}</h2>
          <h2 className="">userType: {user.userType}</h2>
        </div>
        <div>
          <CreatePost />
        </div>

        <div>
          <CreateServicePackage />
          <div>
            {servicePackages &&
              servicePackages.map((servicePackage, index) => (
                <ServicePackage servicePackage={servicePackage} key={index} />
              ))}
          </div>
        </div>
      </div>
      <div>
        {posts && posts.map((post, index) => <Post post={post} key={index} />)}
      </div>
    </div>
  );
};

export default ProfilePage;
