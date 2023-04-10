import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

Reactotron
  .configure({ name: 'The Decision Smith'}) // controls connection & communication settings
  .use(reactotronRedux()) // add all built-in react native plugins
  .connect() // let's connect!
