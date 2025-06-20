
type ROLES = 'ANON' | 'AUTH' | 'ADMIN'

interface AppPhoneWX {
    countryCode: string,
    phoneNumber: string,
    purePhoneNumber: string
}

interface AppAuth {
    phonedata: AppPhoneWX
    token: string
    user: User
}