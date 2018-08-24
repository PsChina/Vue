const Home = () => import('./pages/home')
const Page1 = () => import('./routes/page1')
const Page2 = () => import('./routes/page2')
const Page3 = () => import('./routes/page3')
export default [
    { path:'/', component: Home },
    { path:'/page1', component: Page1 },
    { path:'/page2', component: Page2 },
    { path:'/page3', component: Page3 },
]