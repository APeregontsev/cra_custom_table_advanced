export function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return action.data;

    case "DELETE_CAR":
      return [...state.filter((item) => item.id !== action.id)];

    case "EDIT_CAR":
      let itemToEdit = state.find((car) => car.id === action.id);

      itemToEdit.availability = action.availability;
      itemToEdit.car_color = action.car_color;
      itemToEdit.price = action.price;

      return [...state];

    case "ADD_CAR":
      let newId = state[state.length - 1].id + 1;

      const newItem = {
        availability: action.availability,
        car: action.car,
        car_color: action.car_color,
        car_model: action.car_model,
        car_model_year: action.car_model_year,
        car_vin: action.car_vin,
        price: action.price,
        id: newId,
      };
      return [...state, newItem];

    default:
      return state;
  }
}
