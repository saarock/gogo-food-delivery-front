export interface User {
    fullName: string,
    phoneNumber: number,
    isActive: boolean,
    email: string,
    joinedDate: string,
}
export interface UserFromAppWrite {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    accessedAt: string;
    email: string;
    emailVerification: boolean;
    labels: string[]; // Assuming labels can be any type of array
    mfa: boolean;
    name: string;
    passwordUpdate: string;
    phone: string;
    phoneVerification: boolean;
    prefs: Record<string, any>; // Assuming prefs can be any type of object
    registration: string;
    status: boolean;
    targets: any[]; // Assuming targets can be any type of array
  }
  


  