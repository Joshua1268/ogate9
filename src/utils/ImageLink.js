import { getImageDePublicite } from "../services/publicite/PubliciteRequest";

export const returnImageLink = (emplacement, id) => {
    if (emplacement !== null && emplacement !== undefined) {
        return getImageDePublicite(emplacement, id)
    } else {
        return "";
    }
}

export const returnImageLinkMobile = (emplacement, id) => {
    if (emplacement !== null && emplacement !== undefined) {
        return getImageDePublicite(emplacement, id)
    } else {
        return "";
    }
}