module.exports = {
  getAppInfo,
};

function getAppInfo(req, res, next) {
  const appInfo = req.app.settings.package;

  res.send({
    name: appInfo.name,
    version: appInfo.version
  });
}
