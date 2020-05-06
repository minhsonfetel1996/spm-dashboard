import React from "react";
import { Row } from "react-bootstrap";
import lazyLoading from "../../components/core/lazy-loading/lazy-loading";
import {
  getGalleryContentWithTabName,
  getLoadImageUrl,
} from "../../services/gallery.service";
import "./gallerypage.styles.css";
import GalleryItems from "./items/GalleryItems";

export default class GalleryPage extends React.Component {
  mounted;
  tabName;
  constructor(props) {
    super(props);
    this.mounted = false;
    this.tabName = null;
    this.state = {
      galleryContent: {},
    };
  }

  UNSAFE_componentWillMount() {
    this.tabName = this.props.match.params.tabName;
  }

  componentDidMount() {
    this.mounted = true;
    this.mounted && this.processGettingImages(this.tabName);
    // Listen tab changed
    this.listen = this.props.history.listen((location) => {
      if (location.pathname !== this.props.location.pathname) {
        const indexOfGallery = location.pathname
          ? location.pathname.lastIndexOf("gallery")
          : -1;
        this.setState({
          galleryContent: {},
        });
        if (indexOfGallery > 0) {
          this.tabName = location.pathname.substr(
            indexOfGallery + "gallery".length + 1
          );
          this.mounted = true;
          this.mounted && this.processGettingImages(this.tabName);
        }
      }
    });
  }

  componentWillUnmount() {
    this.handleSubscription(true);
  }

  handleSubscription(stopListenRouteChange) {
    this.mounted = false;
    if (stopListenRouteChange && this.listen) {
      this.listen();
    }
  }

  async processGettingImages(tabName) {
    if (tabName) {
      const result = await getGalleryContentWithTabName(tabName);
      if (result.status === 200) {
        this.setState({
          galleryContent: result,
        });
      }
      this.handleSubscription(false);
    }
  }

  runLazyLoadingProcess() {
    setTimeout(() => {
      lazyLoading();
    }, 200);
  }

  render() {
    const { galleryContent } = this.state;
    if (!galleryContent.images || galleryContent.images.length <= 0) {
      return null;
    }

    return (
      <div>
        <div id="images">
          <h2>{galleryContent.title}</h2>
          <small>{galleryContent.description}</small>
          <Row>
            {galleryContent.images.map((img, index) => {
              return (
                <div key={index} className="wrap">
                  <GalleryItems
                    key={index}
                    dataSrc={getLoadImageUrl(this.tabName, img)}
                  />
                </div>
              );
            })}
            {this.runLazyLoadingProcess()}
          </Row>
        </div>
      </div>
    );
  }
}
