import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Container, Row, Col, ListGroupItem, ListGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { loadPlanes } from '../actions/loadPlanes';
import { loadReport } from '../actions/loadReport';
import 'react-datepicker/dist/react-datepicker.css';


export class AirportReportComponent extends React.Component {
    static propTypes = {
        loadPlanes: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        reportsData: PropTypes.object,
        planes: PropTypes.objectOf(PropTypes.string),
        airport: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.number,
        }),
    }

    static defaultProps = {
        reportsData: {},
        planes: {},
    }

    state = {
        start: null,
        end: null,
    }

    componentDidMount(){
        this.props.loadPlanes();
    }

    loadReport = () => {
        this.props.loadReport(
            this.props.match.params.id,
            this.state.start.format('DD.MM.YYYY'),
            this.state.end.format('DD.MM.YYYY')
        );
    };

    render(){
        let reportItems;
        let key;
        if (this.state.start && this.state.end) {
            const start_time = this.state.start.format('DD.MM.YYYY')
            const end_time = this.state.end.format('DD.MM.YYYY')
            key = `${start_time}${end_time}`;
        }
        if (this.props.reportsData && key && this.props.reportsData[key] && this.props.reportsData[key].length) {
            reportItems = this.props.reportsData[key].map(item => (
                <ListGroupItem key={item.plane}>
                    <Container>
                        <Row>
                            <Col xs="6" sm="3">
                                { `${this.props.planes[item.plane]} #${item.plane}`}
                            </Col>
                            <Col xs="6" sm="9">
                                { item.flight_count }
                            </Col>
                        </Row>
                    </Container>
                </ListGroupItem>
            ))
        }
        let reports;
        if (reportItems){
            reports = (
                <Row className="report-row">
                    <Col xs="12" sm="12">
                        <ListGroup>
                            { reportItems }
                        </ListGroup>
                    </Col>
                </Row>
            )
        }
        return (
            <Container className="report-container">
                <Row className="report-row">
                    <Col xs="6" sm="3">
                        <Link to="/" >На главную</Link>
                    </Col>
                </Row>
                <Row className="report-row">
                    <Col xs="6" sm="3">
                        <label>Дата начала отчета</label>
                        <DatePicker
                            selected={this.state.start}
                            onChange={(start) => this.setState({start})}
                        />
                    </Col>
                    <Col xs="6" sm="3">
                        <label>Дата окончания отчета</label>
                        <DatePicker
                            selected={this.state.end}
                            onChange={(end) => this.setState({end})}
                        />
                    </Col>
                </Row>
                <Row className="report-row">
                    <Col xs="12" sm="3">
                        <Button
                            color="primary"
                            onClick={ this.loadReport }
                            disabled={!(this.state.start && this.state.end)}
                        >
                            Показать отчет
                        </Button>
                    </Col>
                </Row>
                { reports }
            </Container>
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


const mapStateToProps = (state, ownProps) => ({
    airport: state.airportsReport.airports.airports[ownProps.match.params.id],
    planes: state.airportsReport.planes.planes,
    reportsData: state.airportsReport.reports.reports[ownProps.match.params.id]
});


export const AirportReport =  withRouter(connect(mapStateToProps, mapDispatchToProps)(AirportReportComponent));
