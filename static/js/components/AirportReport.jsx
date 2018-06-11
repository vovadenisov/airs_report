import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { loadPlanes } from '../actions/loadPlanes';
import { loadReport } from '../actions/loadReport';


export class AirportReportComponent extends React.Component {
    static propTypes = {
        loadPlanes: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        reportData: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.number,
        }))
    }

    componentDidMount(){
        this.props.loadPlanes().then(() => {
            this.props.loadReport(this.props.match.params.id)
        })
    }

    render(){
        return (
            200
        )
    }
}


const mapDispatchToProps = dispatch => (
    bindActionCreators(
        {
            loadPlanes,
            loadReport,
        },
        dispatch,
    )
);


const mapStateToProps = state => ({
    airports: state.airportsReport.airports.airports,
    reportData: state.airportsReport.airports.reportData
});


export const AirportReport =  withRouter(connect(mapStateToProps, mapDispatchToProps)(AirportReportComponent));
