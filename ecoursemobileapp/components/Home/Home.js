import { Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useEffect, useState } from "react";
import { Chip } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCates = async () => {
        let res = await Apis.get(endpoints['categories'])
        setCategories(res.data);
    }

    useEffect(() => {
        loadCates();
    }, []);

    return (
        <SafeAreaView style={MyStyles.container}>
            <Text style={MyStyles.subject}>DANH SÁCH KHÓA HỌC</Text>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                {categories.map(c => <Chip key={c.id} icon="label" style={MyStyles.m}>{c.name}</Chip>)}
            </View>
        </SafeAreaView>
    );
}

export default Home;