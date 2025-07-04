
type ROLES = 'ANON' | 'AUTH' | 'ADMIN'

interface AppPhoneWX {
    countryCode: string | number,
    phoneNumber: string,
    purePhoneNumber: string
}

interface AppAuth {
    phonedata: AppPhoneWX
    jwt: string
    user: User
}