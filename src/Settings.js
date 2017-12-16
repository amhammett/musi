
const Settings = {
  endpoints: {
    JDI_ENDPOINT: process.env.REACT_APP_JDI_ENDPOINT || 'http://127.0.0.1:3002/jdi',
    JES_ENDPOINT: process.env.REACT_APP_JES_ENDPOINT || 'http://127.0.0.1:3002/jes/email',
    QM_ENDPOINT: process.env.REACT_APP_QM_ENDPOINT || 'http://127.0.0.1:3002/qm/list-queue',
    BI_ENDPOINT: process.env.REACT_APP_BI_ENDPOINT || 'http://127.0.0.1:9001/jn/error/investigate?url='
  }
}


export default Settings;
