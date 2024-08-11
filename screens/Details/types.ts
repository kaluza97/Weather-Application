import { RouteProp } from "@react-navigation/native";
import { WeatherDataInterface } from "../../components/WeatherSearchForm/types";

export type RootStackParamList = {
    weatherData: WeatherDataInterface;
};

export interface Props {
    route: any;
}

