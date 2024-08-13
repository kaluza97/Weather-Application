import { WeatherDataInterface } from "@components/WeatherSearchForm/types";

export interface Props {
    item: WeatherDataInterface;
    onRemove: (id: number) => void;
}