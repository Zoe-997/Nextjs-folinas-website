import moment from "moment";
import { constants } from "./constant";

export const getImageURL = (imageUrl: string) => {
    let imageURL = "";
    if (imageUrl) imageURL = `${constants.API_URL}${imageUrl}`
    return imageURL;
}

export const formatDate = (time: number, format: string) => {
    const date = moment.unix(time).utc();
    return date.format(format);
}

export const formatDateFromDate = (time: string, format?: string) => {
    return moment(time).format(format || 'MM DD. YYYY');
}


export const formatTime = (time: string, format?: string) => {
    return moment(time, "HH:mm:ss.SSS").format(format || 'h:mm a');;
}