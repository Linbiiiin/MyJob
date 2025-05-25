import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from '../../assets/fonts/iconfont.json';


const iconMapObject = glyphMap.glyphs.reduce((res, cur) => {
  const { name, unicode_decimal } = cur;

  res[name] = unicode_decimal;
  return res;
}, {});
const Icon = createIconSet(iconMapObject, 'iconfont', 'iconfont.ttf');


export default Icon;
