import React from "react";
import "./PlanetsListItem.css";

class PlanetsLIstItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li
        className="PlanetsLIstItems"
        onClick={() => {
          this.props.onListItemClick(this.props.planetIndex);
          {!this.props.isPlanetDetailsShown && this.props.showPlanetItem()};
        }}
      >
        {this.props.planetName}
      </li>
    );
  }
}

export default PlanetsLIstItems;
