import React, { Component } from 'react';
import axios from 'axios';
export default class RecipeForm extends Component {
  constructor(){
    super()
    this.state =  {
      ingredientsList: [],
      id: 0,
      ingredients: []
    }
    this.createRecipe = this.createRecipe.bind(this);
    this.addIngredient = this.addIngredient.bind(this)
  }

  addIngredient = () => {
    let newArray = this.state.ingredientsList;
    let id = this.state.id
    let axiosIngredients = this.state.ingredients
    newArray.push(id);
    id++
    axiosIngredients.push({ingredient:{
      amount: this.refs.amount.value,
      measurement: this.refs.measurement.value,
      item: this.refs.item.value}})
    this.setState({ingredientsList: newArray, ingredient: axiosIngredients, id: id  })
  }

  createRecipe = (event) => {
    event.preventDefault();
      let axiosIngredients = this.state.ingredients
      axiosIngredients.push({
        ingredient:{
        amount: this.refs.amount.value,
        measurement: this.refs.measurement.value,
        item: this.refs.item.value}})
    axios.post('http://localhost:8080/recipes', {recipe: {
      name: this.refs.name.value,
      dish_type: this.refs.dish_type.value,
      difficulty: this.refs.difficulty.value,
      directions: this.refs.directions.value,
      preptime: this.refs.preptime.value,
      user: {}
    }, ingredients: axiosIngredients, user: sessionStorage.userId})
      .then((response) =>{
        if (response.status === 200) {
          this.props.history.push('/recipes');
          }
        }
      )
    }
  render() {
    return (
      <section id="recipe-box">
        <p id="recipe-box-title">Make a new recipe-form</p>
        <form id="recipe-form" onSubmit={this.createRecipe}>
          <label> Name:
            <input ref="name" type="text" />
          </label>
          <br/>
          <label> Dish Type:
            <select ref="dish_type" name="DishType">
              <option value="appetizer">Appetizer</option>
              <option value="salad">Salad</option>
              <option value="main course">Main Course</option>
              <option value="desserts">Desserts</option>
            </select>
          </label>
          <br/>
          <label> Difficulty:
            <select ref="difficulty" name="rec">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <br/>
          <label> Directions:
            <textarea ref="directions" id="new-recipe" cols="30" rows="5" maxLength="140" name="recipe"></textarea>
          </label>
          <br/>
          <label> Preparation Time:
            <input ref="preptime" type="text"/>
          </label>
          <br/>
          <div>
              <label>Ingredient:
                <br/>
                <label>Amount:
                    <input ref="amount" type="text"/>
                </label>
                <label>Measurement:
                  <input ref="measurement" type="text"/>
                </label>
                <label>Item:
                  <input ref="item" type="text"/>
                </label>
              </label>
            </div>
          <button type="button" onClick={this.addIngredient}>Add More Ingredients</button>
        <br/>
            {this.state.ingredientsList.map( (id, i) => {
              return (
                <div key={i}>
                  <label>Ingredient:
                    <br/>
                    <label>Amount:
                        <input ref="amount" type="text"/>
                    </label>
                    <label>Measurement:
                      <input ref="measurement" type="text"/>
                    </label>
                    <label>Item:
                      <input ref="item" type="text"/>
                    </label>
                  </label>
                </div>)
            })}

          <label>
            <input type="submit" value="Make a new recipe"/>
          </label>
        </form>
      </section>
    );
  }
}
 class IngredientInput extends Component {
  render() {
    return (
      <div>
        <label>Ingredient:
          <br/>
          <label>Amount:
              <input ref="amount" type="text"/>
          </label>
          <label>Measurement:
            <input ref="measurement" type="text"/>
          </label>
          <label>Item:
            <input ref="item" type="text"/>
          </label>
        </label>
      </div>
      );
    }
  }