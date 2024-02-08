import { FirebaseRepository } from '@/repo/firebaseRepo'
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'

export class SignupService {
  // 依存性注入を使用してFirebaseRepositoryのインスタンスを注入
  //↓の右側のFirebaseRepositoryはFirebaseRepoと同じ型ならおk！っていうのを指定してる
  constructor(private firebaseRepository: FirebaseRepository) {}

  public authGoogle = async () => {
    try {
      const user = await this.firebaseRepository.SNSSignIn(
        new GoogleAuthProvider(),
      )
      // 成功した場合、userオブジェクトを返す
      return user;
    } catch (error: unknown) {
      // エラーが発生した場合、そのままエラーを投げる
      throw error;
    }
  }

  public signOut = async () => {
    try {
      await this.firebaseRepository.signOut();
    } catch (error: unknown) {
      throw error;
    }
  }
}
