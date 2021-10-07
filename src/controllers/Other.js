// Mock data
import { ORGANIZATIONS } from "../data/Organization.js";
import { ADVERTS } from "../data/Advert.js";
import { APPLICATIONS } from "../data/Application.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId } from "../utils/helpers/other.js";

const getInnerAdverts = async (req, res) => {
  const orgId = checkId(req, res, "orgId");
  if (orgId || orgId === 0) {
    const organization = ORGANIZATIONS.find((org) => org.id === orgId);

    if (organization) {
      const { adverts } = organization;
      if (adverts) {
        res.status(200).send(adverts);
      }
    } else {
      res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
    }
  }
};

const getInnerAdvert = async (req, res) => {
  const orgId = checkId(req, res, "orgId");
  if (orgId || orgId === 0) {
    const organization = ORGANIZATIONS.find((org) => org.id === orgId);

    if (organization) {
      const { adverts } = organization;
      if (adverts) {
        const adId = checkId(req, res, "adId");
        if (adId || adId === 0) {
          const advert = adverts.find((ad) => ad === adId);
          if (advert) {
            res.status(200).send({ id: advert });
          } else {
            res
              .status(404)
              .send({ success: false, message: Messages.GET_NOT_FOUND });
          }
        } else {
          res
            .status(404)
            .send({ success: false, message: Messages.GET_NOT_FOUND });
        }
      }
    } else {
      res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
    }
  }
};

const getInnerApplications = async (req, res) => {
  const orgId = checkId(req, res, "orgId");
  if (orgId || orgId === 0) {
    const organization = ORGANIZATIONS.find((org) => org.id === orgId);

    if (organization) {
      const { adverts } = organization;
      if (adverts) {
        const adId = checkId(req, res, "adId");
        if (adId || adId === 0) {
          const advert = adverts.find((ad) => ad === adId);
          if (advert) {
            res.status(200).send(APPLICATIONS);
          } else {
            res
              .status(404)
              .send({ success: false, message: Messages.GET_NOT_FOUND });
          }
        } else {
          res
            .status(404)
            .send({ success: false, message: Messages.GET_NOT_FOUND });
        }
      }
    } else {
      res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
    }
  }
};

const getInnerApplication = async (req, res) => {
  const orgId = checkId(req, res, "orgId");
  if (orgId || orgId === 0) {
    const organization = ORGANIZATIONS.find((org) => org.id === orgId);

    if (organization) {
      const { adverts } = organization;
      if (adverts) {
        const adId = checkId(req, res, "adId");
        if (adId || adId === 0) {
          const advert = adverts.find((ad) => ad === adId);
          if (advert) {
            const appId = checkId(req, res, "appId");
            if (appId || appId === 0) {
              const application = APPLICATIONS.find((app) => app.id === appId);
              if (application) {
                res.status(200).send(application);
              } else {
                res
                  .status(404)
                  .send({ success: false, message: Messages.GET_NOT_FOUND });
              }
            } else {
              res
                .status(404)
                .send({ success: false, message: Messages.GET_NOT_FOUND });
            }
          } else {
            res
              .status(404)
              .send({ success: false, message: Messages.GET_NOT_FOUND });
          }
        } else {
          res
            .status(404)
            .send({ success: false, message: Messages.GET_NOT_FOUND });
        }
      }
    } else {
      res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
    }
  }
};

export default {
  getInnerAdverts,
  getInnerAdvert,
  getInnerApplications,
  getInnerApplication,
};
