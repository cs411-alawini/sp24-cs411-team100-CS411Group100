// Export respective env file based on process.ENV
var cs411: any;
if (process.env.NODE_ENV === 'development') {
    cs411 = require('./dev.config').env;
} else if (process.env.REACT_APP_ENV === 'stage') {
    cs411 = require('./stg.config').env;
} else {
    cs411 = require('./prod.config').env;
}
export default cs411;