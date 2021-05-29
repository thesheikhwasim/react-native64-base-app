import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, TextInput, Image } from 'react-native';
import { setMealsData } from '../../actions/userSettingsAction';
import { styles } from './meals.style';
import * as ServicesAPI from '../../services/services';

class MealsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: props.route.params,
            loading: true,
            mealsListData: [],
            searchInput: ''
        }
    }

    componentDidMount = () => {
        console.log("Mounted Meals List Screen");
        this.getMealsData();
    }

    getMealsData() {
        if (this.props.isConnected) {
            let URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=s`;
            ServicesAPI.getServices(URL).then((data) => {
                console.log("Meals data: ", data);
                if (data && data.meals) {
                    this.setState({
                        mealsListData: data.meals,
                        loading: false,
                        refreshing: false,
                    });
                    this.props.setMealsData(data.meals)
                }
            });
        } else {
            this.setState({
                mealsListData: this.props.mealsPropsData,
                loading: false,
                refreshing: false,
            });
        }
    }

    gotoMealDetails = (mealData) => {
        this.props.navigation.navigate('Meals Detail', { mealId: mealData.idMeal });
    }

    renderItem = ({ item }) => (
        <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f5f5f5', paddingHorizontal: 20, paddingVertical: 15, marginBottom: 10, marginHorizontal: 10, elevation: 5 }}>
            <TouchableOpacity onPress={() => this.gotoMealDetails(item)}>
                <Image
                    style={{ height: 150, width: '100%' }}
                    source={{ uri: item.strMealThumb }}
                />
                <Text style={{ fontSize: 18, marginTop: 10 }}>Meal: {item.strMeal}</Text>
                <Text style={{ fontSize: 10, marginTop: 5 }}>Category: {item.strCategory}</Text>
            </TouchableOpacity>
        </View>
    );

    headerOfMealsList = () => {
        return (
            <View style={{ paddingVertical: 10, marginHorizontal: 10 }}>
                <TextInput
                    style={{ borderWidth: 1 }}
                    onChangeText={(val) => this.searchMealList(val)}
                    value={this.state.searchInput}
                    placeholder={'Enter keyword to search meal'}
                />
                {!this.props.isConnected && <Text style={{ textAlign: 'center' }}>{'You are offline, you can still search in list below!'}</Text>}
                {this.props.isConnected && <Text style={{ textAlign: 'center' }}>{'You can search in list below!'}</Text>}
            </View>
        )
    }

    searchMealList = queryString => {
        console.log("queryString ", queryString);
        const { mealsPropsData } = this.props;
        const formattedQueryString = queryString.toLowerCase();
        const data = mealsPropsData.filter(item => {
            console.log("item.strMeal.toLowerCase().includes(formattedQueryString) ", item.strMeal.toLowerCase().includes(formattedQueryString));
            return item.strMeal.toLowerCase().includes(formattedQueryString);
        });

        console.log("data meals list", this.state.mealsListData);
        this.setState({
            mealsListData: data,
            searchInput: queryString
        })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true, loading: true });
        this.getMealsData();
    }

    render() {
        return (
            <>
                <View>{this.headerOfMealsList()}</View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    data={this.state.mealsListData}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.contentContainer}
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        mealsPropsData: state.userSettings.mealsData,
        isConnected: state.network.isConnected,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMealsData: (mealsParam) => { dispatch(setMealsData(mealsParam)) }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealsList);