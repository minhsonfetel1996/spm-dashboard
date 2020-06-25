import { get, getApiUrl } from "./http.service";

const API_GALLERY_EP = "/gallery";

function getGalleryContentWithTabName(tabName, skip, limit) {
  return new Promise(async (resolve) => {
    const { data: response } = await get(
      `${API_GALLERY_EP}/${tabName}?skip=${skip}&limit=${limit}`
    );
    if (response.status && response.status !== 200) {
      resolve({
        status: response.status,
        message: response.message,
      });
    } else {
      resolve({
        status: 200,
        ...response,
      });
    }
  });
}

function getLoadImageUrl(tabName, filename) {
  return `${getApiUrl()}${API_GALLERY_EP}/${tabName}/image/${filename}`;
}

export { getGalleryContentWithTabName, getLoadImageUrl };
