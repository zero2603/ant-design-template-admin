import PlacesAutocomplete, {
    geocodeByAddress,
} from 'react-places-autocomplete';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import IntlMessages from "Util/IntlMessages";
import LocationPicker from 'react-location-picker';


class CustomPlacesAutoComplete extends React.Component {

    state = {
        open: false,
        address: "",
        position: {
            lat: 0,
            lng: 0
        },
        city_name: "",
        defaultPosition: {
            lat: 0,
            lng: 0
        }
    }

    componentDidMount() {
        if (this.props.defaultPosition === null) {
            navigator && navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                this.setState({
                    defaultPosition: {
                        lat: latitude,
                        lng: longitude
                    }
                });
            });
        }
        else this.setState({
            ...this.state,
            defaultPosition: this.props.defaultPosition,
            position: this.props.defaultPosition,
            city_name: this.props.city_name || "",
            address: this.props.address || ""
        })
    }

    static propTypes = {
        address: PropTypes.string,
        city_name: PropTypes.string,
        position: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        }),
        onChange: PropTypes.func,
        defaultPosition: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        })
    }

    static defaultProps = {
        address: "",
        position: {
            lat: 0,
            lng: 0
        },
        city_name: "",
        onChange: () => { },
        defaultPosition: null
    }

    close = () => {
        this.setState({
            open: false
        })
    }

    open = () => {
        this.setState({
            open: true
        })
    }

    handleLocationChange = ({ position, address, places }) => {
        let lg = places.length;
        let city_name = "";
        if (lg > 2) {
            let address_components = places[lg - 2].address_components;
            city_name = address_components[0].long_name;
        }
        else {
            let address_components = places[lg - 1].address_components;
            city_name = address_components[0].long_name;
        }
        this.setState({
            ...this.state,
            position,
            address,
            city_name
        }, () => this.props.onChange(this.state.position, this.state.address, this.state.city_name));

    }


    handleChange = address => {
        this.setState({
            ...this.state,
            address: address
        }, () => this.props.onChange(this.state.position, this.state.address, this.state.city_name));
    }

    handleSelect = address => {
        var city_name = '';
        geocodeByAddress(address)
            .then(results => {
                results[0]['address_components'].forEach(component => {
                    if (component.types.indexOf('administrative_area_level_1') > -1) {
                        city_name = component.long_name;
                    }
                });
                var lng = results[0].geometry.location.lng();
                var lat = results[0].geometry.location.lat();
                this.setState({
                    position: {
                        lat: lat,
                        lng: lng,
                    },
                    defaultPosition: {
                        lat: lat,
                        lng: lng,
                    },
                    city_name: city_name,
                    address: results[0].formatted_address
                }, () => this.props.onChange(this.state.position, this.state.address, this.state.city_name));
            })
            .catch(error => {
                console.log(error);
                NotificationManager.error("Error when type address!");
            });
    };

    render() {
        return (
            <React.Fragment>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input type="text"
                                {...getInputProps({
                                    placeholder: 'enter then choose a location...',
                                    className: 'location-search-input form-control',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete><p>or</p>
                <Button icon={<EnvironmentOutlined />} onClick={this.open}><IntlMessages id="global.choose-location"></IntlMessages></Button>

                <Modal
                    title={
                        <IntlMessages id="global.choose-location" />
                    }
                    toggle={this.close}
                    visible={this.state.open}
                    closable={true}
                    footer={null}
                    width="50%"
                    onCancel={this.close}
                    centered={true}
                >
                    <LocationPicker
                        containerElement={<div style={{ height: '80vh' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                        onChange={this.handleLocationChange}
                        defaultPosition={this.state.defaultPosition}
                    />
                </Modal>
            </React.Fragment>
        );
    }
}

export default CustomPlacesAutoComplete;