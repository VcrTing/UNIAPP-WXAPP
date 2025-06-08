
namespace Form {
    
    interface UploadImage {
        path: string
        file: File | null
        link: string
        data: ONE
        __iive: boolean
    }

    type UploadImages = UploadImage[]
}