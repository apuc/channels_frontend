import Vue from 'vue'
import { MLInstaller, MLCreate} from 'vue-multilanguage'
import russian from './russian'
import english from './english'

Vue.use(MLInstaller);

export default new MLCreate({
    initial: 'ru',
    save: process.env.NODE_ENV === 'production',
    languages: [russian, english]
})