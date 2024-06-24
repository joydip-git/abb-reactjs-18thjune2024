import { BehaviorSubject } from "rxjs";

export class TokenStorageService {
    private store = new BehaviorSubject<string>('')
    private static instance: TokenStorageService | null = null;
    private constructor() { }

    public storeObservable = this.store.asObservable()
    static instantiate() {
        if (this.instance === null)
            this.instance = new TokenStorageService()

        return this.instance
    }

    saveToken(token: string) {
        this.store.next(token)
    }
    getToken(): string {
        return this.store.getValue()
    }
    isLoggedIn() {
        return this.store.getValue() !== '' ? true : false
    }
    removeToken() {
        this.store.next('')
    }
}
