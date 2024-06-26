const conf = {
  appwriteUrl: String(import.meta.env.VITE_REACT_APP_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_REACT_APP_APPWRITE_PROJECT_ID),
  appwriteUserCollectionId: String(
    import.meta.env.VITE_REACT_APP_APPWRITE_USER_ID
  ),
  appwriteBookedUserCollectionId: String(
    import.meta.env.VITE_REACT_APP_APPWRITE_BOOKED_USER_ID
  ),
  appwriteDatabaseId: String(
    import.meta.env.VITE_REACT_APP_APPWRITE_DATABASE_ID
  ),
  appwriteBucketId: String(import.meta.env.VITE_REACT_APP_APPWRITE_BUCKET_ID),
  appwriteReviewsId: String(import.meta.env.VITE_REACT_APP_APPWRITE_REVIEWS_ID),
};

export default conf;
