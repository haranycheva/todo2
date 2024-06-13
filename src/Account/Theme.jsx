import { useDispatch, useSelector } from "react-redux";
import { getThemeColor } from "../redux/selector";
import { switchTheme } from "../redux/ThemeSlice";

export const Theme = () => {
    const themeColor = useSelector(getThemeColor)
    const dispatch = useDispatch()
    return <select value={themeColor} onChange={(e) => {
        dispatch(switchTheme(e.currentTarget.value))
    }}>
        <option value="light">light</option>
        <option value="dark">dark</option>
    </select>
};
