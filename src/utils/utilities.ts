import { Dayjs } from "dayjs";

const getHostName = () => {
    return `localhost:5173`;
}

const convertDateTimeString = (dayjsObject: Dayjs | null, dataFormat:string ): string =>{
    return dayjsObject ? dayjsObject.format(dataFormat) : "";
} 

export { getHostName, convertDateTimeString };
