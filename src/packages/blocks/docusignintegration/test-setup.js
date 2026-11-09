// // test-setup.js
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// jest.mock('react-native/Libraries/Utilities/Platform', () => ({
//     OS: 'macos',
//     select: () => null
// }));


// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const entries = jest.fn()
const append = jest.fn()
global.FormData = () => ({ entries, append })
configure({ adapter: new Adapter() });


jest.mock('react-native/Libraries/Utilities/Platform', () => ({
   OS: 'macos',
   select: () => null
}));


// jest.mock('react-native-signature-canvas', () => {
//   return {
//    SignatureViewProps:{
//       onGetData: (data) =>{ }
//    }
//   }
// });





