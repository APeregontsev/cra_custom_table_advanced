import "./style.css";
import { useState } from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import SelectBoolean from "../../ui/SelectBoolean/SelectBoolean";

const EditBlock = ({ children, type = "add", modalCancel, currentEntry, dispatch }) => {
  let propsForInput;
  type === "edit" ? (propsForInput = { disabled: true }) : (propsForInput = {});

  const [inputsData, setInputsData] = useState(
    type === "edit"
      ? {
          ...currentEntry,
          price: currentEntry.price.replace("$", ""),
        }
      : {
          availability: "",
          car: "",
          car_color: "",
          car_model: "",
          car_model_year: "",
          car_vin: "",
          id: "",
          price: "",
        }
  );

  const isAllFieldsFilled =
    inputsData.availability !== "" &&
    inputsData.car !== "" &&
    inputsData.car_color !== "" &&
    inputsData.car_model !== "" &&
    inputsData.car_model_year !== "" &&
    inputsData.car_vin !== "" &&
    inputsData.price !== "";

  function saveBtnHandler() {
    if (!isAllFieldsFilled) return;

    if (type === "add") {
      dispatch({
        type: "ADD_CAR",
        availability: inputsData.availability,
        car: inputsData.car,
        car_color: inputsData.car_color,
        car_model: inputsData.car_model,
        car_model_year: inputsData.car_model_year,
        car_vin: inputsData.car_vin,
        price: "$" + inputsData.price,
      });

      modalCancel(false);
    }

    if (type === "edit") {
      dispatch({
        type: "EDIT_CAR",
        id: inputsData.id,
        availability: inputsData.availability,
        car_color: inputsData.car_color,
        price: "$" + inputsData.price,
      });

      modalCancel(false);
    }
  }

  return (
    <div className="card-wrapper">
      <div className="subject-wrapper">{children}</div>

      <div className="items-wrapper">
        <div className="items-column">
          <div className="item">
            <div className="item-name">Company</div>
            <Input
              empty={!inputsData.car}
              type={"text"}
              {...propsForInput}
              value={inputsData.car}
              action={(e) => setInputsData({ ...inputsData, car: e.target.value })}
            />
          </div>

          <div className="item">
            <div className="item-name">Model</div>
            <Input
              empty={!inputsData.car_model}
              type={"text"}
              {...propsForInput}
              value={inputsData.car_model}
              action={(e) => setInputsData({ ...inputsData, car_model: e.target.value })}
            />
          </div>
          <div className="item">
            <div className="item-name">VIN</div>
            <Input
              empty={!inputsData.car_vin}
              type={"text"}
              {...propsForInput}
              value={inputsData.car_vin}
              action={(e) => setInputsData({ ...inputsData, car_vin: e.target.value })}
            />
          </div>

          <div className="item">
            <div className="item-name">Year</div>
            <Input
              empty={!inputsData.car_model_year}
              type={"number"}
              {...propsForInput}
              value={inputsData.car_model_year}
              action={(e) => setInputsData({ ...inputsData, car_model_year: e.target.value })}
            />
          </div>
        </div>

        <div className="items-column">
          <div className="item">
            <div className="item-name">Color</div>
            <Input
              empty={!inputsData.car_color}
              type={"text"}
              value={inputsData.car_color}
              action={(e) => setInputsData({ ...inputsData, car_color: e.target.value })}
            />
          </div>

          <div className="item">
            <div className="item-name">Price</div>
            <Input
              empty={!inputsData.price}
              type="number"
              step="0.01"
              value={inputsData.price}
              action={(e) => setInputsData({ ...inputsData, price: e.target.value })}
            />
          </div>

          <div className="item">
            <div className="item-name">Available</div>
            <SelectBoolean
              action={(actionType) => setInputsData({ ...inputsData, availability: JSON.parse(actionType) })}
              options={["false", "true"]}
              selected={inputsData.availability.toString()}
              empty={!inputsData.availability.toString()}
            />
          </div>
        </div>
      </div>
      <div className="buttons-wrapper">
        <Button type={"add"} action={() => saveBtnHandler()}>
          Save
        </Button>

        <Button type={"clear"} action={() => modalCancel(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditBlock;
