
const generate_upload_img = (path: string, file: File, media: ActivityMedia): Form.UploadImage => {
    return {
        path, file, link: media.url, data: media,
        __iive: true
    }
}

const build_activity_plus_data = (origin: ActivityMedia, activityId: string | number): ActivityMedia => {
    return <ActivityMedia>{
        url: origin.url,
        urlSmall: origin.url,
        mediaType: origin.mediaType,
        isGallery: origin.isGallery,
        activity: activityId
    }
}

export default {
    generate_upload_img,
    
    build_activity_plus_data
}