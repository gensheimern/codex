import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import TextField from 'material-ui/TextField';

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    }
    this.parseAddress = this.parseAddress.bind(this);
  }

  handleChange = (address) => {
    this.setState({ address });
  }

  parseAddress(results){
    let parsedAddress = results.map(e =>{
      return(
      e.address_components.map(f => {
           if( f.types[0] === 'street_number' ||  f.types[0] ==='route' || f.types[0] === 'locality'){
              return(this.props.myAddress(f))
          }
          return true;
      }))

    })
    console.log(parsedAddress);
  }

  handleSelect = (address) => {
    this.props.callbackAdress(address);
    geocodeByAddress(address)
      .then(results => this.props.myAddress(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        maxSearchResults={20}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
          <TextField
                style={this.props.styles}
                floatingLabelFocusStyle={{color:"rgb(30 161 133)"}}
                underlineFocusStyle={{borderColor:"rgb(30 161 133)"}}
                floatingLabelFixed={true}
                floatingLabelText="Address"
                hintText="Search your location"
                {...getInputProps({
                  className: 'location-search-input'
                })}
          /><br />

            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer', marginTop:"10px" }
                            : { backgroundColor: '#ffffff', cursor: 'pointer', marginTop:"10px" };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
