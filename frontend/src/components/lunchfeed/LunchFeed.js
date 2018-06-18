import React from 'react';
import config from '../../config';
import LunchPaper from './LunchPaper';

class LunchFeed extends React.Component {

constructor(props){
  super(props);
  this.state= {
    loaded:false,
    error:'',
    lunchList:null,
  }
}

componentDidMount(){
  this.loadLunches();
}

loadLunches = () => {
  fetch(config.apiPath + "/lunch", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': localStorage.getItem('apiToken')
    }
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Request failed.");
      } else if (res.status !== 200) {
      throw new Error("Forbidden");
    }

    return res;
  })
  .then(res => res.json())
  .then(res => {
    this.setState({
      lunchList: res,
      loaded: true
    });

  })
  .catch((err) => {
    this.setState({
      error: 'An Error occured.',
    });
  });
}



render(){
  let lunches;
  if(this.state.lunchList !== null){
  lunches = this.state.lunchList.map((lunchItem) =>  {
    return(
      /*
      <Card
        image={lunchItem.LunchImage}
        name={lunchItem.Name}
        place={lunchItem.Place}
        zipcode={lunchItem.Zipcode}
        street={lunchItem.Street}
        streetNumber={lunchItem.StreetNumber}
        time={lunchItem.Time}
        price={lunchItem.Price}
        text={lunchItem.LunchText}
        />
        */

            <LunchPaper
            key={lunchItem.LunchRestaurant_Id}
            image={lunchItem.LunchImage}
            name={lunchItem.Name}
            place={lunchItem.Place}
            zipcode={lunchItem.Zipcode}
            street={lunchItem.Street}
            streetNumber={lunchItem.StreetNumber}
            time={lunchItem.Time}
            price={lunchItem.Price}
            text={lunchItem.LunchText}
             />



      )
  })
}
  return(
      <div>

        {lunches}
      </div>
  )
}
}
export default LunchFeed;
