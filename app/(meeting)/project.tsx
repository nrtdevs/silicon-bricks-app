import CustomHeader from "@/components/CustomHeader";
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomCard from "@/components/master/CustomCard";
import NoDataFound from "@/components/NoDataFound";
import { ThemedView } from "@/components/ThemedView";
import { Env } from "@/constants/ApiEndpoints";
import { Colors } from "@/constants/Colors";
import { labels } from "@/constants/Labels";
import { useUserContext } from "@/context/RoleContext";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedProjectsDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, View } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
const [projectList, setProjectList] = useState<ProjectData[]>([]);

interface ProjectData {
    id: number;
    name: string;
    description: string;
    status: string;
}

const ProjectScreen = () => {
    const { theme } = useTheme();
    const [search, setSearch] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [getProjects, { data, refetch, loading }] = useLazyQuery<any>(
        PaginatedProjectsDocument
    );
    const { can } = useUserContext();
    const deletePermission = can("MasterApp:Project:Delete");
    const updatePermission = can("MasterApp:Project:Update");
    const createPermission = can("MasterApp:Project:Create");
    const statusUpdatePermission = can("MasterApp:Project:Action");

    const renderItem = ({ item, index }: any) => {
        return (
            <CustomCard
                name={item?.name}
                status={item?.status}
                description={item?.description}
                editPermission={updatePermission}
                deletePermission={deletePermission}
                statusPermission={statusUpdatePermission}
                onEdit={() => {
                    // setCurrentProject({
                    //     id: String(item.id),
                    //     project_name: item?.name,
                    //     description: item?.description,
                    // });
                    // setModalVisible(true);
                }}
                onDelete={() =>
                    Alert.alert("Delete", "Are you sure you want to delete?", [
                        {
                            text: "Yes",
                            onPress: () => {
                                // deleteProject({
                                //     variables: {
                                //         ids: [Number(item?.id)],
                                //     },
                                // });
                            },
                        },
                        { text: "No", onPress: () => { } },
                    ])
                }
                onChangeStatus={() => {
                    // setProjectId(item.id);
                    // setValue("status", item?.status);
                    // setStatusModalVisible(true);
                }}
            />
        );
    };

    useFocusEffect(
        useCallback(() => {
            fetchProject();
            setSearch(false);
        }, [])
    );

    const debouncedSearch = useCallback(
        debounce((text) => {
            fetchProject(true, text);
        }, 500),
        [searchQuery]
    );


    const fetchProject = async (isRefreshing = false, searchParams = "") => {
        if (loading && !isRefreshing) return;
        const currentPage = isRefreshing ? 1 : page;
        if (isRefreshing) {
            setRefreshing(true);
            setPage(1);
        }
        const params = {
            limit: Env?.LIMIT as number,
            page: currentPage,
            search: searchParams,
        };

        try {
            const res: any = await getProjects({
                variables: {
                    listInputDto: params,
                },
                fetchPolicy: "network-only",
            });

            if (res?.data?.paginatedProjects) {
                const data: any = res?.data?.paginatedProjects;
                const newItems = data?.data || [];

                setProjectList((prev: any) => {
                    return isRefreshing || currentPage == 1
                        ? newItems
                        : [...prev, ...newItems];
                });
                const lastPage = Math.ceil(data?.meta?.totalItems / Env?.LIMIT);
                if (!isRefreshing && currentPage < lastPage) {
                    setPage(currentPage + 1);
                }
                if (isRefreshing) setRefreshing(false);
                setHasMore(currentPage < lastPage);
                setRefreshing(false);
            } else {
                console.log("API call failed or returned no data:", res?.errors);
                setRefreshing(false);
                setHasMore(false);
            }
        } catch (error) {
            console.error("Fetch failed:", error);
            setRefreshing(false);
            setHasMore(false);
        }
    };

    return (
        <CustomHeader
            leftComponent={
                <Pressable
                    onPress={() => {
                        router.back();
                    }}
                    style={{ padding: ms(10) }}
                >
                    <FontAwesome5
                        name="arrow-left"
                        size={22}
                        color={Colors[theme].text}
                    />
                </Pressable>
            }
            title="Project"
            rightComponent={
                <Pressable
                    onPress={() => {
                        setSearch((prev) => !prev);
                    }}
                    style={{ padding: ms(10) }}
                >
                    <FontAwesome5 name="search" size={22} color={Colors[theme].text} />
                </Pressable>
            }
        >
            <ThemedView style={styles.contentContainer}>
                <View>
                    <View style={styles.searchContainer}>
                        {search && (
                            <View style={{ flex: 1 }}>
                                <CustomSearchBar
                                    searchQuery={searchQuery}
                                    onChangeText={(text) => {
                                        setSearchQuery(text);
                                        // debouncedSearch(text);
                                    }}
                                    placeholder={labels?.searchProject}
                                    loading={loading}
                                    onClear={() => {
                                        setSearchQuery("");
                                    }}
                                />
                            </View>
                        )}
                    </View>
                    <View>
                        <FlatList
                            data={projectList}
                            renderItem={({ item, index }: any) => renderItem({ item, index })}
                            showsVerticalScrollIndicator={false}
                            refreshing={refreshing && !loading}
                            onRefresh={() => {
                                fetchProject(true);
                            }}
                            keyExtractor={(item: any, index: number) => index.toString()}
                            contentContainerStyle={{ paddingBottom: vs(180) }}
                            ListEmptyComponent={!loading ? <NoDataFound /> : null}
                            ListFooterComponent={
                                hasMore ? (
                                    <ActivityIndicator size="small" color={Colors.primary} />
                                ) : null
                            }
                            onEndReached={() => {
                                if (hasMore && !loading) {
                                    fetchProject();
                                }
                            }}
                            onEndReachedThreshold={0.5}
                        />
                    </View>
                </View>
            </ThemedView>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    contentContainer: {
        flex: 1,
    },
    searchContainer: {
        marginHorizontal: "12@ms",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12@ms",
    },
});
export default ProjectScreen;