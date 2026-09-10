import { useWindowDimensions } from "react-native";

export default function useResposive(){
    const {Width, height} = useWindowDimensions();
    const esTablet = Width >= 768
    const esHorizontal = Width > height

    return{
        Width, height, esTablet, esHorizontal,
        columnas: esTablet ? 2 : 1,
        ancho:esTablet  ? 320: Math.main(Width*0.72, 300),
        paddingHorizontal: esTablet ? 32 : 16
    }
}