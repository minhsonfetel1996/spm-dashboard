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
  loadingRef;
  skip;
  limit;
  loading;
  finished;
  constructor(props) {
    super(props);
    this.mounted = false;
    this.tabName = this.props.match.params.tabName;
    this.resetPaginationsMeta();
    this.state = {
      galleryContent: {},
    };
  }

  loadingRefCallback = (element) => {
    if (element) {
      this.loadingRef = element;
    }
  };

  resetPaginationsMeta() {
    this.skip = 0;
    this.limit = 6;
    this.loading = false;
    this.finished = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.mounted && this.processGettingImages();
    // Listen tab changed
    this.listen = this.props.history.listen((location) => {
      if (location.pathname !== this.props.location.pathname) {
        this.resetPaginationsMeta();
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
          this.mounted && this.processGettingImages();
        }
      }
    });

    document.addEventListener("scroll", () => {
      if (this.loadingRef) {
        const rect = this.loadingRef.getBoundingClientRect();
        if (rect.top < window.innerHeight && !this.loading && !this.finished) {
          this.skip += this.limit;
          this.mounted = true;
          this.mounted && this.processGettingImages(false);
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

  async processGettingImages(reset = true) {
    if (this.tabName) {
      if (reset) {
        this.setState({ galleryContent: {} });
        this.resetPaginationsMeta();
      }
      this.loading = true;
      const result = await getGalleryContentWithTabName(
        this.tabName,
        this.skip,
        this.limit
      );
      if (result.status === 200) {
        this.finished = !result.hasMore;
        if (this.finished) {
          this.loadingRef && (this.loadingRef.classList += " hide");
        } else {
          this.loadingRef && (this.loadingRef.classList -= " hide");
        }
        if (reset) {
          this.setState({
            galleryContent: {
              title: result.title,
              description: result.description,
              images: result.images,
            },
          });
          this.loading = false;
        } else {
          this.setState(
            (prevState) => ({
              ...prevState.galleryContent,
              galleryContent: {
                images: prevState.galleryContent.images.concat(result.images),
              },
            }),
            () => {
              this.loading = false;
            }
          );
        }
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
      <div className="gallery-container">
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
        <div className="loading" ref={this.loadingRefCallback.bind(this)}>
          Loading...
        </div>
      </div>
    );
  }
}
