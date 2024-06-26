import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";
import { Food } from "../types";
import { Any } from "../types/all";

export class Service {
  private client = new Client();
  private databases;
  private bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createBookedItemsWithUser(
    bookedBy: string,
    phoneNumber: string,
    isPaid: boolean,
    itemsA: Food[],
    totalPrice: number,
    id: string,
    updatedBy: string,
    location: string,
    locationUrl: string
  ) {
    try {
      const items = JSON.stringify(itemsA);
      const document = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookedUserCollectionId,
        ID.unique(),
        {
          bookedBy,
          phoneNumber,
          isPaid,
          items,
          totalPrice,
          id,
          updatedBy,
          location,
          locationUrl,
        }
      );
      console.log(document);
      return document;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Cannot booked");
    }
  }

  async updateBookedItemsByAdmin(
    updatedBy: string,
    done: boolean,
    id: string,
    isPaid = true
  ) {
    try {
      console.log("Database ID:", conf.appwriteDatabaseId);
      console.log("Collection ID:", conf.appwriteBookedUserCollectionId);
      console.log("Document ID:", id);
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookedUserCollectionId,
        id,
        {
          updatedBy,
          done,
          isPaid,
        }
      );
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Cannot booked");
    }
  }

  async cancleBookedItemsByAdmin(
    updatedBy: string,
    isOrderCancel: boolean,
    id: string
  ) {
    try {
      console.log("Database ID:", conf.appwriteDatabaseId);
      console.log("Collection ID:", conf.appwriteBookedUserCollectionId);
      console.log("Document ID:", id);
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookedUserCollectionId,
        id,
        {
          updatedBy,
          isOrderCancel,
        }
      );
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Cannot booked");
    }
  }

  async getBookedItems(
    limit = 5,
    offset = 0,
    queries = [
      Query.equal("done", false),
      Query.equal("isOrderCancel", false),
      Query.limit(limit),
      Query.offset(offset),
    ]
  ) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookedUserCollectionId,
        queries
      );
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Error while getting items"
      );
      return false;
    }
  }

  async getBookedItemsWhihcAreCancled(
    limit = 5,
    offset = 0,
    queries = [
      Query.equal("isOrderCancel", true),
      Query.equal("done", false),
      Query.limit(limit),
      Query.offset(offset),
    ]
  ) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookedUserCollectionId,
        queries
      );
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Error while getting items"
      );
      return false;
    }
  }

  async getBookedItemsWhihcAreSuccess(
    limit = 5,
    offset = 0,
    queries = [
      Query.equal("done", true),
      Query.limit(limit),
      Query.offset(offset),
    ]
  ) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookedUserCollectionId,
        queries
      );
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Error while getting items"
      );
      return false;
    }
  }

  async saveReviews(data: Any) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteReviewsId,
        ID.unique(),
        data
      );
    } catch (error) {
      return false;
    }
  }

  async getReview() {
    try {
      const page1 = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteReviewsId,
        [Query.limit(5)]
      );
      if (!page1 || !page1.documents)
        throw new Error("Error while fetching the reviews");
      return [page1, page1.documents[page1.documents.length - 1].$id];
    } catch (error) {
      throw new Error(
        "Cannot fetch the review because of some internal issue it may be internet or server"
      );
    }
  }
  async getReviews(lastId: string) {
    try {
      const page2 = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteReviewsId,
        [Query.limit(5), Query.cursorAfter(lastId)]
      );
      if (!page2 || !page2.documents)
        throw new Error("Error while fetching the reviews");
      return [page2.documents, page2.documents[page2.documents.length - 1].$id];
    } catch (error) {
      throw new Error(
        "Cannot fetch the review because of some internal issue it may be internet or server"
      );
    }
  }

  async getBookedItemsWhichIsJustReceiving(
    id: string,
    queries = [
      Query.equal("done", false),
      Query.equal("isOrderCancel", false),
      Query.equal("$id", id),
    ]
  ) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookedUserCollectionId,
        queries
      );
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Error while getting items"
      );
      return false;
    }
  }

  //   file upload services
}

const service = new Service();
export default service;
