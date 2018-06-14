import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AirportList } from './AirportList';
import { AirportReport } from './AirportReport';
import { PageNotFound } from '../common/components/PageNotFound'
import { withRouter } from 'react-router-dom';
import { loadAirports } from '../actions/loadAirports';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export class BaseComponent extends Component {
    componentDidMount(){
        this.props.loadAirports()
    }

    render(){
        return (
            <Switch>
                <Route exact path='/' component={ AirportList } />
                <Route exact path='/:id/' component={ AirportReport } />
                <Route path="*" component={ PageNotFound } />
            </Switch>
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


const mapStateToProps = () => ({});


export const Base = withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseComponent));
