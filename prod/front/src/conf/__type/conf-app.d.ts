
namespace Conf {
    interface City {
        documentId: string
        name: string
        longitude?: number
        latitude?: number
    }

    type Citys = City[]

    interface Tab {
        name: string
        v: number,
        cover?: string,
        clazz?: string,
        desc?: string,
        sub?: string
    }

    type Tabs = Tab[]
}