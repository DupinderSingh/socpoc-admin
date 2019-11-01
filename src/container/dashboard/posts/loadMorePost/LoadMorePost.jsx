import React from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Button from "../../../../components/app/button/Button";
import {changePostPage, getAllPostMix} from "../../../../actions/dashbaord/post";
import {getCookie} from "../../../../actions/app";

class LoadMorePost extends React.Component {
    loadMorePost() {
        this.props.dispatch(getAllPostMix(getCookie("userId"), this.props.postPageNumber + 1));
        this.props.dispatch(changePostPage(this.props.postPageNumber + 1));
    }

    render() {
        return (
            <div className="load_more_posts">
                <Button onClick={this.loadMorePost.bind(this)} type="button"
                        className="btn btn-outline-primary btn-no-shadow"
                        name="button">Load more posts
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {postPageNumber} = state.postReducer;
    return {postPageNumber}
};
export default withRouter(connect(mapStateToProps)(LoadMorePost))
