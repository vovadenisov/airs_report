import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { loadAirports } from '../actions/loadAirports';
import { push } from 'react-router-redux';

export class AirportListComponent extends Component{
    static propTypes = {
        airports: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }))
    };

    static defaultProps = {
        airports: []
    };

    render(){
        const airports = this.props.airports.map(airport => (
            <ListGroupItem onClick={ () => this.props.push(`/${airport.id}/`) } key={ airport.id } className="usable-item">
                {airport.name}
            </ListGroupItem>
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
            push,
        },
        dispatch,
    )
);


const mapStateToProps = state => ({
    airports: state.airportsReport.airports.airports
});


export const AirportList = connect(mapStateToProps, mapDispatchToProps)(AirportListComponent);
