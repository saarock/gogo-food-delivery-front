import { Account, Client } from "appwrite";
import conf from "../conf/conf";

class AppWriteService {
  private client = new Client();
  private account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async login(email: string, password: string) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown error while login from the appwrite"
      );
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown error while getting current user from the appwrite"
      );
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown error while logout user from appwrite service"
      );
    }
  }
}

const appWriteService = new AppWriteService();
export default appWriteService;
