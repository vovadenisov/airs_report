import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAirports } from '../actions/loadAirports';


export class AirportListComponent extends Component{
    static propTypes = {
        loadAirports: PropTypes.func.isRequired,
        airports: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }))
    };

    static defaultProps = {
        airports: []
    };

    componentDidMount(){
        console.log('123');
        this.props.loadAirports()
    }

    render(){
        const airports = this.props.airports.map(airport => (
            <ListGroupItem key={ airport.id } className="usable-item">{airport.name}</ListGroupItem>
        ));

        return(
            <Container>
                <ListGroup>
                    { airports }
                </ListGroup>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators(
        {
            loadAirports,
        },
        dispatch,
    )
);


const mapStateToProps = state => ({
    airports: state.airportsReport.airports.airports
});


export const AirportList = connect(mapStateToProps, mapDispatchToProps)(AirportListComponent);
