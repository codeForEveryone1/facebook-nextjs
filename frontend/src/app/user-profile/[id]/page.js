"use client";
import React, { useEffect, useState, useCallback } from "react";
import ProfileHeader from "../ProfileHeader";
import ProfileTabs from "../ProfileTabs";
import { useParams } from "next/navigation";
import { fetchUserProfile } from "@/service/user.service";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchUserProfile(id);
      setProfileData(result.profile);
      setIsOwner(result.isOwner);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]); // Add 'id' as a dependency to ensure it uses the latest value

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id, fetchProfile]); // Include fetchProfile in the dependency array

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!profileData) {
    return <div>No profile data available.</div>; // Handle case when no data is returned
  }

  return (
    <div>
      <ProfileHeader
        profileData={profileData}
        setProfileData={setProfileData}
        isOwner={isOwner}
        id={id}
        fetchProfile={fetchProfile}
      />
      <ProfileTabs
        profileData={profileData}
        setProfileData={setProfileData}
        isOwner={isOwner}
        id={id}
        fetchProfile={fetchProfile}
      />
    </div>
  );
};

export default Page;
