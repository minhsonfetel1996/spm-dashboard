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
    this.initPaginationsMeta();
    this.state = {
      galleryContent: {},
    };
  }

  loadingRefCallback(element) {
    if (element) {
      this.loadingRef = element;
    }
  }

  initPaginationsMeta() {
    this.skip = 0;
    this.limit = 6;
    this.loading = false;
    this.finished = false;
  }

  runGettingImagesProcess(resetImages = true) {
    this.mounted = true;
    this.mounted && this.processGettingImages(resetImages);
  }

  handleScrollWindowEvent() {
    document.addEventListener("scroll", () => {
      if (this.loadingRef) {
        const rect = this.loadingRef.getBoundingClientRect();
        if (rect.top < window.innerHeight && !this.loading && !this.finished) {
          this.skip += this.limit;
          this.runGettingImagesProcess(false);
        }
      }
    });
  }

  componentDidMount() {
    const GALLERY_ROUTING = "gallery";
    this.runGettingImagesProcess();
    // Listen tab changed
    this.listener = this.props.history.listen((location) => {
      if (location.pathname !== this.props.location.pathname) {
        this.initPaginationsMeta();
        this.setState({
          galleryContent: {},
        });
        const indexOfGallery = location.pathname
          ? location.pathname.lastIndexOf(GALLERY_ROUTING)
          : -1;

        if (indexOfGallery > 0) {
          this.tabName = location.pathname.substr(
            indexOfGallery + GALLERY_ROUTING.length + 1
          );
          this.runGettingImagesProcess();
        }
      }
    });
    this.handleScrollWindowEvent();
  }

  componentWillUnmount() {
    this.handleSubscription(true);
  }

  handleSubscription(stopListenRouteChange) {
    this.mounted = false;
    if (stopListenRouteChange && this.listener) {
      this.listener();
    }
  }

  async processGettingImages(reset = true) {
    if (this.tabName) {
      if (reset) {
        this.setState({ galleryContent: {} });
        this.initPaginationsMeta();
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
              galleryContent: {
                ...prevState.galleryContent,
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
        <div className="loading hide" ref={this.loadingRefCallback.bind(this)}>
        </div>
      </div>
    );
  }
}
