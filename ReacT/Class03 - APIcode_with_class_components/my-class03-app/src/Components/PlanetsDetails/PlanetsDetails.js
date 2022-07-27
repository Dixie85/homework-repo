import React from "react";
import "./PlanetsDetails.css"



class PlanetsDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <article className="PlanetsDetails">
        <div className="details__container">
          {!this.props.selectedPlanetData && (
            <div className="placeholder__container">
              Choose your desired destination!
            </div>
          )}
          {this.props.selectedPlanetData && (
            <>
              <div>
                <strong>Name: </strong>
                {this.props.selectedPlanetData.name}
              </div>
              <div>
                <strong>Climate: </strong>
                {this.props.selectedPlanetData.climate}
              </div>
              <div>
                <strong>Created: </strong>
                {this.props.selectedPlanetData.created}
              </div>
              <div>
                <strong>Diameter: </strong>
                {this.props.selectedPlanetData.diameter}
              </div>
              <div>
                <strong>Edited: </strong>
                {this.props.selectedPlanetData.edited}
              </div>
              <div>
                <strong>Films: </strong>
                <ul className="films__list__container">
                  {this.props.selectedPlanetData.films.map((film, i) => {
                    return (
                      <a key={"film" + i} href={film} target="_blank">
                        <li> &lt;Film No{i + 1}&gt;</li>
                      </a>
                    );
                  })}
                </ul>
              </div>
              <div>
                <strong>Gravity: </strong>
                {this.props.selectedPlanetData.gravity}
              </div>
              <div>
                <strong>Orbital Period: </strong>
                {this.props.selectedPlanetData.orbital_period}
              </div>
              <div>
                <strong>Population: </strong>
                {this.props.selectedPlanetData.population}
              </div>
              <div>
                <strong>Gravity: </strong>
                {this.props.selectedPlanetData.gravity}
              </div>
              <div>
                <strong>Rotation Period: </strong>
                {this.props.selectedPlanetData.rotation_period}
              </div>
              <div>
                <strong>Surface Water: </strong>
                {this.props.selectedPlanetData.surface_water}
              </div>
              <div>
                <strong>Terrain: </strong>
                {this.props.selectedPlanetData.terrain}
              </div>
            </>
          )}
        </div>
      </article>
    );
  }
}

export default PlanetsDetails;
