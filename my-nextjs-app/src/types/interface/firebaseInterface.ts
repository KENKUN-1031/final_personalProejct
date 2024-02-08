import { AuthProvider, User } from "firebase/auth"

//ここでは型指定してる
export interface FirebaseInterface {
    SNSSignIn: (provider: AuthProvider) => Promise<User>
    getCurrentUser: () => Promise<User | null>
    getUId: () => Promise<string>
    signOut: () => Promise<void>
    deleteUser: () => Promise<void>
}