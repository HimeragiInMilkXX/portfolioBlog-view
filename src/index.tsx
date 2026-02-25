/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Router, Route } from "@solidjs/router";
import 'solid-devtools';

import Home from './pages/Home';
import Admin from './pages/Admin';
import DefaultLayout from './layout/DefaultLayout';
import PostView from './pages/post/PostView';
import NotFound from './pages/NotFound';
import gsap from 'gsap';
import { initCsrf, me } from './utils/auth';
import { TextPlugin } from 'gsap/all';

const root = document.getElementById('root');
gsap.registerPlugin(gsap)
gsap.registerPlugin(TextPlugin)

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
	);
}

initCsrf();
me();

render(

	() => (

		<Router>

			<Route path="/" component={DefaultLayout}>
			
				<Route path="/" component={Home}/>
				<Route path="/post">
				
					<Route path="/view/:id" component={PostView}></Route>

				</Route>

			</Route>

			<Route path="/admin" component={Admin}/>

			<Route path="*404" component={NotFound}/>

		</Router>

	), root!

)
