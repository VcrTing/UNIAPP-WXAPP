
export const convert_to_gallery = (src: MANY, src_key: string): EleGallery[] => {

    const res: EleGallery[] = [ ]

    if (src && src.length) return res;

    for (let j= 0; j< src.length; j++ ) {
        const one: ONE = src[ j ]
        const __v = <EleGallery>{ }

        __v['id'] = one['id']
        __v['__show'] = true
        
        __v['src'] = one[src_key]

        res.push(__v)
    }

    return res;
}