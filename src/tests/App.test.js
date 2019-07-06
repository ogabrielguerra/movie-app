import React from 'react';
import ReactDOM from 'react-dom';

import enzyme, { shallow, mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import Genre from '../components/Genre';
import Loader from '../components/Loader';
import Movie from '../components/Movie';
import MoviesGrid from '../components/MoviesGrid';

enzyme.configure({ adapter: new Adapter() });

it('Renders [App] without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Renders [Genre] without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Genre />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('Renders [Loader] without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Loader />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('Renders [Movie] without crashing',()=> {
	const obj = {"vote_count":56,"id":301528,"video":false,"vote_average":6.6,"title":"Toy Story 4","popularity":172.038,"poster_path":"\/crvO4xm2gs5W0joyKmJf1l1ThZV.jpg","original_language":"en","original_title":"Toy Story 4","genre_ids":[12,16,35,10751],"backdrop_path":"\/p3lkc1fDBeX9ZiIQVwRtOnXYENL.jpg","adult":false,"overview":"Woody has always been confident about his place in the world and that his priority is taking care of his kid, whether that's Andy or Bonnie. But when Bonnie adds a reluctant new toy called \"Forky\" to her room, a road trip adventure alongside old and new friends will show Woody how big the world can be for a toy.","release_date":"2019-06-19"};
	const wrapper = mount(<Movie data={obj}/>);
});

it('Renders [MoviesGrid] without crashing',()=> {
	const wrapper = mount(<MoviesGrid />);
});

test('** Movie vote_count is a number **', done => {
	const wrapper = mount(<MoviesGrid />);
	const myInstance = wrapper.instance();

	myInstance.loadData().then((data)=>{
		// console.log(data[0])
		expect(data[0].vote_count).not.toBeNaN();
		done();
	}).catch((e)=>{
		console.log('ERROR IN TEST [Movie vote_count is a number] ', e)
	})

});