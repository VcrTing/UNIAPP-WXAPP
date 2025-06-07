
namespace Conf {
    interface City {
        documentId: string
        name: string
        longitude: number
        latitude: number
    }

    type Citys = City[]

    interface Tab {
        name: string
        v: number
    }

    type Tabs = Tab[]
}