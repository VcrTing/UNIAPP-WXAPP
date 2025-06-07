
namespace Form {
    
    interface UploadImage {
        path: string
        file: File
        link: string
        data: ONE
        __iive: boolean
    }

    type UploadImages = UploadImage[]
}