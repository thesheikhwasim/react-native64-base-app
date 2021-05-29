import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ScrollView } from 'react-native';

class MealsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: props.route.params,
            mealItemData: [],
        }
    }

    componentDidMount = () => {
        console.log("Mounted Meals Detail Screen ", this.state.params);
        this.getMealsData(this.state.params.mealId);
    }

    getMealsData(mealId) {
        let mealDetailFiltered = this.props.mealsPropsData.filter(item => item.idMeal == mealId)
        console.log("mealDetailFiltered ", mealDetailFiltered);
        this.setState({
            mealItemData: mealDetailFiltered[0]
        });
    }

    gotoMealDetails = (mealData) => {
        this.props.navigation.navigate('Home', { mealData: mealData });
    }

    render() {
        const { strMeal, strCategory, strInstructions, strMealThumb } = this.state.mealItemData;
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, marginVertical: 5 }}>{strMeal}</Text>
                    <Image
                        style={{ height: 150, width: '100%' }}
                        source={{ uri: strMealThumb }}
                    />
                    <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Category: {strCategory}</Text>
                    <Text>{strInstructions}</Text>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        mealsPropsData: state.userSettings.mealsData,
        isConnected: state.network.isConnected,
    };
};


export default connect(
    mapStateToProps,
    null
)(MealsDetail);