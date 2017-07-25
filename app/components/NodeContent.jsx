import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import YouTube from 'react-youtube';

import NodeConsole from './NodeConsole.jsx';

export default class NodeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeData: {}
    };
  }

  componentDidMount() {
    const nodeId = this.props.nid;

    this.addFBListener(nodeId);
  }

  componentWillReceiveProps(nextProps) {
    const nodeId = nextProps.nid;
    const oldNodeId = this.props.nid;

    if (!nodeId !== oldNodeId) {
      firebase.reset();
      this.addFBListener(nodeId);
    }
  }

  addFBListener(nodeId) {
    firebase.listenTo('nodes/' + nodeId, {
      context: this,
      then(nodeData) {
        this.setState({nodeData});
      }
    });
  }

  getYoutubeId(url) {
    const regUrlIndex = url.indexOf('watch?v=');
    const embedUrlIndex = url.indexOf('embed/');
    if (regUrlIndex !== -1) {
      return url.slice(regUrlIndex + 8);
    } else if (embedUrlIndex !== -1) {
      return url.slice(regUrlIndex + 6);
    }
  }

  renderContent() {
    let contentEl = null;
    const content = this.state.nodeData.content;
    if (!content) {
      return <div>Node not found</div>;
    }
    if (content.indexOf('youtube') !== -1) {
      const videoId = this.getYoutubeId(content);
      contentEl = (
		  <YouTube
          videoId={videoId}
          opts={{}}
        />
	  );
    } else {
      contentEl = content;
    }
    return (
      <div>
        {contentEl}
      </div>
	);
  }

  render() {
    return (
      <div>
        {this.renderContent()}
		<NodeConsole node={this.state.nodeData} />
      </div>
    );
  }
}

NodeContent.propTypes = {
  nid: PropTypes.string
};
