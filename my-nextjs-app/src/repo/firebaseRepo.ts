import {auth} from '@/lib/firebase/client'
import { FirebaseInterface } from '@/types/interface/firebaseInterface'
import { FirebaseError } from 'firebase/app'
import { AuthProvider, User, browserLocalPersistence, onAuthStateChanged, setPersistence, signInWithPopup } from 'firebase/auth'


export class FirebaseRepository implements FirebaseInterface {
    private static instance: FirebaseRepository | null = null

    /**
     * 現在ログインしているユーザーを取得します
     * @returns User | null
     */
    public getCurrentUser = async (): Promise<User | null> => {
        try {
            return new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    resolve(user)
                    unsubscribe() // リスナーの登録解除
                })
            })
        } catch (error) {
            console.error('ユーザー取得エラー:', error)
            throw error // エラーを呼び出し元に伝播させる
        }
    }

    /**
     * 現在ログインしているユーザーのUIDを取得します
     * @returns string
     */
    public getUId = async (): Promise<string> => {
        try {
            const user = await this.getCurrentUser()
            if (!user) throw new Error('ユーザーが存在しません')
            return user.uid
        } catch (error) {
            console.error('ユーザーID取得エラー:', error)
            throw error // エラーを呼び出し元に伝播させる
        }
    }


    /**
     * SNSログインを行います
     * @param provider
     * @returns User
     */
    public async SNSSignIn(provider: AuthProvider): Promise<User> {
        try {
            const result = await setPersistence(auth, browserLocalPersistence).then(
                async () => {
                    // 以降の認証が指定した永続性で行われる
                    const result = await signInWithPopup(auth, provider)

                    return result.user
                },
            )
            return result
        } catch (error) {
            console.error('ログインエラー:', error)
            throw error // エラーを呼び出し元に伝播させる
        }
    }


    /**
     * ログアウトします
     */
    public async signOut(): Promise<void> {
        try {
            await auth.signOut()
        } catch (e) {
            if (e instanceof FirebaseError) {
                // console.log(e)
                throw e
            }
        }
    }

    /**
     * アカウントを削除します
     */
    public async deleteUser(): Promise<void> {
        try {
            const user = await this.getCurrentUser()
            if (!user) throw new Error('ユーザーが存在しません')
            await user.delete()
        } catch (e) {
            if (e instanceof FirebaseError) {
                // console.log(e)
                throw e
            }
        }
    }
}