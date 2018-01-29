const Settings = {
  endpoints: {
    JLR_ENDPOINT: process.env.REACT_APP_JLR_ENDPOINT || 'http://127.0.0.1:9000/v1/jlr',
    NSS_ENDPOINT: process.env.REACT_APP_NSS_ENDPOINT || 'http://127.0.0.1:3001/v1/nss',
    QMS_ENDPOINT: process.env.REACT_APP_QMS_ENDPOINT || 'http://127.0.0.1:3003/v1/qms/list'
  }
}

export default Settings;
