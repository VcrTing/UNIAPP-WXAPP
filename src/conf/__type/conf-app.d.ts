
namespace Conf {
    interface City {
        id: number
        name: string
        longitude: number
        latitude: number
    }

    type Citys = City[]

    interface Tab {
        name: string
        v: number
        id?: number
    }

    type Tabs = Tab[]
}