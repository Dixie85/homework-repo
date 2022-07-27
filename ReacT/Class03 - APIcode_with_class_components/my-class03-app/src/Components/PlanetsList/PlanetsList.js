import React from "react";
import "./PlanetsList.css";
import PlanetsListItems from "../PlanetsListItem/PlanetsListItems";

class PlanetsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("From planets list");
    console.log(this.props.planetsApiData);
    return (
      <React.Fragment>
        {!this.props.planetsApiData && (
          <div className="PlanetsList">Loading...</div>
        )}
        {this.props.planetsApiData && (
          <React.Fragment>
            <ul className="PlanetsList">
              {this.props.planetsApiData.map((planet, i) => {
                return (
                  <PlanetsListItems
                    planetName={planet.name}
                    key={planet.name + i}
                    planetIndex={i}
                    onListItemClick={this.props.onListItemClick}
                    showPlanetItem={this.props.showPlanetItem}
                    isPlanetDetailsShown={this.props.isPlanetDetailsShown}
                  />
                );
              })}
            </ul>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default PlanetsList;
