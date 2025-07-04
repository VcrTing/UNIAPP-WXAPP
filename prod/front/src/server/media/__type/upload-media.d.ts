
namespace Form {
    
    interface UploadImage {
        path: string
        file: File | null
        link: string
        data: ONE | Media
        __iive: boolean
    }

    type UploadImages = UploadImage[]
}