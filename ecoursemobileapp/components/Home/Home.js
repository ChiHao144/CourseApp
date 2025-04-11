import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useEffect, useState } from "react";
import { ActivityIndicator, Chip, List, Searchbar } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [q, SetQ] = useState();
    const [cateId, setCateId] = useState(null);

    const loadCates = async () => {
        let res = await Apis.get(endpoints['categories']);
        setCategories(res.data);
    };

    const loadCourses = async () => {
        if (page > 0) {
            try {
                setLoading(true);

                let url = `${endpoints['courses']}?page=${page}`;

                if (q) {
                    url = `${url}&q=${q}`;
                }

                if (cateId) {
                    url = `${url}&category_id=${cateId}`;
                }

                let res = await Apis.get(url);
                setCourses(...courses, ...res.data.results);

                if (res.next === null)
                    setPage(0);
            } catch {
                // Handle error here if needed
            } finally {
                setLoading(false);
            }
        };
    }

    useEffect(() => {
        loadCates();
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => {
            loadCourses();
        }, 500);
        return () => clearTimeout(timer);
    }, [q, page, cateId]);

    const loadMore = () => {
        if (!loading && page > 0)
            setPage(page + 1)
    }

    return (
        <SafeAreaView style={[MyStyles.container, MyStyles.p]}>
            <Text style={MyStyles.subject}>DANH SÁCH KHÓA HỌC</Text>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                <TouchableOpacity onPress={() => setCateId(null)}>
                    <Chip icon="label" style={MyStyles.m}>Tất cả</Chip>
                </TouchableOpacity>
                {categories.map(c => (
                    <TouchableOpacity key={c.id} onPress={() => setCateId(c.id)}>
                        <Chip icon="label" style={MyStyles.m}>
                            {c.name}
                        </Chip>
                    </TouchableOpacity>
                ))}
            </View>

            <Searchbar
                placeholder="Search"
                onChangeText={SetQ}
                value={q}
            />

            <FlatList onEndReached={loadMore}
                ListFooterComponent={loading && <ActivityIndicator size={30} />}
                data={courses}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.subject}
                        description={item.created_date}
                        left={() => (
                            <Image style={MyStyles.avatar} source={{ uri: item.image }} />
                        )}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Home;
