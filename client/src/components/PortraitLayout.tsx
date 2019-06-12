import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Footer from './Footer';
import ReadingData from './ReadingData';
import Chevron from './Chevron/Chevron';

export default class PortraitLayout extends React.Component
{
    render() {        
        return (
            <div className="Portrait">
                <Container fluid={true}>
                    <Row noGutters={true}>
                        <Col>
                            <ReadingData /> 
                        </Col>
                    </Row>
                </Container>
                <Footer expanded={false}/>
                <Chevron direction='up'/>
            </div>);
    }
}