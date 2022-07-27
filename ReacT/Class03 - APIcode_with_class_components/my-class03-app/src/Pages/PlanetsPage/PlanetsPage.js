import React from "react";
import "./PlanetsPage.css";
import axios from "axios";
import PlanetsList from "../../Components/PlanetsList/PlanetsList";
import PlanetsDetails from "../../Components/PlanetsDetails/PlanetsDetails";
import Button from "../../Components/Button/Button";

const PLANETS_API_URL = "https://swapi.dev/api/planets";

class PlanetsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextPlanet: null,
      previousPlanet: null,
      planetsApiData: null,
      selectedPlanetData: null,
      isPlanetDetailsShown: false,
    };
  }

  componentDidMount() {
    console.log("Mounting planets");
    axios.get(PLANETS_API_URL).then((response) => {
      this.setState({
        planetsApiData: response.data.results,
        nextPlanet: response.data.next,
        previousPlanet: response.data.previous,
      });
    });
  }

  componentDidUpdate() {
    console.log("Updating Planets");
    // console.log(this.state.planetsApiData);
    // console.log(this.state.selectedPlanetData);
    console.log(this.state.nextPlanet);
    console.log(this.state.previousPlanet);
  }

  onPlanetSelect(selectedIndex) {
    this.setState((prevState) => ({
      selectedPlanetData: prevState.planetsApiData[selectedIndex],
    }));
  }

  onPlanetsDetailsToggle() {
    this.setState((prevState) => {
      return { isPlanetDetailsShown: !prevState.isPlanetDetailsShown };
    });
  }

  onNextButonClick(next) {
    axios.get(next).then((response) => {
      this.setState({
        planetsApiData: response.data.results,
        nextPlanet: response.data.next,
        previousPlanet: response.data.previous,
      });
    });
  }

  onPreviousButonClick(previous) {
    axios.get(previous).then((response) => {
      this.setState({
        planetsApiData: response.data.results,
        nextPlanet: response.data.next,
        previousPlanet: response.data.previous,
      });
    });
  }

  render() {
    console.log("Rendering from Planets");
    return (
      <section className="page">
        <div className="page__heading">
          <h1>
            Travel to the planets of the <strong>Star Wars</strong> univers
          </h1>
        </div>

        <div className="button__container">
          {this.state.previousPlanet && (
            <Button
              buttonText="Previous Planets"
              style={{ marginLeft: "30px" }}
              onButtonClick={this.onNextButonClick.bind(this)}
              nextPlanetData={this.state.previousPlanet}
            />
          )}

          {this.state.nextPlanet && (
            <Button
              buttonText="Next Planets"
              style={{ marginLeft: "30px" }}
              onButtonClick={this.onNextButonClick.bind(this)}
              nextPlanetData={this.state.nextPlanet}
            />
          )}
        </div>

        <div className="planets__display__container">
          <PlanetsList
            planetsApiData={this.state.planetsApiData}
            onListItemClick={this.onPlanetSelect.bind(this)}
            showPlanetItem={this.onPlanetsDetailsToggle.bind(this)}
            isPlanetDetailsShown={this.state.isPlanetDetailsShown}
          />
          {this.state.isPlanetDetailsShown && (
            <PlanetsDetails
              selectedPlanetData={this.state.selectedPlanetData}
            />
          )}
        </div>
      </section>
    );
  }
}

export default PlanetsPage;
