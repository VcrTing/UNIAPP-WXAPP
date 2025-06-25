import { authGetters } from "@/memory/global";
import fioat from "../../util/fioat";
import { is_nice_one, ser_fiot } from "../../util/valued"

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit = 'km') {
    const R = {
        km: 6371,
        mi: 3958.8, // 英里
        nm: 3440.1  // 海里
    }[unit] || 6371; // 默认单位：公里

    const φ1 = lat1 * Math.PI / 180; // φ, λ 是弧度
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

const __nice_addr = (one: ONE): boolean => {
    let lon1 = ser_fiot(one['longitude'], -1)
    let lat1 = ser_fiot(one['latitude'], -1)
    if (lon1 != -1 && lat1 != -1) {
        return true
    }
    return false
}

const cpu_km = (one: ONE, two: ONE) => {
    if (is_nice_one(one) && is_nice_one(two)) {
        if (__nice_addr(one) && __nice_addr(two)) {
            let lon1 = ser_fiot(one['longitude'])
            let lat1 = ser_fiot(one['latitude'])

            let lon2 = ser_fiot(two['longitude'])
            let lat2 = ser_fiot(two['latitude'])

            const __km = calculateDistance(lat1, lon1, lat2, lon2)
            if (__km < 0.01) {
                return '附近'
            }
            return fioat.numberFixed(__km) + ' km'
        }
        else {
            return '无效定位'
        }
    }
    return '未知'
}

const cpu_km_for_user = (one: ONE) => {
    const ud: UserAddress | null = authGetters.addr
    if (ud) {
        if (__nice_addr(one)) {
            return cpu_km(one, ud)
        }
        else {
            return '无定位'
        }
    }
    else {
        return '无权定位'
    }
}

const fii_to_form = (form: ONE, addr: Address) => {
    form.longitude = addr.longitude
    form.latitude = addr.latitude
    form.address = addr.address
    form.city = addr.city 
    form.area = addr.area
    form.addrdata = addr
}

export default {
    cpu_km,
    cpu_km_for_user,

    fii_to_form
}