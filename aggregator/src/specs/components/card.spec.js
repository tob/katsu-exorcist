import React from 'react';
import Card from '../../components/card.js';
import { shallow } from 'enzyme';

let component;
let card;
describe('render method', () => {

  describe('when undefined card', () => {
    beforeEach(() => {
      card = {foo:'foo'};
      component = shallow(<Card card={card} />)
    });
  
    it('should display a broken card', () => {
      expect(component.html()).toMatchSnapshot();
    })
  });

  describe('when video card', () => {
    beforeEach(() => {
      card = {snippet:{resourceId: 'foo'}}
      component = shallow(<Card card={card} />)
    });
  
    it('should have card__video class', () => {
      expect(component.debug()).toMatch(/card__video/);
    })
  })

  describe('when event card', () => {
    beforeEach(() => {
      card = {start: 'whenever'}
      component = shallow(<Card card={card} />)
    });
  
    it('should have card__event class', () => {
      expect(component.debug()).toMatch(/card__event/);
      expect(component.html()).toMatchSnapshot();
    })
  })

  describe('when article card', () => {
    beforeEach(() => {
      card = {resolved_title: 'foo title'}
      component = shallow(<Card card={card} />)
    });
  
    it('should have card__article class', () => {
      expect(component.debug()).toMatch(/card__article/);
    })
  })

});
