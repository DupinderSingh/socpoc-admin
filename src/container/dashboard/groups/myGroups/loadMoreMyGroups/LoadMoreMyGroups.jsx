import React from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Button from "../../../../../components/app/button/Button";
import {changeMyGroupsPage, getMyGroups} from "../../../../../actions/dashbaord/groups/groups";

class LoadMoreMyGroups extends React.Component {
    loadMoreMyGroups() {
        this.props.dispatch(getMyGroups(this.props.myGroupsPageNumber + 1));
        this.props.dispatch(changeMyGroupsPage(this.props.myGroupsPageNumber + 1));
    }

    render() {
        return (
            <div className="load_more_posts">
                <Button onClick={this.loadMoreMyGroups.bind(this)} type="button"
                        className="btn btn-outline-primary btn-no-shadow"
                        name="button">Load more groups
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {myGroupsPageNumber} = state.groupsReducer;
    return {myGroupsPageNumber}
};
export default withRouter(connect(mapStateToProps)(LoadMoreMyGroups))
