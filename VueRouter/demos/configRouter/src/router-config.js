import page1 from './routes/page1'
import page2 from './routes/page2'
import page3 from './routes/page3'
import home from './pages/home'
export default [
    { path:'/', component: home },
    { path:'/page1', component: page1 },
    { path:'/page2', component: page2 },
    { path:'/page3', component: page3 },
]