import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import ContentViewButton from './ContentViewButton';
import ContentViewContents from './ContentViewContents';
import { IStore, IStoreEntry, ActiveContentOption } from '../../store/Models';
import { setActiveContent } from '../../store/Actions';
import { Container, Row, Col} from 'reactstrap';
import './ContentView.css';

interface IContentViewProps
{
    entry: IStoreEntry,
    activeContent: ActiveContentOption
}

interface IContentViewActions
{
    onDevotionalClicked() : void
    onReadingClicked() : void
}

class ContentView extends React.Component<IContentViewProps & IContentViewActions>
{    
    onDevotionalClicked = (e: MouseEvent<HTMLElement>) : void =>
    {
        this.props.onDevotionalClicked();
    }

    onReadingClicked = (e: MouseEvent<HTMLElement>) : void =>
    {
        this.props.onReadingClicked();
    }

    render()
    {
        const activeHeader = (this.props.activeContent == ActiveContentOption.Devotional)
            ? this.props.entry.devotionHeader
            : this.props.entry.readingHeader;
        const activeContent = (this.props.activeContent == ActiveContentOption.Devotional)
            ? this.props.entry.devotionContent
            : this.props.entry.readingContent;

        return (
            <Container>
                <Row>
                    <Col className="ButtonRow">
                        <ContentViewButton
                            onClick={this.onDevotionalClicked}
                            children='Devotional'></ContentViewButton>
                        <ContentViewButton
                            onClick={this.onReadingClicked}
                            children='Reading'></ContentViewButton>
                    </Col>
                </Row>
                <Row>
                    <ContentViewContents
                        header={activeHeader}
                        content={activeContent}>
                    </ContentViewContents>            
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state : IStore) : IContentViewProps
{
    return {
        entry: state.entries[state.activeEntry],
        activeContent: state.activeContent
    }
}

function mapDispatchToProps(dispatch: any) : IContentViewActions
{
    return {
        onDevotionalClicked: () => dispatch(setActiveContent(ActiveContentOption.Devotional)),
        onReadingClicked: () => dispatch(setActiveContent(ActiveContentOption.Reading)) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentView);